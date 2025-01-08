import DBConnector as DBConnector
from datetime import datetime, timedelta
import json


def get_process_list():
    cursor = DBConnector.ConnectToDB()
    query = "SELECT [Name] FROM UI.Process"
    process_list_data_raw = cursor.execute(query).fetchall()

    process_list = []

    for process in process_list_data_raw:
        process_list.append(process[0])
    
    return process_list

def get_process_performance_data(processes,start_date,end_date):
    cursor = DBConnector.ConnectToDB()
    result_dict = {}

    # Create a temp table for Process, StartTime, EndTime
    temp_table_command = 'CREATE TABLE #Ranked_data ([name] VarChar(max),[context] xml,[statename] varchar(max),[timestamp] datetime,[rank] INT)'
    create_temp_table = cursor.execute(temp_table_command)

    # Populate Temp Table
    populate_command = """
    INSERT INTO #Ranked_data
    SELECT *
    FROM (
    SELECT [name],[context],[statename],[timestamp], DENSE_RANK() OVER (ORDER BY [Name], cast([Context] as varchar(max))) process_lifecycle
    FROM UI.vwProcessLog) ranked_data
    """

    populate_temp_table = cursor.execute(populate_command)

    

    for process in processes:
        timing_data_query = f"""
        SELECT *
        FROM (
        SELECT [start].[name], cast([start].[timestamp] as DATE) as [Date],[start].[timestamp] 'start time', [end].[timestamp] 'end time'
        FROM #Ranked_data [start]
        INNER JOIN #Ranked_data [end] on [start].[rank] = [end].[rank]
        WHERE [start].[statename] = 'RUNNING' and [end].[statename] = 'COMPLETED') a
        where a.[Date] between '{start_date}' and '{end_date}' and a.[name] = '{process}'
        """

        timing_data = cursor.execute(timing_data_query).fetchall()
        for process_name,process_date,process_start_time,process_end_time in timing_data:
            str_process_date = datetime.strftime(process_date,"%d %b %Y")
            if process_name not in result_dict:
                result_dict[process_name] = {}
            result_dict[process_name][process_date] = [process_start_time,process_end_time]

        # def convert_dates(obj):
        #     if isinstance(obj, (datetime.date, datetime.datetime)):
        #         return obj.isoformat()
        #     return obj

        print(result_dict)
        # Serialize the dictionary to JSON
        # json_result = json.dumps(result_dict, default=convert_dates)
        # print(json_result)

















    # for process in processes:
    #     print(process)
    #     starttime_query = f"""
    #     SELECT [TimeStamp]
    #     FROM UI.vwProcessLog
    #     WHERE [Name] = '{process}' 
    #     and [StateName] = 'RUNNING' 
    #     and [TimeStamp] >= '{start_date}'
    #     and [TimeStamp] <= '{end_date}'
    #     """
    #     print(starttime_query)
    #     endtime_query = f"""
    #     SELECT [TimeStamp]
    #     FROM UI.vwProcessLog
    #     WHERE [Name] = '{process}' 
    #     and [StateName] = 'COMPLETED' 
    #     and [TimeStamp] >= '{start_date}' 
    #     and [TimeStamp] <= '{end_date}'
    #     """
    #     #print(starttime_query)
    #     #print(endtime_query)
    #     process_start_time_raw = cursor.execute(starttime_query).fetchall()
    #     print(process_start_time_raw[0][0])
    #     process_start_time = process_start_time_raw[0][0]

    #     process_end_time_raw = cursor.execute(endtime_query).fetchall()
    #     process_end_time = process_end_time_raw[0][0]
        


    #     result_dict[process] = [process_start_time,process_end_time]
    
    #serializable_data = {key: [dt.isoformat() for dt in value] for key, value in result_dict.items()}

    return result_dict

# start_date = datetime(2024,12,23)
# end_date = datetime(2024,12,24)

# time_data = get_process_performance_data(['Cache Lookup','Calc PnL - Alchemy'],start_date, end_date)
# print(time_data)
    