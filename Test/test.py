import json
from datetime import datetime

process_performance_data = {
    'Prepare Reporting - Alchemy and CashMi': [
        datetime(2024, 12, 21, 9, 46, 27, 83000),
        datetime(2024, 12, 21, 9, 46, 48, 243000)
    ],
    'Prepare Reporting - Hiport': [
        datetime(2024, 12, 21, 9, 47, 24, 497000),
        datetime(2024, 12, 21, 9, 47, 26, 943000)
    ]
}

# Convert datetime objects to ISO format strings
serializable_data = {
    key: [dt.isoformat() for dt in value] for key, value in process_performance_data.items()
}

response = json.dumps(serializable_data, ensure_ascii=False, sort_keys=False)
print(response)
