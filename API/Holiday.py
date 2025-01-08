import holidays
from datetime import datetime

def get_holidays(date_string: str):
    # Convert the input string to a datetime object
    try:
        date = datetime.strptime(date_string, '%d %b %Y')
    except ValueError:
        return "Invalid date format. Please use '%d %b %Y'."
    
    # Define the country holiday objects
    country_holidays = {
        "US Holiday": holidays.US(),
        "UK Holiday": holidays.UnitedKingdom(),
        "RSA Holiday": holidays.SouthAfrica()
    }
    
    # Find holidays for the given date
    holiday_list = []
    for country, holiday_obj in country_holidays.items():
        if date in holiday_obj:
            holiday_list.append(f"{country} - {holiday_obj.get(date)}")
    
    return holiday_list or ["No holidays found for the given date."]

# # Example usage
# date_input = "11 Nov 2024"
# holidays_found = get_holidays(date_input)
# print(holidays_found)
