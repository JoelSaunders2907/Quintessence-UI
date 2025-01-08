import xml.etree.ElementTree as ET
import DBConnector as DBConnector

def parse_process_xml_simplified():
    """
    Parse XML string into a dictionary with process names as keys and parameter names as values.

    :param xml_string: XML string from the database (str).
    :return: Dictionary with process names as keys and parameter names as values (list).
    """
    cursor = DBConnector.ConnectToDB()
    query = "SELECT [Configuration] FROM UI.APIProcess"
    all_configuration = cursor.execute(query).fetchall()

    config_dict = {}

    for config in all_configuration:
        xml_string = config[0]
        # Parse the XML string
        root = ET.fromstring(xml_string)

        # Extract the process name
        process_name = root.find("Name").text

        # Extract parameter names
        parameter_names = []
        param_collection = root.find("ParameterCollection")
        if param_collection is not None:
            for param in param_collection.findall("Parameter"):
                name = param.find("Name").text
                parameter_names.append(name)
        
        config_dict[process_name] = parameter_names

    #return {process_name: parameter_names}
    return config_dict

# # Example usage
# if __name__ == "__main__":
#     # Example XML string (retrieved from database)
#     xml_string = """
#     <Process>
#         <Name>Export CSV File</Name>
#         <ParameterCollection>
#             <Parameter>
#                 <Name>FileName</Name>
#                 <Value>data_export.csv</Value>
#             </Parameter>
#             <Parameter>
#                 <Name>ExportLocation</Name>
#                 <Value>/exports/files/</Value>
#             </Parameter>
#         </ParameterCollection>
#     </Process>
#     """

#     process_dict = parse_process_xml_simplified(xml_string)
#     print(process_dict)
