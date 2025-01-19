from flask import Flask, jsonify
from flask_cors import CORS
import pyodbc
from icecream import ic
import json

from DBConnector import ConnectToDB

ic.disable()



def populate_states(hierarchy,states):
        updated_hierarchy = {}
        for parent, children in hierarchy.items():
            #state = states.get(parent, "Unknown")
            state = states.get(parent, None)

            updated_hierarchy[parent] = [
                state,  # State of the parent
                populate_states(children)  # Recursively populate states for children
            ]
        return updated_hierarchy


# def ConnectToDB():
#         conn_str = (
#         "DRIVER={ODBC Driver 17 for SQL Server};"
#         "SERVER=DESKTOP-43G58KI\SQLEXPRESS;"
#         "DATABASE=Atlas;"
#         "Trusted_Connection=yes;")
#         # conn_str = (
#         # "DRIVER={ODBC Driver 17 for SQL Server};"
#         # "SERVER=DESKTOP-43G58KI\SQLEXPRESS;"
#         # "DATABASE=Atlas;"
#         # "UID=Joel;"
#         # "PWD=password;")
#         conn = pyodbc.connect(conn_str)
#         #print("Connection Successful")
#         conn.execute("USE ATLAS")
#         cursor = conn.cursor()
#         return cursor

def build_hierarchy(parallel_hierarchy):

    if parallel_hierarchy == False:
        query = 'SELECT ParentProcessName, ChildProcessName FROM UI.vwRelationship'
    else:
        query = 'SELECT ParentProcessName, ParallelProcessName FROM UI.vwParallelProcess'

    rows = []
    
    #print(rows)
    
    cursor = ConnectToDB()
    
    # Fetch relationships
    #relationship_query = "SELECT ParentProcessName, ChildProcessName FROM UI.vwRelationship"
    #relationship_query = f"SELECT ParentProcessName, ChildProcessName FROM {table_to_query}"
    print(query)

    cursor.execute(query)
    rows = cursor.fetchall()
    
    #print(rows)
    #print(len(rows))
    relationships = {}
    for parent, child in rows:
        if parent not in relationships:
            relationships[parent] = []
        relationships[parent].append(child)

    # Find root nodes
    all_parents = set(relationships.keys())
    all_children = {child for children in relationships.values() for child in children}
    root_nodes = all_parents - all_children

    # Recursive function to build the hierarchy
    def build_hierarchy(parent):
        children = relationships.get(parent, [])
        return {child: build_hierarchy(child) for child in children}

    hierarchy = {root: build_hierarchy(root) for root in root_nodes}

    # Fetch states
    state_query = "SELECT [Name], [StateName] FROM dbo.vwProcessLog"
    cursor.execute(state_query)
    state_rows = cursor.fetchall()
    
    states = {process: state for process, state in state_rows}
    #ic(states)

    # Populate hierarchy with states
    def populate_states(hierarchy):
        updated_hierarchy = {}
        for parent, children in hierarchy.items():
            #state = states.get(parent, "Unknown")
            state = states.get(parent, None)

            updated_hierarchy[parent] = [
                #state,  # State of the parent
                None,
                populate_states(children)  # Recursively populate states for children
            ]
        return updated_hierarchy

    hierarchy_with_states = populate_states(hierarchy)

    # Close the connection
    cursor.close()

    return hierarchy_with_states, hierarchy
    #return hierarchy

def build_reverse_hierarchy(tree):
    result = []
    result_dict = {}

    def traverse(node):
        if isinstance(node, dict):
            for key, value in node.items():
                if isinstance(value, list) and len(value) > 1:
                    traverse(value[1])
                result_dict[key] = None
                
        elif isinstance(node, list):
            for item in node:
                traverse(item)

    traverse(tree)
    #return result, result_dict
    return result_dict

def ProcessStateDetermination(cursor, process):
    query = f"SELECT DeterminationType FROM UI.Process where Name = '{process}'"
    try:
        determination_type = cursor.execute(query).fetchall()[0][0]
        return determination_type
    except Exception as e:
        ic(f'Cannot find the process {process}')
        
