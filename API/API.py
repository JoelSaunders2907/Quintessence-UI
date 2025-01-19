from flask import Flask, jsonify, make_response, request, send_from_directory
from flask_cors import CORS
import pyodbc
from icecream import ic
import json
from datetime import datetime, timedelta
import os

# Modules for Endpoint
import Hierarchy as Hierarchy
import ToolTip as ToolTip
import Holiday as Holiday
import History as History
import APIProcessList as APIProcessList
import ExecuteProcessViaAPI as ExecuteProcessViaAPI
import ProcessData as ProcessData

import ConfigReader as ConfigReader


config = ConfigReader.read_config()

#app = Flask(__name__)
#app = Flask(__name__,static_folder='C:/Users/Joel/Documents/Joel/Quintessence/Liberty/Atlas/UI/React V2/dist', static_url_path='/')
#app = Flask(__name__,static_folder=os.path.join(os.path.dirname(__file__),'..','React V2','dist'), static_url_path='/')
#print(build_path())
app = Flask(__name__,static_folder=ConfigReader.build_path(), static_url_path='/')
CORS(app)

# if the process name exists in this list, then we look for the key work on "EndDate" in the Context, otherwise we look for ValueDate
context_map = {'EndDate':['Calc PnL - Alchemy','Calc TB - Alchemy','Calc PnL - Hiport','Calc TB - Hiport']}

# Serve React static files
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve(path):
    # If the requested file exists in the dist folder, serve it
    if path != "" and os.path.exists(os.path.join(app.static_folder, path)):
        return send_from_directory(app.static_folder, path)
    # Otherwise, serve index.html (for React's client-side routing)
    else:
        return send_from_directory(app.static_folder, 'index.html')

#hierarchy endpoint
#@app.route('/hierarchy', methods=['GET'])
@app.route(config['ENDPOINTS']['HIERARCHY'], methods=['GET'])
def get_hierarchy_data():
    print(config['ENDPOINTS']['HIERARCHY'])
    date_string = request.args.get('date')
    date_object = datetime.strptime(date_string, '%Y-%m-%d')
    date = date_object.strftime('%d %b %Y')
    data = Hierarchy.fetch_hierarchy_data(context_map,date,False)
    return jsonify(data)


@app.route('/parallel_hierarchy', methods=['GET'])
def get_paralle_hierarchy_data():
    date_string = request.args.get('date')
    date_object = datetime.strptime(date_string, '%Y-%m-%d')
    date = date_object.strftime('%d %b %Y')
    data = Hierarchy.fetch_hierarchy_data(context_map,date,True)
    return jsonify(data)

#hierarchy endpoint
#@app.route('/tooltips', methods=['GET'])
@app.route(config['ENDPOINTS']['TOOLTIPS'], methods=['GET'])
def get_tool_tip_data():
    date_string = request.args.get('date')
    date_object = datetime.strptime(date_string, '%Y-%m-%d')
    date = date_object.strftime('%d %b %Y')
    data = ToolTip.fetch_tool_tip_data(context_map,date)
    response = json.dumps(data,ensure_ascii=False,sort_keys=False)
    return response

#@app.route('/holiday', methods=['GET'])
@app.route(config['ENDPOINTS']['HOLIDAYS'], methods=['GET'])
def get_holiday_data():
    date_string = request.args.get('date')
    date_object = datetime.strptime(date_string, '%Y-%m-%d')
    date = date_object.strftime('%d %b %Y')

    data = Holiday.get_holidays(date)
    response = json.dumps(data,ensure_ascii=False,sort_keys=False)
    return response

#@app.route('/history', methods=['GET'])
@app.route(config['ENDPOINTS']['HISTORY'], methods=['GET'])
def get_history():
    date_string = request.args.get('date')
    date = datetime.strptime(date_string, '%Y-%m-%d')
    next_date = date + timedelta(days = 1)
    print(date)
    print(next_date)
    #date = date_object.strftime('%d %b %Y')

    history_data = History.get_history(date,next_date)
    #print(history_data)
    response = json.dumps(history_data,ensure_ascii=False,sort_keys=False)
    return response

#@app.route('/api_process_list', methods=['GET'])
@app.route(config['ENDPOINTS']['API_PROCESS_LIST'], methods=['GET'])
def get_api_process_list():
    
    api_process_list = APIProcessList.parse_process_xml_simplified()
    #print(history_data)
    response = json.dumps(api_process_list,ensure_ascii=False,sort_keys=False)
    return response


#@app.route('/execute_process_via_api', methods=['GET'])
@app.route(config['ENDPOINTS']['EXECUTE_PROCESS'], methods=['GET'])
def execute_process_via_api():
    # Extract query string parameters
    data = request.args
    #process_name = request.args('ProcessName')
    # Get parameter names and values
    param_names = list(data.keys())
    print("Parameter Names:", param_names)

    param_values = list(data.values())
    print("Parameter Values:", param_values)
    
    response = ExecuteProcessViaAPI.run_process_via_api(param_names, param_values)
    #response = ExecuteProcessViaAPI.run_process_via_api(process_name, param_values)

    # return {
    #     "parameter_names": param_names,
    #     "parameter_values": param_values
    # }, 200

    return response
    #return jsonify({"param names":param_names,"param values": param_values})
    #process_list = ExecuteProcessViaAPI.run_process_via_api()
    #print(history_data)
    #response = json.dumps(process_list,ensure_ascii=False,sort_keys=False)
    #return response

#@app.route('/process_list', methods=['GET'])
@app.route(config['ENDPOINTS']['PROCESS_LIST'], methods=['GET'])
def get_process_list():
    
    process_list = ProcessData.get_process_list()
    #print(history_data)
    response = json.dumps(process_list,ensure_ascii=False,sort_keys=False)
    return response

#@app.route('/process_performance_data', methods=['GET'])
@app.route(config['ENDPOINTS']['PROCESS_PERFORMANCE_DATA'], methods=['GET'])
def get_process_performance_data():
    process_arr = request.args.getlist('process')
    start_date = request.args.get('startdate')
    start_date = datetime.strptime(start_date, '%Y-%m-%d')
    end_date = request.args.get('enddate')
    #end_date = datetime.strptime(end_date, '%Y-%m-%d') + timedelta(1)
    end_date = datetime.strptime(end_date, '%Y-%m-%d')

    print(process_arr)
    print(start_date)
    print(type(start_date))
    print(end_date)
    print(type(end_date))
    process_performance_data = ProcessData.get_process_performance_data(process_arr, start_date, end_date)
    print(process_performance_data)
#     serializable_data = {
#     key: [dt.isoformat() for dt in value] for key, value in process_performance_data.items()
# }
#     
    

    serializable_data = {
    key: {
        sub_key.strftime("%d %b %Y"): [dt.isoformat() for dt in sub_value]
        for sub_key, sub_value in value.items()
    }
    for key, value in process_performance_data.items()
}
    response = json.dumps(serializable_data,ensure_ascii=False,sort_keys=False)
    return response

if __name__ == '__main__':
    app.run(debug=True)