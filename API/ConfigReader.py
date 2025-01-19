import yaml
import os


def read_config():
    current_dir = os.path.dirname(__file__)
    config_file_name = 'UI Config.yaml'
    full_path = current_dir + '\\' + config_file_name

    with open(full_path, 'r') as file:
        config = yaml.safe_load(file)
        #print(config)
    return config
#print(read_config())

def build_path():
    working_dir = os.path.join(os.path.dirname(__file__))
    relative_path = config['FRONTENDBUILD']['RelativePath']
    build_path = str(working_dir) + '\\' + relative_path
    #print(f'build_path: {build_path}')
    return build_path

config = read_config()