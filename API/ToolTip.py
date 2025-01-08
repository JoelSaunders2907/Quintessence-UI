import xml.etree.ElementTree as ET
import DBConnector as DBConnector

def latest_context_data(cursor,process,context_map,date):

    EndDate_processes = context_map['EndDate']
    
    if process in EndDate_processes:
        date_type_name = 'EndDate'
    else:
        date_type_name = 'ValueDate'
    # query = f"""
    # SELECT top(1) [Context]
    # FROM (
    #     select *, ROW_NUMBER() OVER (Partition by [Name], cast(Context as varchar(max)) order by [TimeStamp] desc) as row_num
    #     from UI.vwProcessLog
    #     where [name] = '{process}') ranked_log_data
    # WHERE ranked_log_data.row_num = 1
    # ORDER BY [TimeStamp] DESC
    # """

    query = f"""
    SELECT [Context]
    FROM UI.vwProcessLog
    WHERE [ID] = (
    SELECT  top(1) [ID]
    FROM (
    SELECT 
        ID, -- Assuming there's a unique identifier column in the table
        [Name],
        Item.value('@Key', 'NVARCHAR(100)') AS [Key],
        Item.value('@Value', 'NVARCHAR(100)') AS [Value],
        [StateName],
        [TimeStamp]
        
    FROM 
        UI.vwProcessLog

    CROSS APPLY 
        [Context].nodes('/KeyValuePairs/Item') AS KeyValue(Item)) ExpandedLogData
    where [name] = '{process}' and [key] = '{date_type_name}' and [value] = '{date}'
    --order by [TimeStamp] desc
    )
    ORDER BY [TimeStamp] DESC
    """

    context_data = cursor.execute(query).fetchall()
    if len(context_data) == 0:
        #print('no context data')
        return ''
    else:
        #print(context_data[0][0])
        return context_data[0][0]


def xml_to_dict(xml_string):
    """
    Convert an XML string to a dictionary where 'Key' attributes become dictionary keys
    and 'Value' attributes become dictionary values.
    
    Args:
        xml_string (str): XML data in string format.

    Returns:
        dict: A dictionary with keys and values extracted from XML.
    """
    try:
        # Parse the XML string
        root = ET.fromstring(xml_string)
        result = {}

        # Iterate over 'Item' elements and extract 'Key' and 'Value' attributes
        for item in root.findall(".//Item"):
            key = item.attrib.get("Key")
            value = item.attrib.get("Value")
            if key and value:  # Ensure both Key and Value exist
                result[key] = value


        return result
    except:
        return ''

def fetch_tool_tip_data(map,date):
    cursor = DBConnector.ConnectToDB()
    all_processes = cursor.execute('SELECT [Name] FROM UI.Process').fetchall()
    tool_tip_dict = {}
    for process in all_processes:
        #print(process[0])
        process_context_data_raw =  latest_context_data(cursor, process[0],map,date)

        tool_tip_dict[process[0]] = xml_to_dict(process_context_data_raw)
    
    return tool_tip_dict

#data = fetch_tool_tip_data()
#print(data)


