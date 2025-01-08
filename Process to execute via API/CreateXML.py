import xml.etree.ElementTree as ET

def create_process_xml(process_name, parameters):
    """
    Create an XML representation of a process with parameters.

    :param process_name: Name of the process (str).
    :param parameters: Dictionary of parameter names and values.
    :return: XML string.
    """
    # Create the root element for the process
    root = ET.Element("Process")
    
    # Add the process name as a sub-element
    name_element = ET.SubElement(root, "Name")
    name_element.text = process_name

    # Create the parameter collection
    param_collection = ET.SubElement(root, "ParameterCollection")

    # Add each parameter to the collection
    for param_name, param_value in parameters.items():
        param = ET.SubElement(param_collection, "Parameter")
        
        # Add parameter name
        name = ET.SubElement(param, "Name")
        name.text = param_name

        # Add parameter value
        value = ET.SubElement(param, "Value")
        value.text = param_value

    # Generate the XML string
    return ET.tostring(root, encoding="utf-8", method="xml").decode("utf-8")

# Example usage
if __name__ == "__main__":
    process_name = "Generate PnL"
    parameters = {
        "ValueDate": "-1",
        "Scope": "All Trial Balance Books Basket",
        "UpdateWarehouse":"True",
        "Notify":"True"
    }
    
    xml_output = create_process_xml(process_name, parameters)
    print(xml_output)
