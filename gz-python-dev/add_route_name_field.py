#!/usr/bin/env python3
"""
添加 route_name 字段到 sys_menu 表
"""
import pymysql

# 数据库配置
DB_CONFIG = {
    'host': '127.0.0.1',
    'port': 3306,
    'user': 'root',
    'password': 'mysqlroot',
    'database': 'ruoyi-fastapi',
    'charset': 'utf8mb4'
}

# SQL语句
ALTER_SQL = """
ALTER TABLE sys_menu 
ADD COLUMN route_name varchar(50) DEFAULT '' COMMENT '路由名称' 
AFTER query;
"""

def main():
    """执行数据库更新"""
    connection = None
    try:
        # 连接数据库
        print("正在连接数据库...")
        connection = pymysql.connect(**DB_CONFIG)
        cursor = connection.cursor()
        
        # 检查字段是否已存在
        print("检查 route_name 字段是否存在...")
        cursor.execute("""
            SELECT COUNT(*) 
            FROM information_schema.COLUMNS 
            WHERE TABLE_SCHEMA = %s 
            AND TABLE_NAME = 'sys_menu' 
            AND COLUMN_NAME = 'route_name'
        """, (DB_CONFIG['database'],))
        
        exists = cursor.fetchone()[0]
        
        if exists:
            print("✓ route_name 字段已存在,无需添加")
        else:
            # 执行ALTER TABLE
            print("正在添加 route_name 字段...")
            cursor.execute(ALTER_SQL)
            connection.commit()
            print("✓ route_name 字段添加成功!")
        
        # 验证字段
        print("\n验证表结构:")
        cursor.execute("DESCRIBE sys_menu")
        columns = cursor.fetchall()
        
        print("\nsys_menu 表字段列表:")
        for col in columns:
            print(f"  - {col[0]}: {col[1]}")
        
        cursor.close()
        print("\n✓ 数据库更新完成!")
        
    except pymysql.Error as e:
        print(f"✗ 数据库错误: {e}")
        if connection:
            connection.rollback()
        return 1
    except Exception as e:
        print(f"✗ 错误: {e}")
        return 1
    finally:
        if connection:
            connection.close()
            print("数据库连接已关闭")
    
    return 0

if __name__ == '__main__':
    exit(main())
