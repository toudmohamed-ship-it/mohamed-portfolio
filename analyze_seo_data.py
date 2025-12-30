
import pandas as pd
import os

files = [
    "C:\\Users\\MYC\\.gemini\\antigravity\\scratch\\mohamed-portfolio\\internal_all bright local.xlsx",
    "C:\\Users\\MYC\\.gemini\\antigravity\\scratch\\mohamed-portfolio\\internal_all semrush - Copy.xlsx"
]

for file_path in files:
    print(f"--- Analyzing {os.path.basename(file_path)} ---")
    try:
        # Try reading with openpyxl engine
        df = pd.read_excel(file_path, engine='openpyxl')
        print(f"Shape: {df.shape}")
        print("Columns:")
        print(df.columns.tolist())
        print("\nFirst 5 rows:")
        print(df.head())
        print("\n" + "="*30 + "\n")
    except Exception as e:
        print(f"Error reading {file_path}: {e}")
