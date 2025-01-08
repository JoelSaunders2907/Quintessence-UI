import { ProcessNode, TooltipData } from '../types/process';

export const mockHierarchyData: ProcessNode = {
  "Prepare Reporting - Alchemy and CashMi": [
    "RUNNING",
    {
      "Lookup": [
        "COMPLETED",
        {
          "All Alchemy Source Files": [
            "COMPLETED",
            {
              "TRADE_CRN": [
                "COMPLETED",
                {}
              ],
              "TRADE_ELNA": [
                "COMPLETED",
                {}
              ],
              "TRADE_RSAB": [
                "COMPLETED",
                {}
              ]
            }
          ],
          "Cache Lookup": [
            "COMPLETED",
            {}
          ]
        }
      ],
      "PnL - Alchemy": [
        "RUNNING",
        {
          "All Alchemy Source Files": [
            "COMPLETED",
            {
              "TRADE_CRN": [
                "COMPLETED",
                {}
              ],
              "TRADE_ELNA": [
                "COMPLETED",
                {}
              ],
              "TRADE_RSAB": [
                "COMPLETED",
                {}
              ]
            }
          ],
          "Calc PnL - Alchemy": [
            "RUNNING",
            {}
          ]
        }
      ],
      "TB - Alchemy": [
        "RUNNING",
        {
          "All Alchemy Source Files": [
            "COMPLETED",
            {
              "TRADE_CRN": [
                "COMPLETED",
                {}
              ],
              "TRADE_ELNA": [
                "COMPLETED",
                {}
              ],
              "TRADE_RSAB": [
                "COMPLETED",
                {}
              ]
            }
          ],
          "Calc TB - Alchemy": [
            "RUNNING",
            {}
          ]
        }
      ]
    }
  ],
  "Prepare Reporting - Hiport": [
    "WAITING",
    {
      "PnL - Hiport": [
        "WAITING",
        {
          "All Hiport Source Files": [
            "WAITING",
            {
              "H2_HOLDING": [
                "WAITING",
                {}
              ],
              "H3_HOLDING": [
                "WAITING",
                {}
              ]
            }
          ],
          "Calc PnL - Hiport": [
            "WAITING",
            {}
          ]
        }
      ],
      "TB - Hiport": [
        "WAITING",
        {
          "All Hiport Source Files": [
            "WAITING",
            {
              "H2_HOLDING": [
                "WAITING",
                {}
              ],
              "H3_HOLDING": [
                "WAITING",
                {}
              ]
            }
          ],
          "Calc TB - Hiport": [
            "WAITING",
            {}
          ]
        }
      ]
    }
  ]
};

export const mockTooltipData: TooltipData = {
  "All Alchemy Source Files": "",
  "All Hiport Source Files": "",
  "Cache Lookup": {
    "ValueDate": "22 Nov 2024"
  },
  "Calc PnL - Alchemy": {
    "Scope": "All TB Books",
    "ValueDate": "22 Nov 2024"
  },
  "Calc PnL - Hiport": "",
  "Calc TB - Alchemy": {
    "ValueDate": "22 Nov 2024"
  },
  "Calc TB - Hiport": "",
  "H2_HOLDING": "",
  "H3_HOLDING": "",
  "Lookup": "",
  "PnL - Alchemy": "",
  "PnL - Hiport": "",
  "Prepare Reporting - Alchemy and CashMi": "",
  "Prepare Reporting - Hiport": "",
  "TB - Alchemy": "",
  "TB - Hiport": "",
  "TRADE_CRN": {
    "ValueDate": "22 Nov 2024"
  },
  "TRADE_ELNA": {
    "ValueDate": "22 Nov 2024"
  },
  "TRADE_RSAB": {
    "ValueDate": "22 Nov 2024"
  }
};