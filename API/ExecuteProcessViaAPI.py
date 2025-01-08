import time

def run_process_via_api(process,params):
    time.sleep(5)
    output = f'{process} and {params}'
    output = ''
    
    output_dict = {"Status": "Sucuess", "Context":output}
    return output_dict

run_process_via_api('Generate Pnl',['ValueDate:19 Dec 2024','Scope:All Trial Balance Books Basket'])

