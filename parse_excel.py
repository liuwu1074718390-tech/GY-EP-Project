import pandas as pd
import re
import os

INPUT_FILE = '/Users/liuwu/Desktop/广咨国际/01 项目数据/33 广业材价/GY-EP Project/非标准材料设备_副本.xlsx'
OUTPUT_FILE = '/Users/liuwu/Desktop/广咨国际/01 项目数据/33 广业材价/GY-EP Project/标准工料机信息汇总.md'

# 允许保留在“标准名称”中的通用英文术语集合 (白名单)
STANDARD_TERMS = [
    "PLC", "UPS", "CPU", "PAC", "PAM", "COD", "BOD", "SS", "TN", "TP", "pH", "ORP", 
    "NH3-N", "NH4-N", "NaCLO", "FeSO4", "LCD", "RS485", "modbus", "Modbus", "I", "O", "PC",
    "Internet", "MCP", "MMC"
]
ST_SET = {t.upper() for t in STANDARD_TERMS}

def parse_row(row):
    raw_name = str(row.get('材料名称', ''))
    if pd.isna(raw_name) or raw_name.lower() == 'nan': return None, None, None
    raw_name = raw_name.strip()

    specs = {}
    content = f"{raw_name} {str(row.get('规格型号', ''))} {str(row.get('备注', ''))}"
    
    # 用来记录成功匹配出的规格对应在源文本中的“原始串”，后续精准剥离
    raw_specs_to_strip = []
    
    # --- 1. 定向提取规格参数 ---
    
    # 功率 (kW, KW, kw...)
    power = re.findall(r'(\d+(\.\d+)?\s*(?:kW|KW|Kw|kw))', content)
    if power: 
        raw_specs_to_strip.extend([p[0] for p in power])
        specs['功率N'] = set([p[0].replace(' ', '').lower().replace('kw', 'kW') for p in power])
    
    # 匹配匹数 (P/匹) - 阈值限制 < 30
    pishu = re.findall(r'(\d+(\.\d+)?\s*[Pp匹])(?!\w)', content)
    if pishu: 
        for p in pishu:
            raw_p = p[0]
            val = float(re.search(r'([\d\.]+)', raw_p).group(1))
            if val < 30: # 基于常识，只有小于30的才认为是匹数
                raw_specs_to_strip.append(raw_p)
                specs.setdefault('制冷量/匹数', set()).add(raw_p.upper().replace('匹', 'P').replace(' ', ''))

    # 电压 (VDC, VAC, V, v)
    voltage = re.findall(r'(\d+\s*(?:VDC|VAC|V|v))', content, re.I)
    if voltage: 
        raw_specs_to_strip.extend([v for v in voltage])
        specs['电压'] = set([v.replace(' ', '').upper().replace('VDC', 'VDC').replace('VAC', 'VAC') for v in voltage])
    
    # 电流 (A)
    current = re.findall(r'(\d+(\.\d+)?\s*A)(?!\w)', content, re.I)
    if current:
        raw_specs_to_strip.extend([c[0] for c in current])
        specs['电流'] = set([c[0].upper().replace(' ', '') for c in current])

    # 转速 (r/min, rpm) -- 统一换算为 r/min
    speed = re.findall(r'(\d+\s*(?:r/min|rpm))', content, re.I)
    if speed: 
        raw_specs_to_strip.extend([s for s in speed])
        specs['转速n'] = set([s.replace(' ', '').lower().replace('rpm', 'r/min') for s in speed])
    
    # 尺寸/长度/直径 (寸, ", ”, mm, m, DN, Phi, 直径)
    size = re.findall(r'([Φ] ?\d+(\.\d+)?|直径\s*\d+(\.\d+)?|\bDN\s*\d+(\.\d+)?|\d+(\.\d+)?\s*(?:mm|m|寸|"|”))', content, re.I)
    if size: 
        for s in size:
            raw_s = s[0]
            raw_specs_to_strip.append(raw_s)
            
            s_val = raw_s.strip()
            # 1) m 转 mm：如果结尾是 m 并且不是 mm
            if s_val.lower().endswith('m') and not s_val.lower().endswith('mm'):
                num_str = re.search(r'([\d\.]+)', s_val).group(1)
                num = float(num_str) * 1000
                s_val = f"{int(num) if num.is_integer() else num}mm"
            
            # 2) 符号换算与去空格
            s_val = s_val.replace('”', '"')
            s_val = s_val.replace('直径', 'Φ')
            s_val = s_val.replace(' ', '')
            
            specs.setdefault('尺寸/直径', set()).add(s_val)

    # 端口/点数/通道 (16点, 4口, 1通道)
    ports = re.findall(r'(\d+\s*(?:口|点|通道))', content)
    if ports:
        raw_specs_to_strip.extend([p for p in ports])
        specs['端口/点数'] = set([p.replace(' ', '') for p in ports])

    # --- 2. 基于分词与词性判断剥离型号特征 ---
    name_clean = raw_name
    
    # (a) 前置清理：用刚刚提取到的真实原始串，精准从名称进行定点去除 (解决像1080P被误删的问题)
    # 按从长到短排序，防止被子串覆盖
    raw_specs_to_strip.sort(key=len, reverse=True)
    for raw_pat in raw_specs_to_strip:
        name_clean = name_clean.replace(raw_pat, ' ')
    
    # (b) 清理括号及无用标点
    name_clean = re.sub(r'[\(\)（）/]', ' ', name_clean)
    
    # (c) Tokenization (将字符串打碎成连续的中文字符串 或 英文数字组合)
    name_tokens = re.findall(r'[A-Za-z0-9\.\-_]+|[\u4e00-\u9fa5]+', name_clean)
    
    final_name_tokens = []
    models_from_name = []
    
    for t in name_tokens:
        if re.match(r'^[\u4e00-\u9fa5]+$', t):
            final_name_tokens.append(t)
        elif t.upper() in ST_SET:
            final_name_tokens.append(t)
        else:
            if re.match(r'[A-Za-z0-9]', t) and (len(t) > 1 or t.isdigit()):
                models_from_name.append(t.strip(".-_"))
                
    # 重组干干净净的标准名称
    std_name = "".join(final_name_tokens).strip()

    # 安全降级策略
    if not std_name:
        if raw_name:
             if models_from_name: std_name = models_from_name[0]
             else: std_name = "未分类设备"
        else:
             std_name = "未分类设备"

    # 特殊名称后缀修补
    if "I" in final_name_tokens and "O" in final_name_tokens:
        std_name = std_name.replace("IO", "I/O")

    # --- 3. 全局型号 (产品型号) 深度提取与合并 ---
    model_content = content
    # 从文本中剥离出所有已提取为明确规格池的值 (如 220V, 500mm, 2P)，避免污染
    for dim_vals in specs.values():
        for v in dim_vals:
            model_content = model_content.replace(v, ' ')
    
    # 现在也把没有提取为规格的生肉（如1080P）放入待提取模型池，
    # 但是因为 1080P 包含英文和数字组合，会被下面的正则成功认定为“特征型号”
            
    complex_models = re.findall(r'\b(?:[A-Za-z]+[\-_0-9]+[A-Za-z0-9\-_]*|[0-9]+[\-_][A-Za-z]+[A-Za-z0-9\-_]*|[A-Za-z]{4,})\b', model_content)
    # 对于数字+英文字母组合的模型捕获（比如 1080P 等）
    short_numeric_models = re.findall(r'\b\d+[A-Za-z]+\b', model_content)
    
    all_models = set(models_from_name + complex_models + short_numeric_models)
    
    filtered_models = set()
    for m in all_models:
        m_upper = m.upper()
        if m_upper in ST_SET: continue
        
        # 捕捉防护等级
        if m_upper in ['IP54', 'IP55', 'IP65', 'IP67', 'IP68']:
            if '防护等级' not in specs: specs['防护等级'] = set()
            specs['防护等级'].add(m_upper)
            continue
            
        # 保留合格的型号
        if len(m) > 1 and m.upper() not in ["NAN", "HTTP", "WWW"]:
            filtered_models.add(m)
            
    if filtered_models:
        specs['产品型号'] = filtered_models

    unit = str(row.get('单位', ''))
    if pd.isna(unit) or unit.lower() == 'nan': unit = ""
    unit = unit.strip()

    return std_name, specs, unit

