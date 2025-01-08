import pyodbc

def ConnectToDB():
    # conn_str = (
    # "DRIVER={ODBC Driver 17 for SQL Server};"
    # "SERVER=DESKTOP-43G58KI\SQLEXPRESS;"
    # "DATABASE=Atlas;"
    # "Trusted_Connection=yes;")
    conn_str = (
    "DRIVER={ODBC Driver 17 for SQL Server};"
    "SERVER=DESKTOP-43G58KI\SQLEXPRESS;"
    "DATABASE=Atlas;"
    "UID=Joel;"
    "PWD=password;")
    conn = pyodbc.connect(conn_str)
    print("Connection Successful")
    conn.execute("USE ATLAS")
    cursor = conn.cursor()
    return cursor