def calculate_process_state(cursor,process,parallel_hierarchy):
    # Get the children of the current process
    # Get the children states
    # Get the ordinal for the states
    # Select the lowest state
    #try:
    #ic.enable()
    ic('time to calculate process state')
    ic.disable()
    if parallel_hierarchy == False:
        children_query = f"""
        SELECT ChildProcessName
        FROM UI.vwRelationship
        WHERE ParentProcessName = '{process}' and isRequired = 1
        ORDER BY ChildOrder ASC
        """
    else:
        children_query = f"""
        SELECT ParallelProcessName
        FROM UI.vwParallelProcess
        WHERE ParentProcessName = '{process}'
        """
    #ic('Children query')
    #print(children_query)
    child_state_arr = []
    children = cursor.execute(children_query).fetchall()
    ic(children)
    for child in children:
        #ic.enable()
        ic(child[0])
        
        current_child_state = reverse_hierarchy[child[0]]
        ic(current_child_state)
        child_state_arr.append(current_child_state)
        ic.disable()
    #ic.enable()
    ic(child_state_arr)
    ic.disable()
    state_order_query = """
    SELECT [Name]
    FROM UI.[State]
    ORDER BY Ordinal ASC
    """

    state_order_raw = cursor.execute(state_order_query).fetchall()
    state_order = []
    for state in state_order_raw:
        state_order.append(state[0])

    #ic.enable()
    ic(state_order)
    ic.disable()
    state_found = False
    #ic(state_order)
    for state in state_order:
        #ic(state)
        if state in child_state_arr:
            ic(f'found matching state: {state}')
            ic(f'Calculated state of {state} for process {process}')
            state_found = True
            return state
            break
    
    
    if state_found == False:
        #ic.enable()
        ic('found no state for children, assign default value')
        return 'WAITING'
        ic.disable()
        pass
        

    # except:
    #     ic(f'Cannot find parent process {process} in vwRelationship')
    
    return reverse_hierarchy

def calculate_default_state_value():
    pass

#def get_latest_logged_state(cursor,process,use_default = bool):
def get_latest_logged_state(cursor,process,context_map,date,use_default = bool): 
    EndDate_processes = context_map['EndDate']
    
    if process in EndDate_processes:
        date_type_name = 'EndDate'
    else:
        date_type_name = 'ValueDate'
    default_state_query = """
    SELECT [Name]
    FROM UI.[State]
    WHERE isDefault = 1
    """
    default_state_value = cursor.execute(default_state_query).fetchall()
    default_state_value = default_state_value[0][0] #returns as a tuple, so just select the value
    #ic(process)
    #ic(default_state_value)

    # query = f"""
    # SELECT top(1) [StateName]
    # FROM (
    #     select *, ROW_NUMBER() OVER (Partition by [Name], cast(Context as varchar(max)) order by [TimeStamp] desc) as row_num
    #     from UI.vwProcessLog
    #     where [name] = '{process}') ranked_log_data
    # WHERE ranked_log_data.row_num = 1
    # ORDER BY [TimeStamp] DESC
    # """

    query = f"""
    SELECT  top(1) [statename]
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
    order by [TimeStamp] desc
    """
    
    try:
        latest_logged_state = cursor.execute(query).fetchall()[0][0]
        
        ic(f'latest logged state for process: {process} is {latest_logged_state}')
        
        return latest_logged_state
    except:
        if use_default:
            ic(f'no state logged, returning default state value of {default_state_value}')
            #return default_state_value
            return None
        else:
            return None

