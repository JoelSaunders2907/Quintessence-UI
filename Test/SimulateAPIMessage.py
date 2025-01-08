import requests

url = "http://localhost:5001/send_message"
payload = {
    "ProcessName": "Bloomberg",
    "Context": "ValueDate:24 Dec 2024:DateTime",
    "State": "COMPLETED",
    "Sender": "UniCalc Engine"
}
response = requests.post(url, json=payload)
#print(response.json())

## Processes
# Prepare Reporting - Alchemy and CashMi
# Lookup
# Cache Lookup
# PnL - Alchemy
# Calc PnL - Alchemy
# TB - Alchemy
# Calc TB - Alchemy
# All Alchemy Source Files
# TRADE_CRN
# TRADE_ELNA
# TRADE_RSAB
# Prepare Reporting - Hiport
# PnL - Hiport
# Calc PnL - Hiport
# TB - Hiport
# Calc TB - Hiport
# All Hiport Source Files
# H2_HOLDING
# H3_HOLDING

## States
# FAILED
# WAITING
# IMPORTING
# RECONCILING
# RUNNING
# READY
# COMPLETED