import pandas as pd
import json
import re

def parse_material_data(file_path):
    # Read without header to rely on fixed column indices
    df = pd.read_excel(file_path, sheet_name='甲供设备', header=None)
    
    # Initialize result structure
    project = {
        "id": "p1",
        "name": "南站水厂项目",
        "stages": []
    }
    
    current_stage = None
    stage_id_counter = 1
    material_id_counter = 1
    
    # Analyze from row 5 onwards (index 5 is the first "Package" row)
    start_row_index = 5
    
    for index, row in df.iloc[start_row_index:].iterrows():
        # Stop if we have processed too many empty rows or reached end
        if pd.isna(row[0]) and pd.isna(row[1]):
            continue

        seq = str(row[0]).strip() if pd.notna(row[0]) else ""
        name_desc = str(row[1]).strip() if pd.notna(row[1]) else ""
        
        # Identify Stage (Chinese number in Seq OR "采购子包" in description)
        if re.match(r'^[一二三四五六七八九十]+$', seq) or "采购子包" in name_desc:
            stage_name = name_desc.split(":")[-1] if ":" in name_desc else name_desc
            
            current_stage = {
                "id": f"s{stage_id_counter}",
                "projectId": "p1",
                "name": stage_name,
                "materials": []
            }
            project["stages"].append(current_stage)
            stage_id_counter += 1
            
            # Limit to 5 stages
            if len(project["stages"]) > 5:
                break
            continue
            
        # Identify Material (Arabic number in Seq)
        if current_stage and seq.isdigit():
            material_name = name_desc
            spec = str(row[3]).strip() if pd.notna(row[3]) else ""
            unit = str(row[4]).strip() if pd.notna(row[4]) else "台"
            
            try:
                base_price = float(row[10]) if pd.notna(row[10]) else 100000
            except:
                base_price = 100000

            material = {
                "id": f"m{material_id_counter}",
                "stageId": current_stage["id"],
                "name": material_name,
                "specification": spec,
                "unit": unit,
                "basePrice": base_price
            }
            current_stage["materials"].append(material)
            material_id_counter += 1
            
            # Limit to 146 total items roughly or just rely on loop
            if material_id_counter > 150:
                break
                
    return project

if __name__ == "__main__":
    file_path = "/Users/liuwu/Desktop/GY-EP Project/南站水厂主材设备各品牌询价.xlsx"
    try:
        data = parse_material_data(file_path)
        print(json.dumps(data, ensure_ascii=False, indent=2))
    except Exception as e:
        print(f"Error: {e}")
