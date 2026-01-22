import pandas as pd

file_path = "/Users/liuwu/Desktop/GY-EP Project/南站水厂主材设备各品牌询价.xlsx"
# Read without header first to see raw structure for first 10 rows
df = pd.read_excel(file_path, sheet_name='甲供设备', header=None, nrows=10)
print(df.to_string())
