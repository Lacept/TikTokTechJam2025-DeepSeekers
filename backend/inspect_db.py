#!/usr/bin/env python3
import sqlite3
from pathlib import Path

DB_PATH = Path("app.db")

def inspect_database():
    if not DB_PATH.exists():
        print("Database file doesn't exist yet.")
        return
    
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    cursor = conn.cursor()
    
    # Get all tables
    cursor.execute("SELECT name FROM sqlite_master WHERE type='table';")
    tables = cursor.fetchall()
    
    print("=== DATABASE INSPECTION ===\n")
    
    for table in tables:
        table_name = table[0]
        print(f"TABLE: {table_name}")
        print("-" * 40)
        
        # Get table schema
        cursor.execute(f"PRAGMA table_info({table_name});")
        columns = cursor.fetchall()
        print("Columns:")
        for col in columns:
            print(f"  {col[1]} ({col[2]})")
        
        # Get row count
        cursor.execute(f"SELECT COUNT(*) FROM {table_name};")
        count = cursor.fetchone()[0]
        print(f"Row count: {count}")
        
        # Show first 5 rows
        if count > 0:
            cursor.execute(f"SELECT * FROM {table_name} LIMIT 5;")
            rows = cursor.fetchall()
            print("Sample data (first 5 rows):")
            for row in rows:
                print(f"  {dict(row)}")
        
        print("\n")
    
    conn.close()

if __name__ == "__main__":
    inspect_database()