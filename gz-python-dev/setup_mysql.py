#!/usr/bin/env python3
"""
设置MySQL root密码并初始化数据库
"""
import pymysql
import sys
import time

# 等待MySQL完全启动
print("等待MySQL服务完全启动...")
time.sleep(3)

# 第一步:使用空密码连接并设置密码
print("\n步骤1: 设置root密码...")
try:
    # 连接MySQL(无密码)
    connection = pymysql.connect(
        host='127.0.0.1',
        port=3306,
        user='root',
        password='',
        charset='utf8mb4'
    )
    cursor = connection.cursor()
    
    # 设置root密码
    cursor.execute("ALTER USER 'root'@'localhost' IDENTIFIED BY 'mysqlroot';")
    cursor.execute("FLUSH PRIVILEGES;")
    connection.commit()
    cursor.close()
    connection.close()
    print("✓ root密码已设置为: mysqlroot")
    
except pymysql.Error as e:
    # 如果密码已经设置,尝试使用mysqlroot连接
    print(f"  使用空密码连接失败,尝试使用已设置的密码...")
    try:
        connection = pymysql.connect(
            host='127.0.0.1',
            port=3306,
            user='root',
            password='mysqlroot',
            charset='utf8mb4'
        )
        connection.close()
        print("✓ root密码已经是: mysqlroot")
    except Exception as e2:
        print(f"✗ 错误: {e2}")
        sys.exit(1)

# 第二步:创建数据库
print("\n步骤2: 创建数据库...")
try:
    connection = pymysql.connect(
        host='127.0.0.1',
        port=3306,
        user='root',
        password='mysqlroot',
        charset='utf8mb4'
    )
    cursor = connection.cursor()
    
    # 删除旧数据库(如果存在)
    cursor.execute("DROP DATABASE IF EXISTS `ruoyi-fastapi`")
    print("  已删除旧数据库(如果存在)")
    
    # 创建新数据库
    cursor.execute(
        "CREATE DATABASE `ruoyi-fastapi` "
        "CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci"
    )
    print("✓ 数据库 'ruoyi-fastapi' 创建成功")
    
    cursor.close()
    connection.close()
    
except pymysql.Error as e:
    print(f"✗ 创建数据库失败: {e}")
    sys.exit(1)

# 第三步:导入SQL文件
print("\n步骤3: 导入SQL文件...")
try:
    connection = pymysql.connect(
        host='127.0.0.1',
        port=3306,
        user='root',
        password='mysqlroot',
        database='ruoyi-fastapi',
        charset='utf8mb4'
    )
    cursor = connection.cursor()
    
    # 读取SQL文件
    sql_file = 'sql/ruoyi-fastapi.sql'
    print(f"  正在读取: {sql_file}")
    
    with open(sql_file, 'r', encoding='utf8') as f:
        sql_content = f.read()
    
    # 分割并执行SQL语句
    statements = []
    current_statement = []
    
    for line in sql_content.split('\n'):
        line = line.strip()
        
        # 跳过注释和空行
        if line.startswith('--') or line.startswith('#') or not line:
            continue
        
        # 跳过SET NAMES
        if line.upper().startswith('SET NAMES'):
            continue
        
        current_statement.append(line)
        
        if line.endswith(';'):
            statement = ' '.join(current_statement)
            if statement.strip():
                statements.append(statement)
            current_statement = []
    
    print(f"  共 {len(statements)} 条SQL语句")
    
    # 执行SQL语句
    executed = 0
    for i, statement in enumerate(statements, 1):
        try:
            cursor.execute(statement)
            executed += 1
            if i % 50 == 0:
                print(f"  已执行 {i}/{len(statements)} 条语句...")
        except Exception as e:
            # 忽略某些预期的错误
            if 'Unknown table' not in str(e) and 'already exists' not in str(e):
                print(f"  警告 (语句 {i}): {e}")
    
    connection.commit()
    print(f"✓ 成功执行 {executed} 条SQL语句")
    
    # 验证表
    cursor.execute("SHOW TABLES")
    tables = cursor.fetchall()
    print(f"✓ 数据库包含 {len(tables)} 个表")
    
    # 验证route_name字段
    cursor.execute("DESCRIBE sys_menu")
    columns = cursor.fetchall()
    
    route_name_found = False
    for col in columns:
        if col[0] == 'route_name':
            route_name_found = True
            print(f"✓ route_name 字段存在: {col[1]}")
            break
    
    if not route_name_found:
        print("✗ 警告: route_name 字段未找到!")
    
    cursor.close()
    connection.close()
    
    print("\n" + "=" * 60)
    print("✓ 数据库初始化完成!")
    print("=" * 60)
    print("\n数据库连接信息:")
    print("  主机: 127.0.0.1")
    print("  端口: 3306")
    print("  用户: root")
    print("  密码: mysqlroot")
    print("  数据库: ruoyi-fastapi")
    print("\n下一步:")
    print("  1. 重启后端服务")
    print("  2. 使用账号 'admin' 密码 'admin123' 登录")
    print("=" * 60)
    
except FileNotFoundError:
    print(f"✗ SQL文件未找到: {sql_file}")
    sys.exit(1)
except pymysql.Error as e:
    print(f"✗ 数据库错误: {e}")
    sys.exit(1)
except Exception as e:
    print(f"✗ 错误: {e}")
    import traceback
    traceback.print_exc()
    sys.exit(1)
