#!/usr/bin/env python3
"""
重新初始化数据库
警告: 此操作将删除现有数据库并重新创建!
"""
import pymysql
import sys

# 数据库配置
DB_CONFIG = {
    'host': '127.0.0.1',
    'port': 3306,
    'user': 'root',
    'password': 'mysqlroot',
    'charset': 'utf8mb4'
}

DATABASE_NAME = 'ruoyi-fastapi'
SQL_FILE = 'sql/ruoyi-fastapi.sql'

def execute_sql_file(cursor, filepath):
    """执行SQL文件"""
    print(f"正在读取SQL文件: {filepath}")
    
    with open(filepath, 'r', encoding='utf-8') as f:
        sql_content = f.read()
    
    # 分割SQL语句(简单处理,按分号分割)
    # 移除注释和空行
    statements = []
    current_statement = []
    
    for line in sql_content.split('\n'):
        # 跳过注释行
        line = line.strip()
        if line.startswith('--') or line.startswith('#') or not line:
            continue
        
        # 跳过SET NAMES等命令
        if line.upper().startswith('SET NAMES'):
            continue
            
        current_statement.append(line)
        
        # 如果行以分号结束,执行语句
        if line.endswith(';'):
            statement = ' '.join(current_statement)
            if statement.strip():
                try:
                    cursor.execute(statement)
                except Exception as e:
                    # 某些语句可能失败(如DROP TABLE IF NOT EXISTS),继续执行
                    if 'Unknown table' not in str(e) and 'already exists' not in str(e):
                        print(f"警告: {e}")
            current_statement = []
    
    print("SQL文件执行完成")

def main():
    """主函数"""
    connection = None
    
    try:
        # 连接MySQL服务器(不指定数据库)
        print("=" * 60)
        print("数据库重新初始化工具")
        print("=" * 60)
        print(f"\n警告: 此操作将删除数据库 '{DATABASE_NAME}' 并重新创建!")
        print("所有现有数据将丢失!\n")
        
        # 自动确认(因为用户已选择方法3)
        print("正在连接MySQL服务器...")
        connection = pymysql.connect(**DB_CONFIG)
        cursor = connection.cursor()
        
        # 删除旧数据库
        print(f"\n1. 删除旧数据库 '{DATABASE_NAME}'...")
        cursor.execute(f"DROP DATABASE IF EXISTS `{DATABASE_NAME}`")
        print(f"   ✓ 数据库 '{DATABASE_NAME}' 已删除")
        
        # 创建新数据库
        print(f"\n2. 创建新数据库 '{DATABASE_NAME}'...")
        cursor.execute(
            f"CREATE DATABASE `{DATABASE_NAME}` "
            f"CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci"
        )
        print(f"   ✓ 数据库 '{DATABASE_NAME}' 已创建")
        
        # 切换到新数据库
        cursor.execute(f"USE `{DATABASE_NAME}`")
        
        # 执行SQL文件
        print(f"\n3. 导入SQL文件 '{SQL_FILE}'...")
        execute_sql_file(cursor, SQL_FILE)
        
        # 提交事务
        connection.commit()
        print("\n   ✓ SQL文件导入成功")
        
        # 验证表结构
        print("\n4. 验证数据库表...")
        cursor.execute("SHOW TABLES")
        tables = cursor.fetchall()
        print(f"   ✓ 共创建 {len(tables)} 个表")
        
        # 验证sys_menu表的route_name字段
        print("\n5. 验证 sys_menu 表的 route_name 字段...")
        cursor.execute("DESCRIBE sys_menu")
        columns = cursor.fetchall()
        
        route_name_exists = False
        for col in columns:
            if col[0] == 'route_name':
                route_name_exists = True
                print(f"   ✓ route_name 字段存在: {col[1]}")
                break
        
        if not route_name_exists:
            print("   ✗ 警告: route_name 字段不存在!")
            return 1
        
        # 显示部分表
        print("\n6. 数据库表列表:")
        for table in tables[:10]:
            print(f"   - {table[0]}")
        if len(tables) > 10:
            print(f"   ... 还有 {len(tables) - 10} 个表")
        
        cursor.close()
        
        print("\n" + "=" * 60)
        print("✓ 数据库初始化完成!")
        print("=" * 60)
        print("\n下一步:")
        print("1. 重启后端服务")
        print("2. 使用账号 'admin' 密码 'admin123' 登录")
        print("=" * 60)
        
        return 0
        
    except FileNotFoundError as e:
        print(f"\n✗ 错误: SQL文件未找到 - {e}")
        print(f"   请确保文件 '{SQL_FILE}' 存在")
        return 1
    except pymysql.Error as e:
        print(f"\n✗ 数据库错误: {e}")
        if connection:
            connection.rollback()
        return 1
    except Exception as e:
        print(f"\n✗ 错误: {e}")
        import traceback
        traceback.print_exc()
        return 1
    finally:
        if connection:
            connection.close()
            print("\n数据库连接已关闭")

if __name__ == '__main__':
    sys.exit(main())