#def populate_reverse_hierarchy(cursor, reverse_hierarchy):
def populate_reverse_hierarchy(cursor, reverse_hierarchy,context_map,date,parallel_hierarchy):
    # check if the current process is externally logged, if so, fetch from log table otherwise populate with default value
    # if internal/calculated then calculate
    # if both, first see if there is an item logged, otherwise calculate
    ic('populate reverse hierarchy')


    # for process in reverse_hierarchy.keys():
    #     #ic.enable()
    #     #ic(process)
    #     ic.disable()
    #     #ic(reverse_hierarchy)
    #     DeterminationType = ProcessStateDetermination(cursor, process)
    #     ic(f'process: {process} is determined {DeterminationType}')
        
    #     if DeterminationType == "Logged": # find the latest log entry for this process, and if you can't use the default value
            
    #         #status = get_latest_logged_state(cursor,process,True)
    #         status = get_latest_logged_state(cursor,process,context_map,date,True)
    #         reverse_hierarchy[process] = status
            
    #     elif DeterminationType == "Calculated":
    #         #calculated_state = calculate_process_state(cursor, process, parallel_hierarchy)
    #         status = calculate_process_state(cursor, process, parallel_hierarchy)

    #         #reverse_hierarchy[process] = calculated_state
    #         reverse_hierarchy[process] = status

    #     #ic.enable()
    #     #ic(status)
    #     ic.disable()
    
    for process in reverse_hierarchy.keys():
        #ic.enable()
        ic(process)
        ic.disable()
        #ic(reverse_hierarchy)
        
        logged_status = get_latest_logged_state(cursor,process,context_map,date,True)
        #ic.enable()
        ic(logged_status)
        ic.disable()
        if logged_status == None:
            calcualted_state = calculate_process_state(cursor, process, parallel_hierarchy)
            status = calcualted_state
        else:
            status = logged_status

        reverse_hierarchy[process] = status

        #ic.enable()
        ic(status)
        ic.disable()

    return reverse_hierarchy

def populate_hierarchy(hierarchy, states,parallel_hierarchy):
    #ic(hierarchy)
    #ic(states)
    updated_hierarchy = {}
    if parallel_hierarchy == False:
        for parent, children in hierarchy.items():
            #state = states.get(parent, "Unknown")
            state = states.get(parent, None)

            updated_hierarchy[parent] = [
                #state,  # State of the parent
                state,
                #populate_hierarchy(children,states)  # Recursively populate states for children
                populate_hierarchy(children,states,parallel_hierarchy)  # Recursively populate states for children
                
            ]
    else:
        
        for parent, children in hierarchy.items():
            #state = states.get(parent, "Unknown")
            state = states.get(parent, None)

            updated_hierarchy[parent] = [
                state,  # State of the parent
                #populate_hierarchy(children,states)  # Recursively populate states for children
                populate_hierarchy(children,states,parallel_hierarchy)  # Recursively populate states for children

            ]

    return updated_hierarchy

    #populated_hierarchy = populate_states(hierarchy)
    #return populate_reverse_hierarchy

def fetch_hierarchy_data(map,date,parallel_hierarchy = bool):
    
    global reverse_hierarchy
    hierarchy_objects = ()
    hierarchy = {}
    unpopulated_hierarchy = {}
    reverse_hierarchy = {}
    populated_reverse_hierarchy = {}
    populated_hierarchy = {}
    
    cursor = ConnectToDB()
    hierarchy_objects = build_hierarchy(parallel_hierarchy)
    
    hierarchy = hierarchy_objects[0]
    ##ic.enable()
    #ic(hierarchy)
    #ic.disable()
    unpopulated_hierarchy = hierarchy_objects[1]
    
    #ic(hierarchy)
    #ic(unpopulated_hierarchy)
    
    reverse_hierarchy = build_reverse_hierarchy(hierarchy)
    ic(reverse_hierarchy)
    #populated_reverse_hierarchy = populate_reverse_hierarchy(cursor,reverse_hierarchy)
    populated_reverse_hierarchy = populate_reverse_hierarchy(cursor,reverse_hierarchy,map,date,parallel_hierarchy)

    ic(populated_reverse_hierarchy)
    populated_hierarchy = populate_hierarchy(unpopulated_hierarchy, populated_reverse_hierarchy,parallel_hierarchy)
    ic(populated_hierarchy)

    return populated_hierarchy

# # For Testing
# context_map = {'EndDate':['Calc PnL - Alchemy','Calc TB - Alchemy','Calc PnL - Hiport','Calc TB - Hiport','Warehouse Load - PnL - Alchemy - Delete','Warehouse Load - PnL - Alchemy - Update','Warehouse Load - TB - Alchemy - Delete','Warehouse Load - TB - Alchemy - Update']}
# date = '06 Jan 2025'
# parallel_hierarchy = False
# hierarchy_data = fetch_hierarchy_data(context_map,date,parallel_hierarchy)