def main():
    if not os.path.exists(INPUT_FILE): return

    df = pd.read_excel(INPUT_FILE)
    results = {}

    for _, row in df.iterrows():
        std_name, row_specs, unit = parse_row(row)
        if not std_name: continue
        
        if std_name not in results:
            results[std_name] = {'specs': {}, 'units': set()}
        
        if unit:
            results[std_name]['units'].add(unit)
            
        for dim, vals in row_specs.items():
            if dim not in results[std_name]['specs']:
                results[std_name]['specs'][dim] = set()
            for v in vals:
                results[std_name]['specs'][dim].add(v)

    # 导出 Markdown
    md_lines = ["# 标准工料机信息汇总\n"]
    for name in sorted(results.keys()):
        data = results[name]
        md_lines.append(f"- 标准名称：{name}")
        
        for dim in sorted(data['specs'].keys()):
            vals = sorted(list(data['specs'][dim]))
            if vals:
                md_lines.append(f"  - {dim}：{'、'.join(vals)}")
        
        if data['units']:
            md_lines.append(f"  - 单位：{'、'.join(sorted(list(data['units'])))}")
        
        md_lines.append("")

    with open(OUTPUT_FILE, 'w', encoding='utf-8') as f:
        f.write("\n".join(md_lines))

if __name__ == "__main__":
    main()
