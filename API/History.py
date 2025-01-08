import datetime
import DBConnector as DBConnector
from collections import defaultdict

def get_history(selected_date, next_date):
    cursor = DBConnector.ConnectToDB()
    query = f"""
    SELECT [name],[StateName],[TimeStamp]
    FROM UI.vwProcessLog
    WHERE TimeStamp between '{selected_date}' and '{next_date}'
    ORDER BY [Name], [TimeStamp] asc
    """
    history_data = cursor.execute(query).fetchall()
    print(history_data)

    # Transform the data into a dictionary
    history_dict = defaultdict(list)
    for process, state, timestamp in history_data:
        history_dict[process].append({
        "state": state,
        "timestamp": timestamp.isoformat()  # Convert datetime to ISO 8601 string
    })

    return history_dict
#date = datetime.datetime(2024,12,18)
#next_date = datetime.datetime(2024,12,19)
#data = get_history(date,next_date)
#print(dict(data))
