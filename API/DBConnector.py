import pyodbc
import yaml
import os
from ConfigReader import read_config



def ConnectToDB():
    
    server = config['DATABASE']['Server']
    database = config['DATABASE']['Database']
    # conn_str = (
    #             "DRIVER={ODBC Driver 17 for SQL Server};"
    #             "SERVER={DESKTOP-43G58KI\\SQLEXPRESS};"
    #             "DATABASE=Atlas;"
    #             "Trusted_Connection=yes;"
    #             )
    
    conn_str = f"DRIVER={{ODBC Driver 17 for SQL Server}};SERVER={server};DATABASE={database};Trusted_Connection=yes"       

    # conn_str = (
    # "DRIVER={ODBC Driver 17 for SQL Server};"
    # "SERVER=DESKTOP-43G58KI\SQLEXPRESS;"
    # "DATABASE=Atlas;"
    # "UID=dbo;"
    # "PWD=password;")
    conn = pyodbc.connect(conn_str)
    print("Connection Successful")
    conn.execute("USE ATLAS")
    cursor = conn.cursor()
    return cursor



config = read_config()

