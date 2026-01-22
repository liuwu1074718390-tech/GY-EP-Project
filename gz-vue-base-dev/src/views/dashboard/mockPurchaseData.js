// 采购比价模拟数据
// 自动生成于：2026-01-22T05:42:18.478Z

export const purchaseProjects = [
  {
    "id": "p1",
    "name": "南站水厂项目",
    "stages": [
      {
        "id": "s1",
        "projectId": "p1",
        "name": "提升泵及配套设备",
        "materials": [
          {
            "id": "m1",
            "stageId": "s1",
            "name": "提升水泵",
            "specification": "潜污泵，Q=2083m3/h，H=9.5m，N=75kW，带变频控制、导轨及自耦系统",
            "unit": "台",
            "bids": [
              {
                "bidder": "东方电气集团",
                "brand": "ABB",
                "priceExcludingTax": 486119,
                "taxRate": 13,
                "note": "原厂正品，质保3年",
                "priceIncludingTax": 549314,
                "isWinning": false
              },
              {
                "bidder": "上海连成（集团）有限公司",
                "brand": "连成",
                "priceExcludingTax": 590228,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 666957,
                "isWinning": false
              },
              {
                "bidder": "赛莱默（中国）有限公司",
                "brand": "西门子",
                "priceExcludingTax": 588738,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 665273,
                "isWinning": false
              },
              {
                "bidder": "中联重科股份有限公司",
                "brand": "西门子",
                "priceExcludingTax": 444149,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 501888,
                "isWinning": true
              }
            ],
            "winningBid": {
              "bidder": "中联重科股份有限公司",
              "price": 501888,
              "date": "2024-03-15"
            },
            "historicalPrices": [
              {
                "projectName": "西部污水处理厂项目",
                "winningPrice": 443908,
                "changeRate": 13.1,
                "winningBidder": "赛莱默（中国）有限公司"
              },
              {
                "projectName": "北部水质净化中心",
                "winningPrice": 522077,
                "changeRate": -3.9,
                "winningBidder": "赛莱默（中国）有限公司"
              },
              {
                "projectName": "市政污水厂扩建工程",
                "winningPrice": 570910,
                "changeRate": -12.1,
                "winningBidder": "上海连成（集团）有限公司"
              }
            ]
          },
          {
            "id": "m2",
            "stageId": "s1",
            "name": "提升水泵",
            "specification": "潜污泵，Q=1041m3/h，H=9.5m，N=37kW，带变频控制、导轨及自耦系统",
            "unit": "台",
            "bids": [
              {
                "bidder": "格兰富泵业（上海）有限公司",
                "brand": "威乐",
                "priceExcludingTax": 415204,
                "taxRate": 13,
                "note": "原厂正品，质保3年",
                "priceIncludingTax": 469180,
                "isWinning": false
              },
              {
                "bidder": "上海连成（集团）有限公司",
                "brand": "丹麦APV",
                "priceExcludingTax": 296358,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 334884,
                "isWinning": false
              },
              {
                "bidder": "施耐德电气（中国）有限公司",
                "brand": "连成",
                "priceExcludingTax": 386134,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 436331,
                "isWinning": false
              },
              {
                "bidder": "碧水源科技股份有限公司",
                "brand": "施耐德",
                "priceExcludingTax": 347887,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 393112,
                "isWinning": false
              }
            ],
            "winningBid": null,
            "historicalPrices": [
              {
                "projectName": "西部污水处理厂项目",
                "winningPrice": 334054,
                "changeRate": 0.2,
                "winningBidder": "施耐德电气（中国）有限公司"
              },
              {
                "projectName": "北部水质净化中心",
                "winningPrice": 303779,
                "changeRate": 10.2,
                "winningBidder": "上海连成（集团）有限公司"
              },
              {
                "projectName": "市政污水厂扩建工程",
                "winningPrice": 372713,
                "changeRate": -10.1,
                "winningBidder": "施耐德电气（中国）有限公司"
              }
            ]
          }
        ]
      },
      {
        "id": "s2",
        "projectId": "p1",
        "name": "内进流格栅除污机及其配套设备",
        "materials": [
          {
            "id": "m3",
            "stageId": "s2",
            "name": "细格栅",
            "specification": "内进流孔板式格栅，渠宽1.5m，栅隙5mm，N=0.75kW，单台过水量≥2100m3/h，主体不锈钢",
            "unit": "台",
            "bids": [
              {
                "bidder": "赛莱默（中国）有限公司",
                "brand": "ABB",
                "priceExcludingTax": 627071,
                "taxRate": 13,
                "note": "原厂正品，质保3年",
                "priceIncludingTax": 708590,
                "isWinning": false
              },
              {
                "bidder": "碧水源科技股份有限公司",
                "brand": "KSB",
                "priceExcludingTax": 639131,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 722218,
                "isWinning": false
              },
              {
                "bidder": "凯泉泵业集团有限公司",
                "brand": "施耐德",
                "priceExcludingTax": 577624,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 652715,
                "isWinning": false
              },
              {
                "bidder": "东方电气集团",
                "brand": "格兰富",
                "priceExcludingTax": 556162,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 628463,
                "isWinning": true
              }
            ],
            "winningBid": {
              "bidder": "东方电气集团",
              "price": 628463,
              "date": "2024-03-15"
            },
            "historicalPrices": [
              {
                "projectName": "西部污水处理厂项目",
                "winningPrice": 680024,
                "changeRate": -7.6,
                "winningBidder": "赛莱默（中国）有限公司"
              },
              {
                "projectName": "北部水质净化中心",
                "winningPrice": 572371,
                "changeRate": 9.8,
                "winningBidder": "赛莱默（中国）有限公司"
              },
              {
                "projectName": "市政污水厂扩建工程",
                "winningPrice": 643997,
                "changeRate": -2.4,
                "winningBidder": "凯泉泵业集团有限公司"
              }
            ]
          },
          {
            "id": "m4",
            "stageId": "s2",
            "name": "螺旋压榨机",
            "specification": "过滤精度3mm， N=2.2kW",
            "unit": "台",
            "bids": [
              {
                "bidder": "赛莱默（中国）有限公司",
                "brand": "碧水源",
                "priceExcludingTax": 59070,
                "taxRate": 13,
                "note": "原厂正品，质保3年",
                "priceIncludingTax": 66749,
                "isWinning": true
              },
              {
                "bidder": "三一重工股份有限公司",
                "brand": "威乐",
                "priceExcludingTax": 72030,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 81393,
                "isWinning": false
              },
              {
                "bidder": "施耐德电气（中国）有限公司",
                "brand": "ABB",
                "priceExcludingTax": 74023,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 83645,
                "isWinning": false
              },
              {
                "bidder": "中联重科股份有限公司",
                "brand": "格兰富",
                "priceExcludingTax": 63791,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 72083,
                "isWinning": false
              }
            ],
            "winningBid": {
              "bidder": "赛莱默（中国）有限公司",
              "price": 66749,
              "date": "2024-03-15"
            },
            "historicalPrices": [
              {
                "projectName": "西部污水处理厂项目",
                "winningPrice": 71403,
                "changeRate": -6.5,
                "winningBidder": "施耐德电气（中国）有限公司"
              },
              {
                "projectName": "北部水质净化中心",
                "winningPrice": 70870,
                "changeRate": -5.8,
                "winningBidder": "施耐德电气（中国）有限公司"
              },
              {
                "projectName": "市政污水厂扩建工程",
                "winningPrice": 62888,
                "changeRate": 6.1,
                "winningBidder": "中联重科股份有限公司"
              }
            ]
          },
          {
            "id": "m5",
            "stageId": "s2",
            "name": "输渣管",
            "specification": "与格栅系统配套，长度≈12m，不锈钢材质，含支腿及观察口",
            "unit": "套",
            "bids": [
              {
                "bidder": "凯泉泵业集团有限公司",
                "brand": "西门子",
                "priceExcludingTax": 65328,
                "taxRate": 13,
                "note": "原厂正品，质保3年",
                "priceIncludingTax": 73820,
                "isWinning": false
              },
              {
                "bidder": "上海连成（集团）有限公司",
                "brand": "KSB",
                "priceExcludingTax": 55435,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 62641,
                "isWinning": false
              },
              {
                "bidder": "施耐德电气（中国）有限公司",
                "brand": "碧水源",
                "priceExcludingTax": 61551,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 69552,
                "isWinning": false
              },
              {
                "bidder": "碧水源科技股份有限公司",
                "brand": "西门子",
                "priceExcludingTax": 67320,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 76071,
                "isWinning": false
              }
            ],
            "winningBid": null,
            "historicalPrices": [
              {
                "projectName": "西部污水处理厂项目",
                "winningPrice": 56207,
                "changeRate": 11.4,
                "winningBidder": "上海连成（集团）有限公司"
              },
              {
                "projectName": "北部水质净化中心",
                "winningPrice": 54309,
                "changeRate": 15.3,
                "winningBidder": "碧水源科技股份有限公司"
              },
              {
                "projectName": "市政污水厂扩建工程",
                "winningPrice": 57894,
                "changeRate": 8.2,
                "winningBidder": "碧水源科技股份有限公司"
              }
            ]
          },
          {
            "id": "m6",
            "stageId": "s2",
            "name": "冲洗泵组",
            "specification": "立式多级泵组，单泵Q=8m³/h，H=81m，N=3kW，带变频控制、进口过滤器",
            "unit": "台",
            "bids": [
              {
                "bidder": "施耐德电气（中国）有限公司",
                "brand": "KSB",
                "priceExcludingTax": 48350,
                "taxRate": 13,
                "note": "原厂正品，质保3年",
                "priceIncludingTax": 54635,
                "isWinning": false
              },
              {
                "bidder": "东方电气集团",
                "brand": "格兰富",
                "priceExcludingTax": 36167,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 40868,
                "isWinning": true
              },
              {
                "bidder": "中联重科股份有限公司",
                "brand": "凯泉",
                "priceExcludingTax": 36478,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 41220,
                "isWinning": false
              },
              {
                "bidder": "上海连成（集团）有限公司",
                "brand": "西门子",
                "priceExcludingTax": 50903,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 57520,
                "isWinning": false
              }
            ],
            "winningBid": {
              "bidder": "东方电气集团",
              "price": 40868,
              "date": "2024-03-15"
            },
            "historicalPrices": [
              {
                "projectName": "西部污水处理厂项目",
                "winningPrice": 38873,
                "changeRate": 5.1,
                "winningBidder": "中联重科股份有限公司"
              },
              {
                "projectName": "北部水质净化中心",
                "winningPrice": 44994,
                "changeRate": -9.2,
                "winningBidder": "上海连成（集团）有限公司"
              },
              {
                "projectName": "市政污水厂扩建工程",
                "winningPrice": 46751,
                "changeRate": -12.6,
                "winningBidder": "上海连成（集团）有限公司"
              }
            ]
          },
          {
            "id": "m7",
            "stageId": "s2",
            "name": "储水箱",
            "specification": "不锈钢方形水箱，V=12m3，含成套冲洗水管路控制阀门、接头、过滤器、仪表等",
            "unit": "个",
            "bids": [
              {
                "bidder": "上海连成（集团）有限公司",
                "brand": "KSB",
                "priceExcludingTax": 27900,
                "taxRate": 13,
                "note": "原厂正品，质保3年",
                "priceIncludingTax": 31526,
                "isWinning": false
              },
              {
                "bidder": "赛莱默（中国）有限公司",
                "brand": "威乐",
                "priceExcludingTax": 31578,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 35683,
                "isWinning": false
              },
              {
                "bidder": "碧水源科技股份有限公司",
                "brand": "KSB",
                "priceExcludingTax": 25823,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 29179,
                "isWinning": true
              },
              {
                "bidder": "三一重工股份有限公司",
                "brand": "KSB",
                "priceExcludingTax": 34868,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 39400,
                "isWinning": false
              }
            ],
            "winningBid": {
              "bidder": "碧水源科技股份有限公司",
              "price": 29179,
              "date": "2024-03-15"
            },
            "historicalPrices": [
              {
                "projectName": "西部污水处理厂项目",
                "winningPrice": 29228,
                "changeRate": -0.2,
                "winningBidder": "碧水源科技股份有限公司"
              },
              {
                "projectName": "北部水质净化中心",
                "winningPrice": 32482,
                "changeRate": -10.2,
                "winningBidder": "碧水源科技股份有限公司"
              },
              {
                "projectName": "市政污水厂扩建工程",
                "winningPrice": 32870,
                "changeRate": -11.2,
                "winningBidder": "赛莱默（中国）有限公司"
              }
            ]
          },
          {
            "id": "m8",
            "stageId": "s2",
            "name": "膜格栅",
            "specification": "内进流孔板式格栅，渠宽1.6m，栅隙1mm，N=2.2kW ，网板宽度1800mm，单台过水量≥1580m3/h",
            "unit": "台",
            "bids": [
              {
                "bidder": "碧水源科技股份有限公司",
                "brand": "ABB",
                "priceExcludingTax": 595671,
                "taxRate": 13,
                "note": "原厂正品，质保3年",
                "priceIncludingTax": 673108,
                "isWinning": true
              },
              {
                "bidder": "凯泉泵业集团有限公司",
                "brand": "ABB",
                "priceExcludingTax": 605359,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 684055,
                "isWinning": false
              },
              {
                "bidder": "施耐德电气（中国）有限公司",
                "brand": "施耐德",
                "priceExcludingTax": 646549,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 730600,
                "isWinning": false
              },
              {
                "bidder": "上海连成（集团）有限公司",
                "brand": "KSB",
                "priceExcludingTax": 615415,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 695418,
                "isWinning": false
              }
            ],
            "winningBid": {
              "bidder": "碧水源科技股份有限公司",
              "price": 673108,
              "date": "2024-03-15"
            },
            "historicalPrices": [
              {
                "projectName": "西部污水处理厂项目",
                "winningPrice": 714092,
                "changeRate": -5.7,
                "winningBidder": "凯泉泵业集团有限公司"
              },
              {
                "projectName": "北部水质净化中心",
                "winningPrice": 582257,
                "changeRate": 15.6,
                "winningBidder": "上海连成（集团）有限公司"
              },
              {
                "projectName": "市政污水厂扩建工程",
                "winningPrice": 676109,
                "changeRate": -0.4,
                "winningBidder": "凯泉泵业集团有限公司"
              }
            ]
          },
          {
            "id": "m9",
            "stageId": "s2",
            "name": "螺旋压榨机",
            "specification": "过滤精度2mm，N=3kW",
            "unit": "台",
            "bids": [
              {
                "bidder": "格兰富泵业（上海）有限公司",
                "brand": "碧水源",
                "priceExcludingTax": 50201,
                "taxRate": 13,
                "note": "原厂正品，质保3年",
                "priceIncludingTax": 56727,
                "isWinning": true
              },
              {
                "bidder": "ABB（中国）有限公司",
                "brand": "西门子",
                "priceExcludingTax": 67534,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 76313,
                "isWinning": false
              },
              {
                "bidder": "上海连成（集团）有限公司",
                "brand": "碧水源",
                "priceExcludingTax": 62931,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 71112,
                "isWinning": false
              },
              {
                "bidder": "西门子（中国）有限公司",
                "brand": "KSB",
                "priceExcludingTax": 65810,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 74365,
                "isWinning": false
              }
            ],
            "winningBid": {
              "bidder": "格兰富泵业（上海）有限公司",
              "price": 56727,
              "date": "2024-03-15"
            },
            "historicalPrices": [
              {
                "projectName": "西部污水处理厂项目",
                "winningPrice": 55324,
                "changeRate": 2.5,
                "winningBidder": "上海连成（集团）有限公司"
              },
              {
                "projectName": "北部水质净化中心",
                "winningPrice": 62491,
                "changeRate": -9.2,
                "winningBidder": "上海连成（集团）有限公司"
              },
              {
                "projectName": "市政污水厂扩建工程",
                "winningPrice": 49096,
                "changeRate": 15.5,
                "winningBidder": "上海连成（集团）有限公司"
              }
            ]
          },
          {
            "id": "m10",
            "stageId": "s2",
            "name": "输渣管",
            "specification": "与格栅系统配套，长度≈16m，不锈钢材质，含支腿及观察口",
            "unit": "套",
            "bids": [
              {
                "bidder": "凯泉泵业集团有限公司",
                "brand": "西门子",
                "priceExcludingTax": 78933,
                "taxRate": 13,
                "note": "原厂正品，质保3年",
                "priceIncludingTax": 89194,
                "isWinning": true
              },
              {
                "bidder": "威乐(中国)水泵系统有限公司",
                "brand": "凯泉",
                "priceExcludingTax": 106065,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 119853,
                "isWinning": false
              },
              {
                "bidder": "ABB（中国）有限公司",
                "brand": "西门子",
                "priceExcludingTax": 84604,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 95602,
                "isWinning": false
              },
              {
                "bidder": "碧水源科技股份有限公司",
                "brand": "KSB",
                "priceExcludingTax": 84446,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 95423,
                "isWinning": false
              }
            ],
            "winningBid": {
              "bidder": "凯泉泵业集团有限公司",
              "price": 89194,
              "date": "2024-03-15"
            },
            "historicalPrices": [
              {
                "projectName": "西部污水处理厂项目",
                "winningPrice": 81067,
                "changeRate": 10,
                "winningBidder": "威乐(中国)水泵系统有限公司"
              },
              {
                "projectName": "北部水质净化中心",
                "winningPrice": 90926,
                "changeRate": -1.9,
                "winningBidder": "碧水源科技股份有限公司"
              },
              {
                "projectName": "市政污水厂扩建工程",
                "winningPrice": 98298,
                "changeRate": -9.3,
                "winningBidder": "凯泉泵业集团有限公司"
              }
            ]
          },
          {
            "id": "m11",
            "stageId": "s2",
            "name": "恒压冲洗泵组",
            "specification": "立式多级泵组，单泵Q=30m³/h，H=80m，N=11kW，带变频控制、进口过滤器",
            "unit": "台",
            "bids": [
              {
                "bidder": "中联重科股份有限公司",
                "brand": "威乐",
                "priceExcludingTax": 41290,
                "taxRate": 13,
                "note": "原厂正品，质保3年",
                "priceIncludingTax": 46657,
                "isWinning": false
              },
              {
                "bidder": "格兰富泵业（上海）有限公司",
                "brand": "施耐德",
                "priceExcludingTax": 46722,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 52795,
                "isWinning": false
              },
              {
                "bidder": "ABB（中国）有限公司",
                "brand": "威乐",
                "priceExcludingTax": 40951,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 46274,
                "isWinning": true
              },
              {
                "bidder": "上海连成（集团）有限公司",
                "brand": "连成",
                "priceExcludingTax": 46371,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 52399,
                "isWinning": false
              }
            ],
            "winningBid": {
              "bidder": "ABB（中国）有限公司",
              "price": 46274,
              "date": "2024-03-15"
            },
            "historicalPrices": [
              {
                "projectName": "西部污水处理厂项目",
                "winningPrice": 47403,
                "changeRate": -2.4,
                "winningBidder": "ABB（中国）有限公司"
              },
              {
                "projectName": "北部水质净化中心",
                "winningPrice": 43418,
                "changeRate": 6.6,
                "winningBidder": "上海连成（集团）有限公司"
              },
              {
                "projectName": "市政污水厂扩建工程",
                "winningPrice": 39341,
                "changeRate": 17.6,
                "winningBidder": "中联重科股份有限公司"
              }
            ]
          },
          {
            "id": "m12",
            "stageId": "s2",
            "name": "储水箱",
            "specification": "不锈钢方形水箱，V=12m3，含成套冲洗水管路控制阀门、接头、过滤器、仪表等",
            "unit": "个",
            "bids": [
              {
                "bidder": "威乐(中国)水泵系统有限公司",
                "brand": "西门子",
                "priceExcludingTax": 57747,
                "taxRate": 13,
                "note": "原厂正品，质保3年",
                "priceIncludingTax": 65254,
                "isWinning": false
              },
              {
                "bidder": "凯泉泵业集团有限公司",
                "brand": "丹麦APV",
                "priceExcludingTax": 62190,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 70274,
                "isWinning": false
              },
              {
                "bidder": "碧水源科技股份有限公司",
                "brand": "威乐",
                "priceExcludingTax": 53928,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 60938,
                "isWinning": false
              },
              {
                "bidder": "上海连成（集团）有限公司",
                "brand": "施耐德",
                "priceExcludingTax": 51031,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 57665,
                "isWinning": true
              }
            ],
            "winningBid": {
              "bidder": "上海连成（集团）有限公司",
              "price": 57665,
              "date": "2024-03-15"
            },
            "historicalPrices": [
              {
                "projectName": "西部污水处理厂项目",
                "winningPrice": 53782,
                "changeRate": 7.2,
                "winningBidder": "上海连成（集团）有限公司"
              },
              {
                "projectName": "北部水质净化中心",
                "winningPrice": 65796,
                "changeRate": -12.4,
                "winningBidder": "上海连成（集团）有限公司"
              },
              {
                "projectName": "市政污水厂扩建工程",
                "winningPrice": 51458,
                "changeRate": 12.1,
                "winningBidder": "碧水源科技股份有限公司"
              }
            ]
          }
        ]
      },
      {
        "id": "s3",
        "projectId": "p1",
        "name": "立式搅拌器及配套设备",
        "materials": [
          {
            "id": "m13",
            "stageId": "s3",
            "name": "厌氧搅拌器",
            "specification": "不锈钢立式搅拌器，D=4m，N=4kW，带变频控制，缺氧Ⅰ",
            "unit": "台",
            "bids": [
              {
                "bidder": "威乐(中国)水泵系统有限公司",
                "brand": "格兰富",
                "priceExcludingTax": 81958,
                "taxRate": 13,
                "note": "原厂正品，质保3年",
                "priceIncludingTax": 92612,
                "isWinning": false
              },
              {
                "bidder": "格兰富泵业（上海）有限公司",
                "brand": "格兰富",
                "priceExcludingTax": 110012,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 124313,
                "isWinning": false
              },
              {
                "bidder": "上海连成（集团）有限公司",
                "brand": "KSB",
                "priceExcludingTax": 107439,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 121406,
                "isWinning": false
              },
              {
                "bidder": "西门子（中国）有限公司",
                "brand": "KSB",
                "priceExcludingTax": 97876,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 110599,
                "isWinning": true
              }
            ],
            "winningBid": {
              "bidder": "西门子（中国）有限公司",
              "price": 110599,
              "date": "2024-03-15"
            },
            "historicalPrices": [
              {
                "projectName": "西部污水处理厂项目",
                "winningPrice": 95467,
                "changeRate": 15.9,
                "winningBidder": "格兰富泵业（上海）有限公司"
              },
              {
                "projectName": "北部水质净化中心",
                "winningPrice": 103908,
                "changeRate": 6.4,
                "winningBidder": "西门子（中国）有限公司"
              },
              {
                "projectName": "市政污水厂扩建工程",
                "winningPrice": 101278,
                "changeRate": 9.2,
                "winningBidder": "西门子（中国）有限公司"
              }
            ]
          },
          {
            "id": "m14",
            "stageId": "s3",
            "name": "缺氧搅拌器",
            "specification": "不锈钢立式搅拌器，D=4.2m，N=7.5kW，带变频控制，缺氧Ⅱ",
            "unit": "套",
            "bids": [
              {
                "bidder": "威乐(中国)水泵系统有限公司",
                "brand": "丹麦APV",
                "priceExcludingTax": 124724,
                "taxRate": 13,
                "note": "原厂正品，质保3年",
                "priceIncludingTax": 140938,
                "isWinning": false
              },
              {
                "bidder": "三一重工股份有限公司",
                "brand": "凯泉",
                "priceExcludingTax": 115543,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 130563,
                "isWinning": false
              },
              {
                "bidder": "ABB（中国）有限公司",
                "brand": "ABB",
                "priceExcludingTax": 113813,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 128608,
                "isWinning": false
              },
              {
                "bidder": "碧水源科技股份有限公司",
                "brand": "威乐",
                "priceExcludingTax": 89204,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 100800,
                "isWinning": true
              }
            ],
            "winningBid": {
              "bidder": "碧水源科技股份有限公司",
              "price": 100800,
              "date": "2024-03-15"
            },
            "historicalPrices": [
              {
                "projectName": "西部污水处理厂项目",
                "winningPrice": 95020,
                "changeRate": 6.1,
                "winningBidder": "ABB（中国）有限公司"
              },
              {
                "projectName": "北部水质净化中心",
                "winningPrice": 112948,
                "changeRate": -10.8,
                "winningBidder": "碧水源科技股份有限公司"
              },
              {
                "projectName": "市政污水厂扩建工程",
                "winningPrice": 113309,
                "changeRate": -11,
                "winningBidder": "三一重工股份有限公司"
              }
            ]
          }
        ]
      },
      {
        "id": "s4",
        "projectId": "p1",
        "name": "潜水推流器及配套设备",
        "materials": [
          {
            "id": "m15",
            "stageId": "s4",
            "name": "缺氧推流器",
            "specification": "不锈钢低速推流器，N=15kW",
            "unit": "台",
            "bids": [
              {
                "bidder": "三一重工股份有限公司",
                "brand": "凯泉",
                "priceExcludingTax": 112954,
                "taxRate": 13,
                "note": "原厂正品，质保3年",
                "priceIncludingTax": 127638,
                "isWinning": true
              },
              {
                "bidder": "格兰富泵业（上海）有限公司",
                "brand": "凯泉",
                "priceExcludingTax": 122794,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 138757,
                "isWinning": false
              },
              {
                "bidder": "威乐(中国)水泵系统有限公司",
                "brand": "连成",
                "priceExcludingTax": 131029,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 148062,
                "isWinning": false
              },
              {
                "bidder": "ABB（中国）有限公司",
                "brand": "连成",
                "priceExcludingTax": 135718,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 153361,
                "isWinning": false
              }
            ],
            "winningBid": {
              "bidder": "三一重工股份有限公司",
              "price": 127638,
              "date": "2024-03-15"
            },
            "historicalPrices": [
              {
                "projectName": "西部污水处理厂项目",
                "winningPrice": 125126,
                "changeRate": 2,
                "winningBidder": "ABB（中国）有限公司"
              },
              {
                "projectName": "北部水质净化中心",
                "winningPrice": 129297,
                "changeRate": -1.3,
                "winningBidder": "ABB（中国）有限公司"
              },
              {
                "projectName": "市政污水厂扩建工程",
                "winningPrice": 146652,
                "changeRate": -13,
                "winningBidder": "三一重工股份有限公司"
              }
            ]
          }
        ]
      },
      {
        "id": "s5",
        "projectId": "p1",
        "name": "MBR膜池工艺系统及配套设备（50%）",
        "materials": [
          {
            "id": "m16",
            "stageId": "s5",
            "name": "膜组器系统",
            "specification": "PVDF中空纤维膜组器,单渠道出水量Q≥9375m3/d,组器框架不锈钢材质,含产水、曝气接头等,每个渠道含8套膜组器",
            "unit": "台",
            "bids": [
              {
                "bidder": "碧水源科技股份有限公司",
                "brand": "施耐德",
                "priceExcludingTax": 27382452,
                "taxRate": 13,
                "note": "原厂正品，质保3年",
                "priceIncludingTax": 30942170,
                "isWinning": true
              },
              {
                "bidder": "中联重科股份有限公司",
                "brand": "碧水源",
                "priceExcludingTax": 27795171,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 31408543,
                "isWinning": false
              },
              {
                "bidder": "三一重工股份有限公司",
                "brand": "KSB",
                "priceExcludingTax": 27537952,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 31117885,
                "isWinning": false
              },
              {
                "bidder": "东方电气集团",
                "brand": "KSB",
                "priceExcludingTax": 28671724,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 32399048,
                "isWinning": false
              }
            ],
            "winningBid": {
              "bidder": "碧水源科技股份有限公司",
              "price": 30942170,
              "date": "2024-03-15"
            },
            "historicalPrices": [
              {
                "projectName": "西部污水处理厂项目",
                "winningPrice": 28080914,
                "changeRate": 10.2,
                "winningBidder": "东方电气集团"
              },
              {
                "projectName": "北部水质净化中心",
                "winningPrice": 32593228,
                "changeRate": -5.1,
                "winningBidder": "碧水源科技股份有限公司"
              },
              {
                "projectName": "市政污水厂扩建工程",
                "winningPrice": 31299299,
                "changeRate": -1.1,
                "winningBidder": "碧水源科技股份有限公司"
              }
            ]
          },
          {
            "id": "m17",
            "stageId": "s5",
            "name": "进水闸门",
            "specification": "不锈钢附壁方闸门，B×H=1000×1000mm，N=0.75kW，带手电一体启闭机",
            "unit": "台",
            "bids": [
              {
                "bidder": "格兰富泵业（上海）有限公司",
                "brand": "ABB",
                "priceExcludingTax": 32783,
                "taxRate": 13,
                "note": "原厂正品，质保3年",
                "priceIncludingTax": 37044,
                "isWinning": false
              },
              {
                "bidder": "上海连成（集团）有限公司",
                "brand": "ABB",
                "priceExcludingTax": 25970,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 29346,
                "isWinning": false
              },
              {
                "bidder": "东方电气集团",
                "brand": "西门子",
                "priceExcludingTax": 30643,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 34626,
                "isWinning": false
              },
              {
                "bidder": "威乐(中国)水泵系统有限公司",
                "brand": "KSB",
                "priceExcludingTax": 23158,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 26168,
                "isWinning": true
              }
            ],
            "winningBid": {
              "bidder": "威乐(中国)水泵系统有限公司",
              "price": 26168,
              "date": "2024-03-15"
            },
            "historicalPrices": [
              {
                "projectName": "西部污水处理厂项目",
                "winningPrice": 26191,
                "changeRate": -0.1,
                "winningBidder": "上海连成（集团）有限公司"
              },
              {
                "projectName": "北部水质净化中心",
                "winningPrice": 23781,
                "changeRate": 10,
                "winningBidder": "威乐(中国)水泵系统有限公司"
              },
              {
                "projectName": "市政污水厂扩建工程",
                "winningPrice": 24476,
                "changeRate": 6.9,
                "winningBidder": "上海连成（集团）有限公司"
              }
            ]
          },
          {
            "id": "m18",
            "stageId": "s5",
            "name": "出水闸门",
            "specification": "不锈钢附壁方闸门，B×H=1000×1000mm，N=0.75kW，带手电一体启闭机",
            "unit": "台",
            "bids": [
              {
                "bidder": "格兰富泵业（上海）有限公司",
                "brand": "格兰富",
                "priceExcludingTax": 92429,
                "taxRate": 13,
                "note": "原厂正品，质保3年",
                "priceIncludingTax": 104444,
                "isWinning": true
              },
              {
                "bidder": "威乐(中国)水泵系统有限公司",
                "brand": "ABB",
                "priceExcludingTax": 117717,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 133020,
                "isWinning": false
              },
              {
                "bidder": "赛莱默（中国）有限公司",
                "brand": "丹麦APV",
                "priceExcludingTax": 106200,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 120005,
                "isWinning": false
              },
              {
                "bidder": "中联重科股份有限公司",
                "brand": "连成",
                "priceExcludingTax": 81817,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 92453,
                "isWinning": false
              }
            ],
            "winningBid": {
              "bidder": "格兰富泵业（上海）有限公司",
              "price": 104444,
              "date": "2024-03-15"
            },
            "historicalPrices": [
              {
                "projectName": "西部污水处理厂项目",
                "winningPrice": 111608,
                "changeRate": -6.4,
                "winningBidder": "格兰富泵业（上海）有限公司"
              },
              {
                "projectName": "北部水质净化中心",
                "winningPrice": 115108,
                "changeRate": -9.3,
                "winningBidder": "中联重科股份有限公司"
              },
              {
                "projectName": "市政污水厂扩建工程",
                "winningPrice": 107545,
                "changeRate": -2.9,
                "winningBidder": "格兰富泵业（上海）有限公司"
              }
            ]
          },
          {
            "id": "m19",
            "stageId": "s5",
            "name": "电动葫芦",
            "specification": "起重量5T，起吊高度12m，行程约340m，N=0.8×2+7.5kW",
            "unit": "台",
            "bids": [
              {
                "bidder": "三一重工股份有限公司",
                "brand": "西门子",
                "priceExcludingTax": 50326,
                "taxRate": 13,
                "note": "原厂正品，质保3年",
                "priceIncludingTax": 56868,
                "isWinning": false
              },
              {
                "bidder": "碧水源科技股份有限公司",
                "brand": "丹麦APV",
                "priceExcludingTax": 44333,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 50096,
                "isWinning": false
              },
              {
                "bidder": "上海连成（集团）有限公司",
                "brand": "西门子",
                "priceExcludingTax": 41868,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 47310,
                "isWinning": false
              },
              {
                "bidder": "中联重科股份有限公司",
                "brand": "格兰富",
                "priceExcludingTax": 41596,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 47003,
                "isWinning": true
              }
            ],
            "winningBid": {
              "bidder": "中联重科股份有限公司",
              "price": 47003,
              "date": "2024-03-15"
            },
            "historicalPrices": [
              {
                "projectName": "西部污水处理厂项目",
                "winningPrice": 53892,
                "changeRate": -12.8,
                "winningBidder": "中联重科股份有限公司"
              },
              {
                "projectName": "北部水质净化中心",
                "winningPrice": 54014,
                "changeRate": -13,
                "winningBidder": "碧水源科技股份有限公司"
              },
              {
                "projectName": "市政污水厂扩建工程",
                "winningPrice": 51747,
                "changeRate": -9.2,
                "winningBidder": "三一重工股份有限公司"
              }
            ]
          },
          {
            "id": "m20",
            "stageId": "s5",
            "name": "产水泵",
            "specification": "卧式离心泵，Q=481m3/h，H=20m，N=37kW，汽蚀余量≤3m，带变频控制",
            "unit": "台",
            "bids": [
              {
                "bidder": "ABB（中国）有限公司",
                "brand": "ABB",
                "priceExcludingTax": 49710,
                "taxRate": 13,
                "note": "原厂正品，质保3年",
                "priceIncludingTax": 56172,
                "isWinning": false
              },
              {
                "bidder": "中联重科股份有限公司",
                "brand": "ABB",
                "priceExcludingTax": 43502,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 49157,
                "isWinning": false
              },
              {
                "bidder": "威乐(中国)水泵系统有限公司",
                "brand": "威乐",
                "priceExcludingTax": 45598,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 51525,
                "isWinning": true
              },
              {
                "bidder": "格兰富泵业（上海）有限公司",
                "brand": "ABB",
                "priceExcludingTax": 55257,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 62440,
                "isWinning": false
              }
            ],
            "winningBid": {
              "bidder": "威乐(中国)水泵系统有限公司",
              "price": 51525,
              "date": "2024-03-15"
            },
            "historicalPrices": [
              {
                "projectName": "西部污水处理厂项目",
                "winningPrice": 54174,
                "changeRate": -4.9,
                "winningBidder": "ABB（中国）有限公司"
              },
              {
                "projectName": "北部水质净化中心",
                "winningPrice": 51645,
                "changeRate": -0.2,
                "winningBidder": "格兰富泵业（上海）有限公司"
              },
              {
                "projectName": "市政污水厂扩建工程",
                "winningPrice": 58437,
                "changeRate": -11.8,
                "winningBidder": "中联重科股份有限公司"
              }
            ]
          },
          {
            "id": "m21",
            "stageId": "s5",
            "name": "产水专用设备",
            "specification": "Φ500×1100mm，SS316材质，每套含2个音叉液位计",
            "unit": "台",
            "bids": [
              {
                "bidder": "赛莱默（中国）有限公司",
                "brand": "连成",
                "priceExcludingTax": 43488,
                "taxRate": 13,
                "note": "原厂正品，质保3年",
                "priceIncludingTax": 49141,
                "isWinning": true
              },
              {
                "bidder": "格兰富泵业（上海）有限公司",
                "brand": "西门子",
                "priceExcludingTax": 47300,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 53448,
                "isWinning": false
              },
              {
                "bidder": "三一重工股份有限公司",
                "brand": "格兰富",
                "priceExcludingTax": 48744,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 55080,
                "isWinning": false
              },
              {
                "bidder": "ABB（中国）有限公司",
                "brand": "丹麦APV",
                "priceExcludingTax": 47119,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 53244,
                "isWinning": false
              }
            ],
            "winningBid": {
              "bidder": "赛莱默（中国）有限公司",
              "price": 49141,
              "date": "2024-03-15"
            },
            "historicalPrices": [
              {
                "projectName": "西部污水处理厂项目",
                "winningPrice": 50778,
                "changeRate": -3.2,
                "winningBidder": "赛莱默（中国）有限公司"
              },
              {
                "projectName": "北部水质净化中心",
                "winningPrice": 42342,
                "changeRate": 16.1,
                "winningBidder": "三一重工股份有限公司"
              },
              {
                "projectName": "市政污水厂扩建工程",
                "winningPrice": 45184,
                "changeRate": 8.8,
                "winningBidder": "ABB（中国）有限公司"
              }
            ]
          },
          {
            "id": "m22",
            "stageId": "s5",
            "name": "CIP泵",
            "specification": "卧式离心泵，Q=251m3/h,H=12m,N=15kW，带变频控制",
            "unit": "台",
            "bids": [
              {
                "bidder": "上海连成（集团）有限公司",
                "brand": "连成",
                "priceExcludingTax": 26983,
                "taxRate": 13,
                "note": "原厂正品，质保3年",
                "priceIncludingTax": 30490,
                "isWinning": true
              },
              {
                "bidder": "三一重工股份有限公司",
                "brand": "KSB",
                "priceExcludingTax": 35649,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 40283,
                "isWinning": false
              },
              {
                "bidder": "威乐(中国)水泵系统有限公司",
                "brand": "施耐德",
                "priceExcludingTax": 30414,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 34367,
                "isWinning": false
              },
              {
                "bidder": "西门子（中国）有限公司",
                "brand": "格兰富",
                "priceExcludingTax": 33245,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 37566,
                "isWinning": false
              }
            ],
            "winningBid": {
              "bidder": "上海连成（集团）有限公司",
              "price": 30490,
              "date": "2024-03-15"
            },
            "historicalPrices": [
              {
                "projectName": "西部污水处理厂项目",
                "winningPrice": 29805,
                "changeRate": 2.3,
                "winningBidder": "上海连成（集团）有限公司"
              },
              {
                "projectName": "北部水质净化中心",
                "winningPrice": 28756,
                "changeRate": 6,
                "winningBidder": "西门子（中国）有限公司"
              },
              {
                "projectName": "市政污水厂扩建工程",
                "winningPrice": 28430,
                "changeRate": 7.2,
                "winningBidder": "威乐(中国)水泵系统有限公司"
              }
            ]
          },
          {
            "id": "m23",
            "stageId": "s5",
            "name": "液环真空泵",
            "specification": "Q=165m3/h，最大真空度84%，N=4kW",
            "unit": "台",
            "bids": [
              {
                "bidder": "西门子（中国）有限公司",
                "brand": "施耐德",
                "priceExcludingTax": 60671,
                "taxRate": 13,
                "note": "原厂正品，质保3年",
                "priceIncludingTax": 68558,
                "isWinning": false
              },
              {
                "bidder": "中联重科股份有限公司",
                "brand": "施耐德",
                "priceExcludingTax": 56854,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 64245,
                "isWinning": true
              },
              {
                "bidder": "ABB（中国）有限公司",
                "brand": "威乐",
                "priceExcludingTax": 60294,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 68132,
                "isWinning": false
              },
              {
                "bidder": "威乐(中国)水泵系统有限公司",
                "brand": "威乐",
                "priceExcludingTax": 64972,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 73418,
                "isWinning": false
              }
            ],
            "winningBid": {
              "bidder": "中联重科股份有限公司",
              "price": 64245,
              "date": "2024-03-15"
            },
            "historicalPrices": [
              {
                "projectName": "西部污水处理厂项目",
                "winningPrice": 61174,
                "changeRate": 5,
                "winningBidder": "西门子（中国）有限公司"
              },
              {
                "projectName": "北部水质净化中心",
                "winningPrice": 57612,
                "changeRate": 11.5,
                "winningBidder": "威乐(中国)水泵系统有限公司"
              },
              {
                "projectName": "市政污水厂扩建工程",
                "winningPrice": 59620,
                "changeRate": 7.8,
                "winningBidder": "ABB（中国）有限公司"
              }
            ]
          },
          {
            "id": "m24",
            "stageId": "s5",
            "name": "真空罐",
            "specification": "V=1m3，Φ800×2400mm",
            "unit": "台",
            "bids": [
              {
                "bidder": "威乐(中国)水泵系统有限公司",
                "brand": "ABB",
                "priceExcludingTax": 85918,
                "taxRate": 13,
                "note": "原厂正品，质保3年",
                "priceIncludingTax": 97087,
                "isWinning": true
              },
              {
                "bidder": "上海连成（集团）有限公司",
                "brand": "连成",
                "priceExcludingTax": 80667,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 91153,
                "isWinning": false
              },
              {
                "bidder": "施耐德电气（中国）有限公司",
                "brand": "施耐德",
                "priceExcludingTax": 96356,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 108882,
                "isWinning": false
              },
              {
                "bidder": "赛莱默（中国）有限公司",
                "brand": "凯泉",
                "priceExcludingTax": 103755,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 117243,
                "isWinning": false
              }
            ],
            "winningBid": {
              "bidder": "威乐(中国)水泵系统有限公司",
              "price": 97087,
              "date": "2024-03-15"
            },
            "historicalPrices": [
              {
                "projectName": "西部污水处理厂项目",
                "winningPrice": 91685,
                "changeRate": 5.9,
                "winningBidder": "上海连成（集团）有限公司"
              },
              {
                "projectName": "北部水质净化中心",
                "winningPrice": 88917,
                "changeRate": 9.2,
                "winningBidder": "赛莱默（中国）有限公司"
              },
              {
                "projectName": "市政污水厂扩建工程",
                "winningPrice": 95996,
                "changeRate": 1.1,
                "winningBidder": "施耐德电气（中国）有限公司"
              }
            ]
          },
          {
            "id": "m25",
            "stageId": "s5",
            "name": "气水分离罐",
            "specification": "V=0.12m3，φ500×780mm",
            "unit": "台",
            "bids": [
              {
                "bidder": "凯泉泵业集团有限公司",
                "brand": "威乐",
                "priceExcludingTax": 77844,
                "taxRate": 13,
                "note": "原厂正品，质保3年",
                "priceIncludingTax": 87963,
                "isWinning": false
              },
              {
                "bidder": "威乐(中国)水泵系统有限公司",
                "brand": "格兰富",
                "priceExcludingTax": 68588,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 77504,
                "isWinning": true
              },
              {
                "bidder": "格兰富泵业（上海）有限公司",
                "brand": "格兰富",
                "priceExcludingTax": 70110,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 79224,
                "isWinning": false
              },
              {
                "bidder": "赛莱默（中国）有限公司",
                "brand": "西门子",
                "priceExcludingTax": 78614,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 88833,
                "isWinning": false
              }
            ],
            "winningBid": {
              "bidder": "威乐(中国)水泵系统有限公司",
              "price": 77504,
              "date": "2024-03-15"
            },
            "historicalPrices": [
              {
                "projectName": "西部污水处理厂项目",
                "winningPrice": 67361,
                "changeRate": 15.1,
                "winningBidder": "格兰富泵业（上海）有限公司"
              },
              {
                "projectName": "北部水质净化中心",
                "winningPrice": 81907,
                "changeRate": -5.4,
                "winningBidder": "威乐(中国)水泵系统有限公司"
              },
              {
                "projectName": "市政污水厂扩建工程",
                "winningPrice": 79569,
                "changeRate": -2.6,
                "winningBidder": "赛莱默（中国）有限公司"
              }
            ]
          },
          {
            "id": "m26",
            "stageId": "s5",
            "name": "空压机",
            "specification": "螺杆式空压机，Q=1.0m3/min，P=0.80MPa，N=7.5kW",
            "unit": "台",
            "bids": [
              {
                "bidder": "格兰富泵业（上海）有限公司",
                "brand": "威乐",
                "priceExcludingTax": 96221,
                "taxRate": 13,
                "note": "原厂正品，质保3年",
                "priceIncludingTax": 108729,
                "isWinning": false
              },
              {
                "bidder": "赛莱默（中国）有限公司",
                "brand": "丹麦APV",
                "priceExcludingTax": 93307,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 105436,
                "isWinning": false
              },
              {
                "bidder": "中联重科股份有限公司",
                "brand": "碧水源",
                "priceExcludingTax": 79624,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 89975,
                "isWinning": false
              },
              {
                "bidder": "凯泉泵业集团有限公司",
                "brand": "连成",
                "priceExcludingTax": 71152,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 80401,
                "isWinning": true
              }
            ],
            "winningBid": {
              "bidder": "凯泉泵业集团有限公司",
              "price": 80401,
              "date": "2024-03-15"
            },
            "historicalPrices": [
              {
                "projectName": "西部污水处理厂项目",
                "winningPrice": 71170,
                "changeRate": 13,
                "winningBidder": "凯泉泵业集团有限公司"
              },
              {
                "projectName": "北部水质净化中心",
                "winningPrice": 77719,
                "changeRate": 3.5,
                "winningBidder": "凯泉泵业集团有限公司"
              },
              {
                "projectName": "市政污水厂扩建工程",
                "winningPrice": 91166,
                "changeRate": -11.8,
                "winningBidder": "格兰富泵业（上海）有限公司"
              }
            ]
          },
          {
            "id": "m27",
            "stageId": "s5",
            "name": "冷干机",
            "specification": "Q=1.5m3/min，N=0.55kW",
            "unit": "台",
            "bids": [
              {
                "bidder": "西门子（中国）有限公司",
                "brand": "凯泉",
                "priceExcludingTax": 31631,
                "taxRate": 13,
                "note": "原厂正品，质保3年",
                "priceIncludingTax": 35743,
                "isWinning": false
              },
              {
                "bidder": "东方电气集团",
                "brand": "ABB",
                "priceExcludingTax": 29591,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 33437,
                "isWinning": false
              },
              {
                "bidder": "施耐德电气（中国）有限公司",
                "brand": "碧水源",
                "priceExcludingTax": 23237,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 26257,
                "isWinning": true
              },
              {
                "bidder": "中联重科股份有限公司",
                "brand": "凯泉",
                "priceExcludingTax": 25615,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 28944,
                "isWinning": false
              }
            ],
            "winningBid": {
              "bidder": "施耐德电气（中国）有限公司",
              "price": 26257,
              "date": "2024-03-15"
            },
            "historicalPrices": [
              {
                "projectName": "西部污水处理厂项目",
                "winningPrice": 29337,
                "changeRate": -10.5,
                "winningBidder": "中联重科股份有限公司"
              },
              {
                "projectName": "北部水质净化中心",
                "winningPrice": 26560,
                "changeRate": -1.1,
                "winningBidder": "施耐德电气（中国）有限公司"
              },
              {
                "projectName": "市政污水厂扩建工程",
                "winningPrice": 26900,
                "changeRate": -2.4,
                "winningBidder": "中联重科股份有限公司"
              }
            ]
          },
          {
            "id": "m28",
            "stageId": "s5",
            "name": "储气罐",
            "specification": "V=1m3，工作压力0.8MPa",
            "unit": "台",
            "bids": [
              {
                "bidder": "赛莱默（中国）有限公司",
                "brand": "KSB",
                "priceExcludingTax": 31761,
                "taxRate": 13,
                "note": "原厂正品，质保3年",
                "priceIncludingTax": 35889,
                "isWinning": false
              },
              {
                "bidder": "碧水源科技股份有限公司",
                "brand": "格兰富",
                "priceExcludingTax": 35269,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 39853,
                "isWinning": false
              },
              {
                "bidder": "三一重工股份有限公司",
                "brand": "丹麦APV",
                "priceExcludingTax": 29047,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 32823,
                "isWinning": true
              },
              {
                "bidder": "西门子（中国）有限公司",
                "brand": "格兰富",
                "priceExcludingTax": 35085,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 39646,
                "isWinning": false
              }
            ],
            "winningBid": {
              "bidder": "三一重工股份有限公司",
              "price": 32823,
              "date": "2024-03-15"
            },
            "historicalPrices": [
              {
                "projectName": "西部污水处理厂项目",
                "winningPrice": 35910,
                "changeRate": -8.6,
                "winningBidder": "碧水源科技股份有限公司"
              },
              {
                "projectName": "北部水质净化中心",
                "winningPrice": 34413,
                "changeRate": -4.6,
                "winningBidder": "西门子（中国）有限公司"
              },
              {
                "projectName": "市政污水厂扩建工程",
                "winningPrice": 31415,
                "changeRate": 4.5,
                "winningBidder": "三一重工股份有限公司"
              }
            ]
          },
          {
            "id": "m29",
            "stageId": "s5",
            "name": "剩余污泥泵",
            "specification": "无堵塞卧式离心泵，Q=65m3/h，H=20m，N=11kW",
            "unit": "台",
            "bids": [
              {
                "bidder": "威乐(中国)水泵系统有限公司",
                "brand": "凯泉",
                "priceExcludingTax": 72113,
                "taxRate": 13,
                "note": "原厂正品，质保3年",
                "priceIncludingTax": 81487,
                "isWinning": false
              },
              {
                "bidder": "施耐德电气（中国）有限公司",
                "brand": "施耐德",
                "priceExcludingTax": 68634,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 77556,
                "isWinning": false
              },
              {
                "bidder": "碧水源科技股份有限公司",
                "brand": "威乐",
                "priceExcludingTax": 57033,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 64447,
                "isWinning": true
              },
              {
                "bidder": "东方电气集团",
                "brand": "西门子",
                "priceExcludingTax": 72081,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 81451,
                "isWinning": false
              }
            ],
            "winningBid": {
              "bidder": "碧水源科技股份有限公司",
              "price": 64447,
              "date": "2024-03-15"
            },
            "historicalPrices": [
              {
                "projectName": "西部污水处理厂项目",
                "winningPrice": 61881,
                "changeRate": 4.1,
                "winningBidder": "碧水源科技股份有限公司"
              },
              {
                "projectName": "北部水质净化中心",
                "winningPrice": 57931,
                "changeRate": 11.2,
                "winningBidder": "威乐(中国)水泵系统有限公司"
              },
              {
                "projectName": "市政污水厂扩建工程",
                "winningPrice": 66863,
                "changeRate": -3.6,
                "winningBidder": "东方电气集团"
              }
            ]
          },
          {
            "id": "m30",
            "stageId": "s5",
            "name": "手动对夹式蝶阀",
            "specification": "DN300,1.0MPa,阀板:铸铁",
            "unit": "个",
            "bids": [
              {
                "bidder": "上海连成（集团）有限公司",
                "brand": "KSB",
                "priceExcludingTax": 43894,
                "taxRate": 13,
                "note": "原厂正品，质保3年",
                "priceIncludingTax": 49600,
                "isWinning": false
              },
              {
                "bidder": "碧水源科技股份有限公司",
                "brand": "凯泉",
                "priceExcludingTax": 41705,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 47126,
                "isWinning": false
              },
              {
                "bidder": "ABB（中国）有限公司",
                "brand": "西门子",
                "priceExcludingTax": 39018,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 44090,
                "isWinning": true
              },
              {
                "bidder": "施耐德电气（中国）有限公司",
                "brand": "碧水源",
                "priceExcludingTax": 40899,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 46215,
                "isWinning": false
              }
            ],
            "winningBid": {
              "bidder": "ABB（中国）有限公司",
              "price": 44090,
              "date": "2024-03-15"
            },
            "historicalPrices": [
              {
                "projectName": "西部污水处理厂项目",
                "winningPrice": 38341,
                "changeRate": 15,
                "winningBidder": "碧水源科技股份有限公司"
              },
              {
                "projectName": "北部水质净化中心",
                "winningPrice": 42594,
                "changeRate": 3.5,
                "winningBidder": "施耐德电气（中国）有限公司"
              },
              {
                "projectName": "市政污水厂扩建工程",
                "winningPrice": 50639,
                "changeRate": -12.9,
                "winningBidder": "施耐德电气（中国）有限公司"
              }
            ]
          },
          {
            "id": "m31",
            "stageId": "s5",
            "name": "手动对夹式蝶阀",
            "specification": "DN300,1.0MPa,阀板:铸铁",
            "unit": "个",
            "bids": [
              {
                "bidder": "东方电气集团",
                "brand": "凯泉",
                "priceExcludingTax": 69919,
                "taxRate": 13,
                "note": "原厂正品，质保3年",
                "priceIncludingTax": 79008,
                "isWinning": false
              },
              {
                "bidder": "格兰富泵业（上海）有限公司",
                "brand": "威乐",
                "priceExcludingTax": 65142,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 73610,
                "isWinning": true
              },
              {
                "bidder": "施耐德电气（中国）有限公司",
                "brand": "凯泉",
                "priceExcludingTax": 87152,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 98481,
                "isWinning": false
              },
              {
                "bidder": "碧水源科技股份有限公司",
                "brand": "威乐",
                "priceExcludingTax": 73350,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 82885,
                "isWinning": false
              }
            ],
            "winningBid": {
              "bidder": "格兰富泵业（上海）有限公司",
              "price": 73610,
              "date": "2024-03-15"
            },
            "historicalPrices": [
              {
                "projectName": "西部污水处理厂项目",
                "winningPrice": 69148,
                "changeRate": 6.5,
                "winningBidder": "施耐德电气（中国）有限公司"
              },
              {
                "projectName": "北部水质净化中心",
                "winningPrice": 66417,
                "changeRate": 10.8,
                "winningBidder": "东方电气集团"
              },
              {
                "projectName": "市政污水厂扩建工程",
                "winningPrice": 74773,
                "changeRate": -1.6,
                "winningBidder": "施耐德电气（中国）有限公司"
              }
            ]
          },
          {
            "id": "m32",
            "stageId": "s5",
            "name": "手动对夹式蝶阀",
            "specification": "DN250,1.0MPa,阀体阀板：UPVC",
            "unit": "个",
            "bids": [
              {
                "bidder": "中联重科股份有限公司",
                "brand": "连成",
                "priceExcludingTax": 71405,
                "taxRate": 13,
                "note": "原厂正品，质保3年",
                "priceIncludingTax": 80687,
                "isWinning": false
              },
              {
                "bidder": "赛莱默（中国）有限公司",
                "brand": "格兰富",
                "priceExcludingTax": 66430,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 75065,
                "isWinning": false
              },
              {
                "bidder": "施耐德电气（中国）有限公司",
                "brand": "丹麦APV",
                "priceExcludingTax": 77011,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 87022,
                "isWinning": false
              },
              {
                "bidder": "格兰富泵业（上海）有限公司",
                "brand": "ABB",
                "priceExcludingTax": 63788,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 72080,
                "isWinning": true
              }
            ],
            "winningBid": {
              "bidder": "格兰富泵业（上海）有限公司",
              "price": 72080,
              "date": "2024-03-15"
            },
            "historicalPrices": [
              {
                "projectName": "西部污水处理厂项目",
                "winningPrice": 76613,
                "changeRate": -5.9,
                "winningBidder": "格兰富泵业（上海）有限公司"
              },
              {
                "projectName": "北部水质净化中心",
                "winningPrice": 64443,
                "changeRate": 11.9,
                "winningBidder": "格兰富泵业（上海）有限公司"
              },
              {
                "projectName": "市政污水厂扩建工程",
                "winningPrice": 65460,
                "changeRate": 10.1,
                "winningBidder": "赛莱默（中国）有限公司"
              }
            ]
          },
          {
            "id": "m33",
            "stageId": "s5",
            "name": "手动对夹式蝶阀",
            "specification": "DN250,1.0MPa,阀体阀板：UPVC",
            "unit": "个",
            "bids": [
              {
                "bidder": "上海连成（集团）有限公司",
                "brand": "丹麦APV",
                "priceExcludingTax": 59469,
                "taxRate": 13,
                "note": "原厂正品，质保3年",
                "priceIncludingTax": 67199,
                "isWinning": false
              },
              {
                "bidder": "赛莱默（中国）有限公司",
                "brand": "格兰富",
                "priceExcludingTax": 54561,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 61653,
                "isWinning": false
              },
              {
                "bidder": "中联重科股份有限公司",
                "brand": "施耐德",
                "priceExcludingTax": 54477,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 61559,
                "isWinning": false
              },
              {
                "bidder": "西门子（中国）有限公司",
                "brand": "凯泉",
                "priceExcludingTax": 52783,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 59644,
                "isWinning": true
              }
            ],
            "winningBid": {
              "bidder": "西门子（中国）有限公司",
              "price": 59644,
              "date": "2024-03-15"
            },
            "historicalPrices": [
              {
                "projectName": "西部污水处理厂项目",
                "winningPrice": 64560,
                "changeRate": -7.6,
                "winningBidder": "上海连成（集团）有限公司"
              },
              {
                "projectName": "北部水质净化中心",
                "winningPrice": 65103,
                "changeRate": -8.4,
                "winningBidder": "西门子（中国）有限公司"
              },
              {
                "projectName": "市政污水厂扩建工程",
                "winningPrice": 53393,
                "changeRate": 11.7,
                "winningBidder": "西门子（中国）有限公司"
              }
            ]
          },
          {
            "id": "m34",
            "stageId": "s5",
            "name": "手动对夹式蝶阀",
            "specification": "DN150,1.0MPa,阀板:铸铁",
            "unit": "个",
            "bids": [
              {
                "bidder": "东方电气集团",
                "brand": "ABB",
                "priceExcludingTax": 95321,
                "taxRate": 13,
                "note": "原厂正品，质保3年",
                "priceIncludingTax": 107712,
                "isWinning": false
              },
              {
                "bidder": "格兰富泵业（上海）有限公司",
                "brand": "西门子",
                "priceExcludingTax": 110452,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 124810,
                "isWinning": false
              },
              {
                "bidder": "威乐(中国)水泵系统有限公司",
                "brand": "施耐德",
                "priceExcludingTax": 78366,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 88553,
                "isWinning": false
              },
              {
                "bidder": "赛莱默（中国）有限公司",
                "brand": "格兰富",
                "priceExcludingTax": 84672,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 95679,
                "isWinning": true
              }
            ],
            "winningBid": {
              "bidder": "赛莱默（中国）有限公司",
              "price": 95679,
              "date": "2024-03-15"
            },
            "historicalPrices": [
              {
                "projectName": "西部污水处理厂项目",
                "winningPrice": 98295,
                "changeRate": -2.7,
                "winningBidder": "东方电气集团"
              },
              {
                "projectName": "北部水质净化中心",
                "winningPrice": 93063,
                "changeRate": 2.8,
                "winningBidder": "赛莱默（中国）有限公司"
              },
              {
                "projectName": "市政污水厂扩建工程",
                "winningPrice": 101543,
                "changeRate": -5.8,
                "winningBidder": "格兰富泵业（上海）有限公司"
              }
            ]
          },
          {
            "id": "m35",
            "stageId": "s5",
            "name": "手动对夹式蝶阀",
            "specification": "DN150,1.0MPa,阀板:铸铁",
            "unit": "个",
            "bids": [
              {
                "bidder": "三一重工股份有限公司",
                "brand": "格兰富",
                "priceExcludingTax": 110586,
                "taxRate": 13,
                "note": "原厂正品，质保3年",
                "priceIncludingTax": 124962,
                "isWinning": false
              },
              {
                "bidder": "凯泉泵业集团有限公司",
                "brand": "ABB",
                "priceExcludingTax": 79335,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 89648,
                "isWinning": true
              },
              {
                "bidder": "碧水源科技股份有限公司",
                "brand": "施耐德",
                "priceExcludingTax": 89946,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 101638,
                "isWinning": false
              },
              {
                "bidder": "上海连成（集团）有限公司",
                "brand": "威乐",
                "priceExcludingTax": 92359,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 104365,
                "isWinning": false
              }
            ],
            "winningBid": {
              "bidder": "凯泉泵业集团有限公司",
              "price": 89648,
              "date": "2024-03-15"
            },
            "historicalPrices": [
              {
                "projectName": "西部污水处理厂项目",
                "winningPrice": 83732,
                "changeRate": 7.1,
                "winningBidder": "碧水源科技股份有限公司"
              },
              {
                "projectName": "北部水质净化中心",
                "winningPrice": 80481,
                "changeRate": 11.4,
                "winningBidder": "凯泉泵业集团有限公司"
              },
              {
                "projectName": "市政污水厂扩建工程",
                "winningPrice": 82594,
                "changeRate": 8.5,
                "winningBidder": "上海连成（集团）有限公司"
              }
            ]
          },
          {
            "id": "m36",
            "stageId": "s5",
            "name": "手动对夹式蝶阀",
            "specification": "DN150,1.0MPa,阀板:铸铁（图纸的材质UPVC）",
            "unit": "个",
            "bids": [
              {
                "bidder": "上海连成（集团）有限公司",
                "brand": "施耐德",
                "priceExcludingTax": 65538,
                "taxRate": 13,
                "note": "原厂正品，质保3年",
                "priceIncludingTax": 74057,
                "isWinning": false
              },
              {
                "bidder": "凯泉泵业集团有限公司",
                "brand": "施耐德",
                "priceExcludingTax": 73958,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 83572,
                "isWinning": false
              },
              {
                "bidder": "三一重工股份有限公司",
                "brand": "施耐德",
                "priceExcludingTax": 81986,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 92644,
                "isWinning": false
              },
              {
                "bidder": "威乐(中国)水泵系统有限公司",
                "brand": "威乐",
                "priceExcludingTax": 61496,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 69490,
                "isWinning": true
              }
            ],
            "winningBid": {
              "bidder": "威乐(中国)水泵系统有限公司",
              "price": 69490,
              "date": "2024-03-15"
            },
            "historicalPrices": [
              {
                "projectName": "西部污水处理厂项目",
                "winningPrice": 68882,
                "changeRate": 0.9,
                "winningBidder": "上海连成（集团）有限公司"
              },
              {
                "projectName": "北部水质净化中心",
                "winningPrice": 69889,
                "changeRate": -0.6,
                "winningBidder": "上海连成（集团）有限公司"
              },
              {
                "projectName": "市政污水厂扩建工程",
                "winningPrice": 78231,
                "changeRate": -11.2,
                "winningBidder": "上海连成（集团）有限公司"
              }
            ]
          },
          {
            "id": "m37",
            "stageId": "s5",
            "name": "手动对夹式蝶阀",
            "specification": "DN125,1.0MPa,阀板:SS316",
            "unit": "个",
            "bids": [
              {
                "bidder": "格兰富泵业（上海）有限公司",
                "brand": "威乐",
                "priceExcludingTax": 70864,
                "taxRate": 13,
                "note": "原厂正品，质保3年",
                "priceIncludingTax": 80076,
                "isWinning": false
              },
              {
                "bidder": "东方电气集团",
                "brand": "西门子",
                "priceExcludingTax": 55575,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 62799,
                "isWinning": true
              },
              {
                "bidder": "西门子（中国）有限公司",
                "brand": "凯泉",
                "priceExcludingTax": 56439,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 63776,
                "isWinning": false
              },
              {
                "bidder": "碧水源科技股份有限公司",
                "brand": "ABB",
                "priceExcludingTax": 53823,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 60819,
                "isWinning": false
              }
            ],
            "winningBid": {
              "bidder": "东方电气集团",
              "price": 62799,
              "date": "2024-03-15"
            },
            "historicalPrices": [
              {
                "projectName": "西部污水处理厂项目",
                "winningPrice": 71668,
                "changeRate": -12.4,
                "winningBidder": "东方电气集团"
              },
              {
                "projectName": "北部水质净化中心",
                "winningPrice": 54990,
                "changeRate": 14.2,
                "winningBidder": "碧水源科技股份有限公司"
              },
              {
                "projectName": "市政污水厂扩建工程",
                "winningPrice": 69081,
                "changeRate": -9.1,
                "winningBidder": "碧水源科技股份有限公司"
              }
            ]
          },
          {
            "id": "m38",
            "stageId": "s5",
            "name": "手动对夹式蝶阀",
            "specification": "DN100,1.0MPa,阀板:铸铁，涡轮式",
            "unit": "个",
            "bids": [
              {
                "bidder": "赛莱默（中国）有限公司",
                "brand": "ABB",
                "priceExcludingTax": 53806,
                "taxRate": 13,
                "note": "原厂正品，质保3年",
                "priceIncludingTax": 60800,
                "isWinning": false
              },
              {
                "bidder": "三一重工股份有限公司",
                "brand": "格兰富",
                "priceExcludingTax": 43830,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 49527,
                "isWinning": false
              },
              {
                "bidder": "碧水源科技股份有限公司",
                "brand": "碧水源",
                "priceExcludingTax": 51918,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 58667,
                "isWinning": false
              },
              {
                "bidder": "上海连成（集团）有限公司",
                "brand": "丹麦APV",
                "priceExcludingTax": 45963,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 51938,
                "isWinning": true
              }
            ],
            "winningBid": {
              "bidder": "上海连成（集团）有限公司",
              "price": 51938,
              "date": "2024-03-15"
            },
            "historicalPrices": [
              {
                "projectName": "西部污水处理厂项目",
                "winningPrice": 48599,
                "changeRate": 6.9,
                "winningBidder": "碧水源科技股份有限公司"
              },
              {
                "projectName": "北部水质净化中心",
                "winningPrice": 45095,
                "changeRate": 15.2,
                "winningBidder": "上海连成（集团）有限公司"
              },
              {
                "projectName": "市政污水厂扩建工程",
                "winningPrice": 55458,
                "changeRate": -6.3,
                "winningBidder": "三一重工股份有限公司"
              }
            ]
          },
          {
            "id": "m39",
            "stageId": "s5",
            "name": "手动对夹式蝶阀",
            "specification": "DN50,1.0MPa，阀板:铸铁，涡轮式",
            "unit": "个",
            "bids": [
              {
                "bidder": "凯泉泵业集团有限公司",
                "brand": "KSB",
                "priceExcludingTax": 102516,
                "taxRate": 13,
                "note": "原厂正品，质保3年",
                "priceIncludingTax": 115843,
                "isWinning": false
              },
              {
                "bidder": "ABB（中国）有限公司",
                "brand": "威乐",
                "priceExcludingTax": 78004,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 88144,
                "isWinning": true
              },
              {
                "bidder": "威乐(中国)水泵系统有限公司",
                "brand": "格兰富",
                "priceExcludingTax": 88906,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 100463,
                "isWinning": false
              },
              {
                "bidder": "格兰富泵业（上海）有限公司",
                "brand": "ABB",
                "priceExcludingTax": 101300,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 114468,
                "isWinning": false
              }
            ],
            "winningBid": {
              "bidder": "ABB（中国）有限公司",
              "price": 88144,
              "date": "2024-03-15"
            },
            "historicalPrices": [
              {
                "projectName": "西部污水处理厂项目",
                "winningPrice": 82199,
                "changeRate": 7.2,
                "winningBidder": "ABB（中国）有限公司"
              },
              {
                "projectName": "北部水质净化中心",
                "winningPrice": 78870,
                "changeRate": 11.8,
                "winningBidder": "格兰富泵业（上海）有限公司"
              },
              {
                "projectName": "市政污水厂扩建工程",
                "winningPrice": 94682,
                "changeRate": -6.9,
                "winningBidder": "威乐(中国)水泵系统有限公司"
              }
            ]
          },
          {
            "id": "m40",
            "stageId": "s5",
            "name": "手动对夹式蝶阀",
            "specification": "DN200,1.0MPa,阀体阀板：UPVC",
            "unit": "个",
            "bids": [
              {
                "bidder": "赛莱默（中国）有限公司",
                "brand": "KSB",
                "priceExcludingTax": 86433,
                "taxRate": 13,
                "note": "原厂正品，质保3年",
                "priceIncludingTax": 97669,
                "isWinning": false
              },
              {
                "bidder": "东方电气集团",
                "brand": "KSB",
                "priceExcludingTax": 98513,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 111319,
                "isWinning": false
              },
              {
                "bidder": "西门子（中国）有限公司",
                "brand": "丹麦APV",
                "priceExcludingTax": 105810,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 119565,
                "isWinning": false
              },
              {
                "bidder": "格兰富泵业（上海）有限公司",
                "brand": "ABB",
                "priceExcludingTax": 87805,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 99219,
                "isWinning": true
              }
            ],
            "winningBid": {
              "bidder": "格兰富泵业（上海）有限公司",
              "price": 99219,
              "date": "2024-03-15"
            },
            "historicalPrices": [
              {
                "projectName": "西部污水处理厂项目",
                "winningPrice": 110396,
                "changeRate": -10.1,
                "winningBidder": "格兰富泵业（上海）有限公司"
              },
              {
                "projectName": "北部水质净化中心",
                "winningPrice": 89860,
                "changeRate": 10.4,
                "winningBidder": "东方电气集团"
              },
              {
                "projectName": "市政污水厂扩建工程",
                "winningPrice": 107405,
                "changeRate": -7.6,
                "winningBidder": "格兰富泵业（上海）有限公司"
              }
            ]
          },
          {
            "id": "m41",
            "stageId": "s5",
            "name": "手动对夹式蝶阀",
            "specification": "DN200,1.0MPa,阀体阀板：铸铁",
            "unit": "个",
            "bids": [
              {
                "bidder": "格兰富泵业（上海）有限公司",
                "brand": "格兰富",
                "priceExcludingTax": 37095,
                "taxRate": 13,
                "note": "原厂正品，质保3年",
                "priceIncludingTax": 41917,
                "isWinning": false
              },
              {
                "bidder": "ABB（中国）有限公司",
                "brand": "凯泉",
                "priceExcludingTax": 38301,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 43280,
                "isWinning": true
              },
              {
                "bidder": "东方电气集团",
                "brand": "西门子",
                "priceExcludingTax": 38808,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 43853,
                "isWinning": false
              },
              {
                "bidder": "威乐(中国)水泵系统有限公司",
                "brand": "格兰富",
                "priceExcludingTax": 39762,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 44931,
                "isWinning": false
              }
            ],
            "winningBid": {
              "bidder": "ABB（中国）有限公司",
              "price": 43280,
              "date": "2024-03-15"
            },
            "historicalPrices": [
              {
                "projectName": "西部污水处理厂项目",
                "winningPrice": 41725,
                "changeRate": 3.7,
                "winningBidder": "格兰富泵业（上海）有限公司"
              },
              {
                "projectName": "北部水质净化中心",
                "winningPrice": 48500,
                "changeRate": -10.8,
                "winningBidder": "东方电气集团"
              },
              {
                "projectName": "市政污水厂扩建工程",
                "winningPrice": 43947,
                "changeRate": -1.5,
                "winningBidder": "ABB（中国）有限公司"
              }
            ]
          },
          {
            "id": "m42",
            "stageId": "s5",
            "name": "手动对夹式蝶阀",
            "specification": "DN80,1.0MPa,阀体阀板：铸铁",
            "unit": "个",
            "bids": [
              {
                "bidder": "ABB（中国）有限公司",
                "brand": "格兰富",
                "priceExcludingTax": 36693,
                "taxRate": 13,
                "note": "原厂正品，质保3年",
                "priceIncludingTax": 41463,
                "isWinning": false
              },
              {
                "bidder": "中联重科股份有限公司",
                "brand": "ABB",
                "priceExcludingTax": 40020,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 45222,
                "isWinning": false
              },
              {
                "bidder": "威乐(中国)水泵系统有限公司",
                "brand": "连成",
                "priceExcludingTax": 35352,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 39947,
                "isWinning": true
              },
              {
                "bidder": "格兰富泵业（上海）有限公司",
                "brand": "威乐",
                "priceExcludingTax": 36028,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 40711,
                "isWinning": false
              }
            ],
            "winningBid": {
              "bidder": "威乐(中国)水泵系统有限公司",
              "price": 39947,
              "date": "2024-03-15"
            },
            "historicalPrices": [
              {
                "projectName": "西部污水处理厂项目",
                "winningPrice": 39480,
                "changeRate": 1.2,
                "winningBidder": "中联重科股份有限公司"
              },
              {
                "projectName": "北部水质净化中心",
                "winningPrice": 42417,
                "changeRate": -5.8,
                "winningBidder": "ABB（中国）有限公司"
              },
              {
                "projectName": "市政污水厂扩建工程",
                "winningPrice": 35242,
                "changeRate": 13.4,
                "winningBidder": "中联重科股份有限公司"
              }
            ]
          },
          {
            "id": "m43",
            "stageId": "s5",
            "name": "手动对夹式蝶阀",
            "specification": "DN150,1.0MPa,阀体阀板：铸铁",
            "unit": "个",
            "bids": [
              {
                "bidder": "东方电气集团",
                "brand": "西门子",
                "priceExcludingTax": 95697,
                "taxRate": 13,
                "note": "原厂正品，质保3年",
                "priceIncludingTax": 108137,
                "isWinning": false
              },
              {
                "bidder": "格兰富泵业（上海）有限公司",
                "brand": "威乐",
                "priceExcludingTax": 84004,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 94924,
                "isWinning": true
              },
              {
                "bidder": "三一重工股份有限公司",
                "brand": "碧水源",
                "priceExcludingTax": 110672,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 125059,
                "isWinning": false
              },
              {
                "bidder": "中联重科股份有限公司",
                "brand": "凯泉",
                "priceExcludingTax": 88646,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 100169,
                "isWinning": false
              }
            ],
            "winningBid": {
              "bidder": "格兰富泵业（上海）有限公司",
              "price": 94924,
              "date": "2024-03-15"
            },
            "historicalPrices": [
              {
                "projectName": "西部污水处理厂项目",
                "winningPrice": 92091,
                "changeRate": 3.1,
                "winningBidder": "三一重工股份有限公司"
              },
              {
                "projectName": "北部水质净化中心",
                "winningPrice": 102955,
                "changeRate": -7.8,
                "winningBidder": "东方电气集团"
              },
              {
                "projectName": "市政污水厂扩建工程",
                "winningPrice": 109149,
                "changeRate": -13,
                "winningBidder": "格兰富泵业（上海）有限公司"
              }
            ]
          },
          {
            "id": "m44",
            "stageId": "s5",
            "name": "手动对夹式蝶阀",
            "specification": "DN50,1.0MPa,阀板:铸铁",
            "unit": "个",
            "bids": [
              {
                "bidder": "上海连成（集团）有限公司",
                "brand": "KSB",
                "priceExcludingTax": 45397,
                "taxRate": 13,
                "note": "原厂正品，质保3年",
                "priceIncludingTax": 51298,
                "isWinning": false
              },
              {
                "bidder": "威乐(中国)水泵系统有限公司",
                "brand": "凯泉",
                "priceExcludingTax": 38991,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 44059,
                "isWinning": false
              },
              {
                "bidder": "中联重科股份有限公司",
                "brand": "碧水源",
                "priceExcludingTax": 49981,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 56478,
                "isWinning": false
              },
              {
                "bidder": "ABB（中国）有限公司",
                "brand": "丹麦APV",
                "priceExcludingTax": 38901,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 43958,
                "isWinning": true
              }
            ],
            "winningBid": {
              "bidder": "ABB（中国）有限公司",
              "price": 43958,
              "date": "2024-03-15"
            },
            "historicalPrices": [
              {
                "projectName": "西部污水处理厂项目",
                "winningPrice": 43298,
                "changeRate": 1.5,
                "winningBidder": "威乐(中国)水泵系统有限公司"
              },
              {
                "projectName": "北部水质净化中心",
                "winningPrice": 40712,
                "changeRate": 8,
                "winningBidder": "上海连成（集团）有限公司"
              },
              {
                "projectName": "市政污水厂扩建工程",
                "winningPrice": 44035,
                "changeRate": -0.2,
                "winningBidder": "威乐(中国)水泵系统有限公司"
              }
            ]
          },
          {
            "id": "m45",
            "stageId": "s5",
            "name": "球阀",
            "specification": "DN20,1.0MPa，铸铁",
            "unit": "个",
            "bids": [
              {
                "bidder": "格兰富泵业（上海）有限公司",
                "brand": "西门子",
                "priceExcludingTax": 77735,
                "taxRate": 13,
                "note": "原厂正品，质保3年",
                "priceIncludingTax": 87840,
                "isWinning": false
              },
              {
                "bidder": "威乐(中国)水泵系统有限公司",
                "brand": "丹麦APV",
                "priceExcludingTax": 82387,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 93097,
                "isWinning": true
              },
              {
                "bidder": "东方电气集团",
                "brand": "KSB",
                "priceExcludingTax": 83130,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 93936,
                "isWinning": false
              },
              {
                "bidder": "赛莱默（中国）有限公司",
                "brand": "凯泉",
                "priceExcludingTax": 106559,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 120411,
                "isWinning": false
              }
            ],
            "winningBid": {
              "bidder": "威乐(中国)水泵系统有限公司",
              "price": 93097,
              "date": "2024-03-15"
            },
            "historicalPrices": [
              {
                "projectName": "西部污水处理厂项目",
                "winningPrice": 83775,
                "changeRate": 11.1,
                "winningBidder": "威乐(中国)水泵系统有限公司"
              },
              {
                "projectName": "北部水质净化中心",
                "winningPrice": 93145,
                "changeRate": -0.1,
                "winningBidder": "威乐(中国)水泵系统有限公司"
              },
              {
                "projectName": "市政污水厂扩建工程",
                "winningPrice": 85035,
                "changeRate": 9.5,
                "winningBidder": "威乐(中国)水泵系统有限公司"
              }
            ]
          },
          {
            "id": "m46",
            "stageId": "s5",
            "name": "球阀",
            "specification": "DN50,1.0MPa，PVC-U",
            "unit": "个",
            "bids": [
              {
                "bidder": "东方电气集团",
                "brand": "连成",
                "priceExcludingTax": 60017,
                "taxRate": 13,
                "note": "原厂正品，质保3年",
                "priceIncludingTax": 67819,
                "isWinning": true
              },
              {
                "bidder": "上海连成（集团）有限公司",
                "brand": "ABB",
                "priceExcludingTax": 62738,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 70893,
                "isWinning": false
              },
              {
                "bidder": "施耐德电气（中国）有限公司",
                "brand": "格兰富",
                "priceExcludingTax": 68081,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 76931,
                "isWinning": false
              },
              {
                "bidder": "赛莱默（中国）有限公司",
                "brand": "KSB",
                "priceExcludingTax": 82655,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 93400,
                "isWinning": false
              }
            ],
            "winningBid": {
              "bidder": "东方电气集团",
              "price": 67819,
              "date": "2024-03-15"
            },
            "historicalPrices": [
              {
                "projectName": "西部污水处理厂项目",
                "winningPrice": 75552,
                "changeRate": -10.2,
                "winningBidder": "东方电气集团"
              },
              {
                "projectName": "北部水质净化中心",
                "winningPrice": 77878,
                "changeRate": -12.9,
                "winningBidder": "赛莱默（中国）有限公司"
              },
              {
                "projectName": "市政污水厂扩建工程",
                "winningPrice": 72219,
                "changeRate": -6.1,
                "winningBidder": "东方电气集团"
              }
            ]
          },
          {
            "id": "m47",
            "stageId": "s5",
            "name": "球阀",
            "specification": "DN15,1.0MPa，铜",
            "unit": "个",
            "bids": [
              {
                "bidder": "凯泉泵业集团有限公司",
                "brand": "KSB",
                "priceExcludingTax": 63992,
                "taxRate": 13,
                "note": "原厂正品，质保3年",
                "priceIncludingTax": 72310,
                "isWinning": true
              },
              {
                "bidder": "中联重科股份有限公司",
                "brand": "西门子",
                "priceExcludingTax": 69324,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 78336,
                "isWinning": false
              },
              {
                "bidder": "西门子（中国）有限公司",
                "brand": "碧水源",
                "priceExcludingTax": 72604,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 82042,
                "isWinning": false
              },
              {
                "bidder": "三一重工股份有限公司",
                "brand": "丹麦APV",
                "priceExcludingTax": 89284,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 100890,
                "isWinning": false
              }
            ],
            "winningBid": {
              "bidder": "凯泉泵业集团有限公司",
              "price": 72310,
              "date": "2024-03-15"
            },
            "historicalPrices": [
              {
                "projectName": "西部污水处理厂项目",
                "winningPrice": 62500,
                "changeRate": 15.7,
                "winningBidder": "中联重科股份有限公司"
              },
              {
                "projectName": "北部水质净化中心",
                "winningPrice": 61833,
                "changeRate": 16.9,
                "winningBidder": "西门子（中国）有限公司"
              },
              {
                "projectName": "市政污水厂扩建工程",
                "winningPrice": 72459,
                "changeRate": -0.2,
                "winningBidder": "中联重科股份有限公司"
              }
            ]
          },
          {
            "id": "m48",
            "stageId": "s5",
            "name": "球阀",
            "specification": "DN20,1.0MPa，PVC-U",
            "unit": "个",
            "bids": [
              {
                "bidder": "凯泉泵业集团有限公司",
                "brand": "连成",
                "priceExcludingTax": 29287,
                "taxRate": 13,
                "note": "原厂正品，质保3年",
                "priceIncludingTax": 33094,
                "isWinning": false
              },
              {
                "bidder": "碧水源科技股份有限公司",
                "brand": "连成",
                "priceExcludingTax": 31002,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 35032,
                "isWinning": false
              },
              {
                "bidder": "西门子（中国）有限公司",
                "brand": "碧水源",
                "priceExcludingTax": 39530,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 44668,
                "isWinning": false
              },
              {
                "bidder": "中联重科股份有限公司",
                "brand": "威乐",
                "priceExcludingTax": 30537,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 34506,
                "isWinning": true
              }
            ],
            "winningBid": {
              "bidder": "中联重科股份有限公司",
              "price": 34506,
              "date": "2024-03-15"
            },
            "historicalPrices": [
              {
                "projectName": "西部污水处理厂项目",
                "winningPrice": 32743,
                "changeRate": 5.4,
                "winningBidder": "西门子（中国）有限公司"
              },
              {
                "projectName": "北部水质净化中心",
                "winningPrice": 38824,
                "changeRate": -11.1,
                "winningBidder": "碧水源科技股份有限公司"
              },
              {
                "projectName": "市政污水厂扩建工程",
                "winningPrice": 33201,
                "changeRate": 3.9,
                "winningBidder": "碧水源科技股份有限公司"
              }
            ]
          },
          {
            "id": "m49",
            "stageId": "s5",
            "name": "自动排气阀",
            "specification": "DN15,1.0MPa",
            "unit": "个",
            "bids": [
              {
                "bidder": "赛莱默（中国）有限公司",
                "brand": "碧水源",
                "priceExcludingTax": 99262,
                "taxRate": 13,
                "note": "原厂正品，质保3年",
                "priceIncludingTax": 112166,
                "isWinning": false
              },
              {
                "bidder": "施耐德电气（中国）有限公司",
                "brand": "威乐",
                "priceExcludingTax": 82371,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 93079,
                "isWinning": true
              },
              {
                "bidder": "ABB（中国）有限公司",
                "brand": "凯泉",
                "priceExcludingTax": 90777,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 102578,
                "isWinning": false
              },
              {
                "bidder": "碧水源科技股份有限公司",
                "brand": "威乐",
                "priceExcludingTax": 93972,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 106188,
                "isWinning": false
              }
            ],
            "winningBid": {
              "bidder": "施耐德电气（中国）有限公司",
              "price": 93079,
              "date": "2024-03-15"
            },
            "historicalPrices": [
              {
                "projectName": "西部污水处理厂项目",
                "winningPrice": 86492,
                "changeRate": 7.6,
                "winningBidder": "碧水源科技股份有限公司"
              },
              {
                "projectName": "北部水质净化中心",
                "winningPrice": 79996,
                "changeRate": 16.4,
                "winningBidder": "碧水源科技股份有限公司"
              },
              {
                "projectName": "市政污水厂扩建工程",
                "winningPrice": 96182,
                "changeRate": -3.2,
                "winningBidder": "赛莱默（中国）有限公司"
              }
            ]
          },
          {
            "id": "m50",
            "stageId": "s5",
            "name": "对夹式止回阀",
            "specification": "DN300,1.0MPa,阀板:铸铁，碟片式",
            "unit": "个",
            "bids": [
              {
                "bidder": "格兰富泵业（上海）有限公司",
                "brand": "丹麦APV",
                "priceExcludingTax": 64659,
                "taxRate": 13,
                "note": "原厂正品，质保3年",
                "priceIncludingTax": 73064,
                "isWinning": false
              },
              {
                "bidder": "威乐(中国)水泵系统有限公司",
                "brand": "ABB",
                "priceExcludingTax": 67216,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 75954,
                "isWinning": false
              },
              {
                "bidder": "ABB（中国）有限公司",
                "brand": "丹麦APV",
                "priceExcludingTax": 63619,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 71889,
                "isWinning": false
              },
              {
                "bidder": "西门子（中国）有限公司",
                "brand": "丹麦APV",
                "priceExcludingTax": 61610,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 69619,
                "isWinning": true
              }
            ],
            "winningBid": {
              "bidder": "西门子（中国）有限公司",
              "price": 69619,
              "date": "2024-03-15"
            },
            "historicalPrices": [
              {
                "projectName": "西部污水处理厂项目",
                "winningPrice": 76604,
                "changeRate": -9.1,
                "winningBidder": "西门子（中国）有限公司"
              },
              {
                "projectName": "北部水质净化中心",
                "winningPrice": 59674,
                "changeRate": 16.7,
                "winningBidder": "格兰富泵业（上海）有限公司"
              },
              {
                "projectName": "市政污水厂扩建工程",
                "winningPrice": 68336,
                "changeRate": 1.9,
                "winningBidder": "威乐(中国)水泵系统有限公司"
              }
            ]
          },
          {
            "id": "m51",
            "stageId": "s5",
            "name": "对夹式止回阀",
            "specification": "DN250,1.0MPa,阀板:SS316",
            "unit": "个",
            "bids": [
              {
                "bidder": "东方电气集团",
                "brand": "施耐德",
                "priceExcludingTax": 38624,
                "taxRate": 13,
                "note": "原厂正品，质保3年",
                "priceIncludingTax": 43645,
                "isWinning": false
              },
              {
                "bidder": "赛莱默（中国）有限公司",
                "brand": "威乐",
                "priceExcludingTax": 35419,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 40023,
                "isWinning": true
              },
              {
                "bidder": "ABB（中国）有限公司",
                "brand": "格兰富",
                "priceExcludingTax": 27627,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 31218,
                "isWinning": false
              },
              {
                "bidder": "凯泉泵业集团有限公司",
                "brand": "丹麦APV",
                "priceExcludingTax": 38275,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 43250,
                "isWinning": false
              }
            ],
            "winningBid": {
              "bidder": "赛莱默（中国）有限公司",
              "price": 40023,
              "date": "2024-03-15"
            },
            "historicalPrices": [
              {
                "projectName": "西部污水处理厂项目",
                "winningPrice": 38850,
                "changeRate": 3,
                "winningBidder": "ABB（中国）有限公司"
              },
              {
                "projectName": "北部水质净化中心",
                "winningPrice": 38128,
                "changeRate": 5,
                "winningBidder": "ABB（中国）有限公司"
              },
              {
                "projectName": "市政污水厂扩建工程",
                "winningPrice": 41518,
                "changeRate": -3.6,
                "winningBidder": "ABB（中国）有限公司"
              }
            ]
          },
          {
            "id": "m52",
            "stageId": "s5",
            "name": "对夹式止回阀",
            "specification": "DN150,1.0MPa,阀板:铸铁",
            "unit": "个",
            "bids": [
              {
                "bidder": "威乐(中国)水泵系统有限公司",
                "brand": "ABB",
                "priceExcludingTax": 59039,
                "taxRate": 13,
                "note": "原厂正品，质保3年",
                "priceIncludingTax": 66714,
                "isWinning": false
              },
              {
                "bidder": "碧水源科技股份有限公司",
                "brand": "威乐",
                "priceExcludingTax": 58332,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 65915,
                "isWinning": true
              },
              {
                "bidder": "中联重科股份有限公司",
                "brand": "凯泉",
                "priceExcludingTax": 64294,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 72652,
                "isWinning": false
              },
              {
                "bidder": "格兰富泵业（上海）有限公司",
                "brand": "ABB",
                "priceExcludingTax": 70061,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 79168,
                "isWinning": false
              }
            ],
            "winningBid": {
              "bidder": "碧水源科技股份有限公司",
              "price": 65915,
              "date": "2024-03-15"
            },
            "historicalPrices": [
              {
                "projectName": "西部污水处理厂项目",
                "winningPrice": 70177,
                "changeRate": -6.1,
                "winningBidder": "格兰富泵业（上海）有限公司"
              },
              {
                "projectName": "北部水质净化中心",
                "winningPrice": 63555,
                "changeRate": 3.7,
                "winningBidder": "格兰富泵业（上海）有限公司"
              },
              {
                "projectName": "市政污水厂扩建工程",
                "winningPrice": 56988,
                "changeRate": 15.7,
                "winningBidder": "中联重科股份有限公司"
              }
            ]
          },
          {
            "id": "m53",
            "stageId": "s5",
            "name": "对夹式止回阀",
            "specification": "DN80,1.0MPa,阀板:铸铁",
            "unit": "个",
            "bids": [
              {
                "bidder": "碧水源科技股份有限公司",
                "brand": "施耐德",
                "priceExcludingTax": 68463,
                "taxRate": 13,
                "note": "原厂正品，质保3年",
                "priceIncludingTax": 77363,
                "isWinning": false
              },
              {
                "bidder": "ABB（中国）有限公司",
                "brand": "丹麦APV",
                "priceExcludingTax": 68342,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 77226,
                "isWinning": false
              },
              {
                "bidder": "赛莱默（中国）有限公司",
                "brand": "施耐德",
                "priceExcludingTax": 57780,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 65291,
                "isWinning": true
              },
              {
                "bidder": "格兰富泵业（上海）有限公司",
                "brand": "连成",
                "priceExcludingTax": 53098,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 60000,
                "isWinning": false
              }
            ],
            "winningBid": {
              "bidder": "赛莱默（中国）有限公司",
              "price": 65291,
              "date": "2024-03-15"
            },
            "historicalPrices": [
              {
                "projectName": "西部污水处理厂项目",
                "winningPrice": 59535,
                "changeRate": 9.7,
                "winningBidder": "ABB（中国）有限公司"
              },
              {
                "projectName": "北部水质净化中心",
                "winningPrice": 58118,
                "changeRate": 12.3,
                "winningBidder": "赛莱默（中国）有限公司"
              },
              {
                "projectName": "市政污水厂扩建工程",
                "winningPrice": 58908,
                "changeRate": 10.8,
                "winningBidder": "ABB（中国）有限公司"
              }
            ]
          },
          {
            "id": "m54",
            "stageId": "s5",
            "name": "对夹式止回阀",
            "specification": "DN50,1.0MPa,阀板:铸铁",
            "unit": "个",
            "bids": [
              {
                "bidder": "凯泉泵业集团有限公司",
                "brand": "连成",
                "priceExcludingTax": 100586,
                "taxRate": 13,
                "note": "原厂正品，质保3年",
                "priceIncludingTax": 113662,
                "isWinning": false
              },
              {
                "bidder": "施耐德电气（中国）有限公司",
                "brand": "连成",
                "priceExcludingTax": 91295,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 103163,
                "isWinning": false
              },
              {
                "bidder": "ABB（中国）有限公司",
                "brand": "西门子",
                "priceExcludingTax": 91343,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 103217,
                "isWinning": false
              },
              {
                "bidder": "格兰富泵业（上海）有限公司",
                "brand": "凯泉",
                "priceExcludingTax": 81769,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 92398,
                "isWinning": true
              }
            ],
            "winningBid": {
              "bidder": "格兰富泵业（上海）有限公司",
              "price": 92398,
              "date": "2024-03-15"
            },
            "historicalPrices": [
              {
                "projectName": "西部污水处理厂项目",
                "winningPrice": 100521,
                "changeRate": -8.1,
                "winningBidder": "ABB（中国）有限公司"
              },
              {
                "projectName": "北部水质净化中心",
                "winningPrice": 106134,
                "changeRate": -12.9,
                "winningBidder": "格兰富泵业（上海）有限公司"
              },
              {
                "projectName": "市政污水厂扩建工程",
                "winningPrice": 88390,
                "changeRate": 4.5,
                "winningBidder": "格兰富泵业（上海）有限公司"
              }
            ]
          },
          {
            "id": "m55",
            "stageId": "s5",
            "name": "单球体橡胶接头",
            "specification": "DN350",
            "unit": "个",
            "bids": [
              {
                "bidder": "三一重工股份有限公司",
                "brand": "威乐",
                "priceExcludingTax": 89114,
                "taxRate": 13,
                "note": "原厂正品，质保3年",
                "priceIncludingTax": 100698,
                "isWinning": false
              },
              {
                "bidder": "凯泉泵业集团有限公司",
                "brand": "格兰富",
                "priceExcludingTax": 99727,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 112691,
                "isWinning": false
              },
              {
                "bidder": "碧水源科技股份有限公司",
                "brand": "连成",
                "priceExcludingTax": 103412,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 116855,
                "isWinning": false
              },
              {
                "bidder": "施耐德电气（中国）有限公司",
                "brand": "碧水源",
                "priceExcludingTax": 82569,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 93302,
                "isWinning": true
              }
            ],
            "winningBid": {
              "bidder": "施耐德电气（中国）有限公司",
              "price": 93302,
              "date": "2024-03-15"
            },
            "historicalPrices": [
              {
                "projectName": "西部污水处理厂项目",
                "winningPrice": 102023,
                "changeRate": -8.5,
                "winningBidder": "碧水源科技股份有限公司"
              },
              {
                "projectName": "北部水质净化中心",
                "winningPrice": 102624,
                "changeRate": -9.1,
                "winningBidder": "凯泉泵业集团有限公司"
              },
              {
                "projectName": "市政污水厂扩建工程",
                "winningPrice": 93871,
                "changeRate": -0.6,
                "winningBidder": "施耐德电气（中国）有限公司"
              }
            ]
          },
          {
            "id": "m56",
            "stageId": "s5",
            "name": "单球体橡胶接头",
            "specification": "DN300",
            "unit": "个",
            "bids": [
              {
                "bidder": "凯泉泵业集团有限公司",
                "brand": "威乐",
                "priceExcludingTax": 44333,
                "taxRate": 13,
                "note": "原厂正品，质保3年",
                "priceIncludingTax": 50096,
                "isWinning": false
              },
              {
                "bidder": "中联重科股份有限公司",
                "brand": "丹麦APV",
                "priceExcludingTax": 49803,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 56277,
                "isWinning": false
              },
              {
                "bidder": "ABB（中国）有限公司",
                "brand": "碧水源",
                "priceExcludingTax": 42769,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 48328,
                "isWinning": false
              },
              {
                "bidder": "威乐(中国)水泵系统有限公司",
                "brand": "KSB",
                "priceExcludingTax": 35504,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 40119,
                "isWinning": true
              }
            ],
            "winningBid": {
              "bidder": "威乐(中国)水泵系统有限公司",
              "price": 40119,
              "date": "2024-03-15"
            },
            "historicalPrices": [
              {
                "projectName": "西部污水处理厂项目",
                "winningPrice": 37811,
                "changeRate": 6.1,
                "winningBidder": "凯泉泵业集团有限公司"
              },
              {
                "projectName": "北部水质净化中心",
                "winningPrice": 41961,
                "changeRate": -4.4,
                "winningBidder": "威乐(中国)水泵系统有限公司"
              },
              {
                "projectName": "市政污水厂扩建工程",
                "winningPrice": 42915,
                "changeRate": -6.5,
                "winningBidder": "中联重科股份有限公司"
              }
            ]
          },
          {
            "id": "m57",
            "stageId": "s5",
            "name": "单球体橡胶接头",
            "specification": "DN300",
            "unit": "个",
            "bids": [
              {
                "bidder": "ABB（中国）有限公司",
                "brand": "施耐德",
                "priceExcludingTax": 82220,
                "taxRate": 13,
                "note": "原厂正品，质保3年",
                "priceIncludingTax": 92908,
                "isWinning": false
              },
              {
                "bidder": "碧水源科技股份有限公司",
                "brand": "凯泉",
                "priceExcludingTax": 73909,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 83517,
                "isWinning": true
              },
              {
                "bidder": "三一重工股份有限公司",
                "brand": "ABB",
                "priceExcludingTax": 73477,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 83029,
                "isWinning": false
              },
              {
                "bidder": "施耐德电气（中国）有限公司",
                "brand": "连成",
                "priceExcludingTax": 95568,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 107991,
                "isWinning": false
              }
            ],
            "winningBid": {
              "bidder": "碧水源科技股份有限公司",
              "price": 83517,
              "date": "2024-03-15"
            },
            "historicalPrices": [
              {
                "projectName": "西部污水处理厂项目",
                "winningPrice": 90607,
                "changeRate": -7.8,
                "winningBidder": "施耐德电气（中国）有限公司"
              },
              {
                "projectName": "北部水质净化中心",
                "winningPrice": 82424,
                "changeRate": 1.3,
                "winningBidder": "碧水源科技股份有限公司"
              },
              {
                "projectName": "市政污水厂扩建工程",
                "winningPrice": 87752,
                "changeRate": -4.8,
                "winningBidder": "碧水源科技股份有限公司"
              }
            ]
          },
          {
            "id": "m58",
            "stageId": "s5",
            "name": "单球体橡胶接头",
            "specification": "DN250",
            "unit": "个",
            "bids": [
              {
                "bidder": "碧水源科技股份有限公司",
                "brand": "丹麦APV",
                "priceExcludingTax": 71260,
                "taxRate": 13,
                "note": "原厂正品，质保3年",
                "priceIncludingTax": 80523,
                "isWinning": true
              },
              {
                "bidder": "格兰富泵业（上海）有限公司",
                "brand": "施耐德",
                "priceExcludingTax": 91264,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 103128,
                "isWinning": false
              },
              {
                "bidder": "施耐德电气（中国）有限公司",
                "brand": "连成",
                "priceExcludingTax": 95671,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 108108,
                "isWinning": false
              },
              {
                "bidder": "ABB（中国）有限公司",
                "brand": "丹麦APV",
                "priceExcludingTax": 83858,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 94759,
                "isWinning": false
              }
            ],
            "winningBid": {
              "bidder": "碧水源科技股份有限公司",
              "price": 80523,
              "date": "2024-03-15"
            },
            "historicalPrices": [
              {
                "projectName": "西部污水处理厂项目",
                "winningPrice": 69447,
                "changeRate": 15.9,
                "winningBidder": "格兰富泵业（上海）有限公司"
              },
              {
                "projectName": "北部水质净化中心",
                "winningPrice": 87298,
                "changeRate": -7.8,
                "winningBidder": "碧水源科技股份有限公司"
              },
              {
                "projectName": "市政污水厂扩建工程",
                "winningPrice": 74799,
                "changeRate": 7.7,
                "winningBidder": "施耐德电气（中国）有限公司"
              }
            ]
          },
          {
            "id": "m59",
            "stageId": "s5",
            "name": "单球体橡胶接头",
            "specification": "DN150",
            "unit": "个",
            "bids": [
              {
                "bidder": "上海连成（集团）有限公司",
                "brand": "碧水源",
                "priceExcludingTax": 69657,
                "taxRate": 13,
                "note": "原厂正品，质保3年",
                "priceIncludingTax": 78712,
                "isWinning": false
              },
              {
                "bidder": "碧水源科技股份有限公司",
                "brand": "KSB",
                "priceExcludingTax": 73283,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 82809,
                "isWinning": false
              },
              {
                "bidder": "西门子（中国）有限公司",
                "brand": "连成",
                "priceExcludingTax": 66358,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 74984,
                "isWinning": false
              },
              {
                "bidder": "威乐(中国)水泵系统有限公司",
                "brand": "连成",
                "priceExcludingTax": 64193,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 72538,
                "isWinning": true
              }
            ],
            "winningBid": {
              "bidder": "威乐(中国)水泵系统有限公司",
              "price": 72538,
              "date": "2024-03-15"
            },
            "historicalPrices": [
              {
                "projectName": "西部污水处理厂项目",
                "winningPrice": 78818,
                "changeRate": -8,
                "winningBidder": "碧水源科技股份有限公司"
              },
              {
                "projectName": "北部水质净化中心",
                "winningPrice": 79352,
                "changeRate": -8.6,
                "winningBidder": "威乐(中国)水泵系统有限公司"
              },
              {
                "projectName": "市政污水厂扩建工程",
                "winningPrice": 68883,
                "changeRate": 5.3,
                "winningBidder": "碧水源科技股份有限公司"
              }
            ]
          },
          {
            "id": "m60",
            "stageId": "s5",
            "name": "单球体橡胶接头",
            "specification": "DN150",
            "unit": "个",
            "bids": [
              {
                "bidder": "威乐(中国)水泵系统有限公司",
                "brand": "威乐",
                "priceExcludingTax": 57815,
                "taxRate": 13,
                "note": "原厂正品，质保3年",
                "priceIncludingTax": 65330,
                "isWinning": false
              },
              {
                "bidder": "中联重科股份有限公司",
                "brand": "碧水源",
                "priceExcludingTax": 43556,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 49218,
                "isWinning": true
              },
              {
                "bidder": "凯泉泵业集团有限公司",
                "brand": "ABB",
                "priceExcludingTax": 46433,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 52469,
                "isWinning": false
              },
              {
                "bidder": "ABB（中国）有限公司",
                "brand": "西门子",
                "priceExcludingTax": 45682,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 51620,
                "isWinning": false
              }
            ],
            "winningBid": {
              "bidder": "中联重科股份有限公司",
              "price": 49218,
              "date": "2024-03-15"
            },
            "historicalPrices": [
              {
                "projectName": "西部污水处理厂项目",
                "winningPrice": 51705,
                "changeRate": -4.8,
                "winningBidder": "威乐(中国)水泵系统有限公司"
              },
              {
                "projectName": "北部水质净化中心",
                "winningPrice": 45575,
                "changeRate": 8,
                "winningBidder": "威乐(中国)水泵系统有限公司"
              },
              {
                "projectName": "市政污水厂扩建工程",
                "winningPrice": 54471,
                "changeRate": -9.6,
                "winningBidder": "中联重科股份有限公司"
              }
            ]
          },
          {
            "id": "m61",
            "stageId": "s5",
            "name": "单球体橡胶接头",
            "specification": "DN80",
            "unit": "个",
            "bids": [
              {
                "bidder": "格兰富泵业（上海）有限公司",
                "brand": "KSB",
                "priceExcludingTax": 81430,
                "taxRate": 13,
                "note": "原厂正品，质保3年",
                "priceIncludingTax": 92015,
                "isWinning": false
              },
              {
                "bidder": "东方电气集团",
                "brand": "ABB",
                "priceExcludingTax": 114372,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 129240,
                "isWinning": false
              },
              {
                "bidder": "三一重工股份有限公司",
                "brand": "ABB",
                "priceExcludingTax": 102163,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 115444,
                "isWinning": true
              },
              {
                "bidder": "威乐(中国)水泵系统有限公司",
                "brand": "格兰富",
                "priceExcludingTax": 105512,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 119228,
                "isWinning": false
              }
            ],
            "winningBid": {
              "bidder": "三一重工股份有限公司",
              "price": 115444,
              "date": "2024-03-15"
            },
            "historicalPrices": [
              {
                "projectName": "西部污水处理厂项目",
                "winningPrice": 99165,
                "changeRate": 16.4,
                "winningBidder": "格兰富泵业（上海）有限公司"
              },
              {
                "projectName": "北部水质净化中心",
                "winningPrice": 111787,
                "changeRate": 3.3,
                "winningBidder": "格兰富泵业（上海）有限公司"
              },
              {
                "projectName": "市政污水厂扩建工程",
                "winningPrice": 112009,
                "changeRate": 3.1,
                "winningBidder": "三一重工股份有限公司"
              }
            ]
          },
          {
            "id": "m62",
            "stageId": "s5",
            "name": "单球体橡胶接头",
            "specification": "DN50",
            "unit": "个",
            "bids": [
              {
                "bidder": "上海连成（集团）有限公司",
                "brand": "连成",
                "priceExcludingTax": 39775,
                "taxRate": 13,
                "note": "原厂正品，质保3年",
                "priceIncludingTax": 44945,
                "isWinning": false
              },
              {
                "bidder": "西门子（中国）有限公司",
                "brand": "连成",
                "priceExcludingTax": 31513,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 35609,
                "isWinning": false
              },
              {
                "bidder": "东方电气集团",
                "brand": "KSB",
                "priceExcludingTax": 35974,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 40650,
                "isWinning": false
              },
              {
                "bidder": "碧水源科技股份有限公司",
                "brand": "碧水源",
                "priceExcludingTax": 30234,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 34164,
                "isWinning": true
              }
            ],
            "winningBid": {
              "bidder": "碧水源科技股份有限公司",
              "price": 34164,
              "date": "2024-03-15"
            },
            "historicalPrices": [
              {
                "projectName": "西部污水处理厂项目",
                "winningPrice": 36898,
                "changeRate": -7.4,
                "winningBidder": "上海连成（集团）有限公司"
              },
              {
                "projectName": "北部水质净化中心",
                "winningPrice": 29746,
                "changeRate": 14.9,
                "winningBidder": "西门子（中国）有限公司"
              },
              {
                "projectName": "市政污水厂扩建工程",
                "winningPrice": 34141,
                "changeRate": 0.1,
                "winningBidder": "碧水源科技股份有限公司"
              }
            ]
          },
          {
            "id": "m63",
            "stageId": "s5",
            "name": "管道混合器",
            "specification": "DN250,PVC-U",
            "unit": "个",
            "bids": [
              {
                "bidder": "ABB（中国）有限公司",
                "brand": "碧水源",
                "priceExcludingTax": 60480,
                "taxRate": 13,
                "note": "原厂正品，质保3年",
                "priceIncludingTax": 68342,
                "isWinning": false
              },
              {
                "bidder": "威乐(中国)水泵系统有限公司",
                "brand": "施耐德",
                "priceExcludingTax": 55268,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 62452,
                "isWinning": true
              },
              {
                "bidder": "格兰富泵业（上海）有限公司",
                "brand": "格兰富",
                "priceExcludingTax": 73106,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 82609,
                "isWinning": false
              },
              {
                "bidder": "凯泉泵业集团有限公司",
                "brand": "丹麦APV",
                "priceExcludingTax": 69853,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 78933,
                "isWinning": false
              }
            ],
            "winningBid": {
              "bidder": "威乐(中国)水泵系统有限公司",
              "price": 62452,
              "date": "2024-03-15"
            },
            "historicalPrices": [
              {
                "projectName": "西部污水处理厂项目",
                "winningPrice": 70013,
                "changeRate": -10.8,
                "winningBidder": "凯泉泵业集团有限公司"
              },
              {
                "projectName": "北部水质净化中心",
                "winningPrice": 56407,
                "changeRate": 10.7,
                "winningBidder": "格兰富泵业（上海）有限公司"
              },
              {
                "projectName": "市政污水厂扩建工程",
                "winningPrice": 61481,
                "changeRate": 1.6,
                "winningBidder": "威乐(中国)水泵系统有限公司"
              }
            ]
          },
          {
            "id": "m64",
            "stageId": "s5",
            "name": "Y型过滤器",
            "specification": "DN250,30目,1.0MPa，PVC-U",
            "unit": "个",
            "bids": [
              {
                "bidder": "中联重科股份有限公司",
                "brand": "丹麦APV",
                "priceExcludingTax": 27726,
                "taxRate": 13,
                "note": "原厂正品，质保3年",
                "priceIncludingTax": 31330,
                "isWinning": false
              },
              {
                "bidder": "三一重工股份有限公司",
                "brand": "KSB",
                "priceExcludingTax": 30155,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 34075,
                "isWinning": false
              },
              {
                "bidder": "西门子（中国）有限公司",
                "brand": "ABB",
                "priceExcludingTax": 26438,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 29874,
                "isWinning": true
              },
              {
                "bidder": "东方电气集团",
                "brand": "格兰富",
                "priceExcludingTax": 33403,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 37745,
                "isWinning": false
              }
            ],
            "winningBid": {
              "bidder": "西门子（中国）有限公司",
              "price": 29874,
              "date": "2024-03-15"
            },
            "historicalPrices": [
              {
                "projectName": "西部污水处理厂项目",
                "winningPrice": 27355,
                "changeRate": 9.2,
                "winningBidder": "东方电气集团"
              },
              {
                "projectName": "北部水质净化中心",
                "winningPrice": 31365,
                "changeRate": -4.8,
                "winningBidder": "三一重工股份有限公司"
              },
              {
                "projectName": "市政污水厂扩建工程",
                "winningPrice": 34353,
                "changeRate": -13,
                "winningBidder": "中联重科股份有限公司"
              }
            ]
          },
          {
            "id": "m65",
            "stageId": "s5",
            "name": "Y型过滤器",
            "specification": "DN80,30目,1.0MPa，Q235",
            "unit": "个",
            "bids": [
              {
                "bidder": "施耐德电气（中国）有限公司",
                "brand": "丹麦APV",
                "priceExcludingTax": 55284,
                "taxRate": 13,
                "note": "原厂正品，质保3年",
                "priceIncludingTax": 62470,
                "isWinning": true
              },
              {
                "bidder": "西门子（中国）有限公司",
                "brand": "威乐",
                "priceExcludingTax": 53163,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 60074,
                "isWinning": false
              },
              {
                "bidder": "ABB（中国）有限公司",
                "brand": "丹麦APV",
                "priceExcludingTax": 73889,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 83494,
                "isWinning": false
              },
              {
                "bidder": "格兰富泵业（上海）有限公司",
                "brand": "ABB",
                "priceExcludingTax": 68545,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 77455,
                "isWinning": false
              }
            ],
            "winningBid": {
              "bidder": "施耐德电气（中国）有限公司",
              "price": 62470,
              "date": "2024-03-15"
            },
            "historicalPrices": [
              {
                "projectName": "西部污水处理厂项目",
                "winningPrice": 57627,
                "changeRate": 8.4,
                "winningBidder": "西门子（中国）有限公司"
              },
              {
                "projectName": "北部水质净化中心",
                "winningPrice": 54126,
                "changeRate": 15.4,
                "winningBidder": "ABB（中国）有限公司"
              },
              {
                "projectName": "市政污水厂扩建工程",
                "winningPrice": 71493,
                "changeRate": -12.6,
                "winningBidder": "施耐德电气（中国）有限公司"
              }
            ]
          },
          {
            "id": "m66",
            "stageId": "s5",
            "name": "Y型过滤器",
            "specification": "DN20,30目,1.0MPa，PVC-U",
            "unit": "个",
            "bids": [
              {
                "bidder": "格兰富泵业（上海）有限公司",
                "brand": "碧水源",
                "priceExcludingTax": 90112,
                "taxRate": 13,
                "note": "原厂正品，质保3年",
                "priceIncludingTax": 101826,
                "isWinning": true
              },
              {
                "bidder": "威乐(中国)水泵系统有限公司",
                "brand": "威乐",
                "priceExcludingTax": 117423,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 132687,
                "isWinning": false
              },
              {
                "bidder": "凯泉泵业集团有限公司",
                "brand": "格兰富",
                "priceExcludingTax": 94055,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 106282,
                "isWinning": false
              },
              {
                "bidder": "上海连成（集团）有限公司",
                "brand": "西门子",
                "priceExcludingTax": 115668,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 130704,
                "isWinning": false
              }
            ],
            "winningBid": {
              "bidder": "格兰富泵业（上海）有限公司",
              "price": 101826,
              "date": "2024-03-15"
            },
            "historicalPrices": [
              {
                "projectName": "西部污水处理厂项目",
                "winningPrice": 110197,
                "changeRate": -7.6,
                "winningBidder": "格兰富泵业（上海）有限公司"
              },
              {
                "projectName": "北部水质净化中心",
                "winningPrice": 110146,
                "changeRate": -7.6,
                "winningBidder": "凯泉泵业集团有限公司"
              },
              {
                "projectName": "市政污水厂扩建工程",
                "winningPrice": 102806,
                "changeRate": -1,
                "winningBidder": "上海连成（集团）有限公司"
              }
            ]
          },
          {
            "id": "m67",
            "stageId": "s5",
            "name": "单法兰管道限位伸缩接头",
            "specification": "DN700",
            "unit": "个",
            "bids": [
              {
                "bidder": "碧水源科技股份有限公司",
                "brand": "ABB",
                "priceExcludingTax": 17381,
                "taxRate": 13,
                "note": "原厂正品，质保3年",
                "priceIncludingTax": 19640,
                "isWinning": false
              },
              {
                "bidder": "格兰富泵业（上海）有限公司",
                "brand": "凯泉",
                "priceExcludingTax": 17619,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 19909,
                "isWinning": false
              },
              {
                "bidder": "威乐(中国)水泵系统有限公司",
                "brand": "丹麦APV",
                "priceExcludingTax": 18882,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 21336,
                "isWinning": false
              },
              {
                "bidder": "凯泉泵业集团有限公司",
                "brand": "格兰富",
                "priceExcludingTax": 16617,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 18777,
                "isWinning": true
              }
            ],
            "winningBid": {
              "bidder": "凯泉泵业集团有限公司",
              "price": 18777,
              "date": "2024-03-15"
            },
            "historicalPrices": [
              {
                "projectName": "西部污水处理厂项目",
                "winningPrice": 19588,
                "changeRate": -4.1,
                "winningBidder": "碧水源科技股份有限公司"
              },
              {
                "projectName": "北部水质净化中心",
                "winningPrice": 18747,
                "changeRate": 0.2,
                "winningBidder": "凯泉泵业集团有限公司"
              },
              {
                "projectName": "市政污水厂扩建工程",
                "winningPrice": 21424,
                "changeRate": -12.4,
                "winningBidder": "凯泉泵业集团有限公司"
              }
            ]
          },
          {
            "id": "m68",
            "stageId": "s5",
            "name": "快速接头",
            "specification": "DN100，SS304，含一个法兰",
            "unit": "个",
            "bids": [
              {
                "bidder": "中联重科股份有限公司",
                "brand": "凯泉",
                "priceExcludingTax": 92244,
                "taxRate": 13,
                "note": "原厂正品，质保3年",
                "priceIncludingTax": 104235,
                "isWinning": true
              },
              {
                "bidder": "威乐(中国)水泵系统有限公司",
                "brand": "ABB",
                "priceExcludingTax": 88352,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 99837,
                "isWinning": false
              },
              {
                "bidder": "施耐德电气（中国）有限公司",
                "brand": "丹麦APV",
                "priceExcludingTax": 101342,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 114516,
                "isWinning": false
              },
              {
                "bidder": "西门子（中国）有限公司",
                "brand": "ABB",
                "priceExcludingTax": 107890,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 121915,
                "isWinning": false
              }
            ],
            "winningBid": {
              "bidder": "中联重科股份有限公司",
              "price": 104235,
              "date": "2024-03-15"
            },
            "historicalPrices": [
              {
                "projectName": "西部污水处理厂项目",
                "winningPrice": 101646,
                "changeRate": 2.5,
                "winningBidder": "施耐德电气（中国）有限公司"
              },
              {
                "projectName": "北部水质净化中心",
                "winningPrice": 109052,
                "changeRate": -4.4,
                "winningBidder": "西门子（中国）有限公司"
              },
              {
                "projectName": "市政污水厂扩建工程",
                "winningPrice": 107832,
                "changeRate": -3.3,
                "winningBidder": "施耐德电气（中国）有限公司"
              }
            ]
          },
          {
            "id": "m69",
            "stageId": "s5",
            "name": "快速接头",
            "specification": "DN125，SS316，含一个法兰",
            "unit": "个",
            "bids": [
              {
                "bidder": "碧水源科技股份有限公司",
                "brand": "连成",
                "priceExcludingTax": 75423,
                "taxRate": 13,
                "note": "原厂正品，质保3年",
                "priceIncludingTax": 85227,
                "isWinning": true
              },
              {
                "bidder": "格兰富泵业（上海）有限公司",
                "brand": "威乐",
                "priceExcludingTax": 89596,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 101243,
                "isWinning": false
              },
              {
                "bidder": "三一重工股份有限公司",
                "brand": "格兰富",
                "priceExcludingTax": 82062,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 92730,
                "isWinning": false
              },
              {
                "bidder": "威乐(中国)水泵系统有限公司",
                "brand": "施耐德",
                "priceExcludingTax": 82272,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 92967,
                "isWinning": false
              }
            ],
            "winningBid": {
              "bidder": "碧水源科技股份有限公司",
              "price": 85227,
              "date": "2024-03-15"
            },
            "historicalPrices": [
              {
                "projectName": "西部污水处理厂项目",
                "winningPrice": 82604,
                "changeRate": 3.2,
                "winningBidder": "三一重工股份有限公司"
              },
              {
                "projectName": "北部水质净化中心",
                "winningPrice": 87663,
                "changeRate": -2.8,
                "winningBidder": "威乐(中国)水泵系统有限公司"
              },
              {
                "projectName": "市政污水厂扩建工程",
                "winningPrice": 83585,
                "changeRate": 2,
                "winningBidder": "威乐(中国)水泵系统有限公司"
              }
            ]
          },
          {
            "id": "m70",
            "stageId": "s5",
            "name": "气动三偏心蝶阀",
            "specification": "DN80",
            "unit": "个",
            "bids": [
              {
                "bidder": "赛莱默（中国）有限公司",
                "brand": "碧水源",
                "priceExcludingTax": 63380,
                "taxRate": 13,
                "note": "原厂正品，质保3年",
                "priceIncludingTax": 71619,
                "isWinning": false
              },
              {
                "bidder": "西门子（中国）有限公司",
                "brand": "格兰富",
                "priceExcludingTax": 58631,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 66253,
                "isWinning": true
              },
              {
                "bidder": "格兰富泵业（上海）有限公司",
                "brand": "KSB",
                "priceExcludingTax": 61131,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 69078,
                "isWinning": false
              },
              {
                "bidder": "东方电气集团",
                "brand": "凯泉",
                "priceExcludingTax": 61445,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 69432,
                "isWinning": false
              }
            ],
            "winningBid": {
              "bidder": "西门子（中国）有限公司",
              "price": 66253,
              "date": "2024-03-15"
            },
            "historicalPrices": [
              {
                "projectName": "西部污水处理厂项目",
                "winningPrice": 70884,
                "changeRate": -6.5,
                "winningBidder": "赛莱默（中国）有限公司"
              },
              {
                "projectName": "北部水质净化中心",
                "winningPrice": 73876,
                "changeRate": -10.3,
                "winningBidder": "赛莱默（中国）有限公司"
              },
              {
                "projectName": "市政污水厂扩建工程",
                "winningPrice": 75090,
                "changeRate": -11.8,
                "winningBidder": "东方电气集团"
              }
            ]
          },
          {
            "id": "m71",
            "stageId": "s5",
            "name": "气动三偏心蝶阀",
            "specification": "DN200",
            "unit": "个",
            "bids": [
              {
                "bidder": "上海连成（集团）有限公司",
                "brand": "KSB",
                "priceExcludingTax": 18584,
                "taxRate": 13,
                "note": "原厂正品，质保3年",
                "priceIncludingTax": 20999,
                "isWinning": false
              },
              {
                "bidder": "格兰富泵业（上海）有限公司",
                "brand": "连成",
                "priceExcludingTax": 19689,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 22248,
                "isWinning": true
              },
              {
                "bidder": "威乐(中国)水泵系统有限公司",
                "brand": "凯泉",
                "priceExcludingTax": 25241,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 28522,
                "isWinning": false
              },
              {
                "bidder": "中联重科股份有限公司",
                "brand": "丹麦APV",
                "priceExcludingTax": 19835,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 22413,
                "isWinning": false
              }
            ],
            "winningBid": {
              "bidder": "格兰富泵业（上海）有限公司",
              "price": 22248,
              "date": "2024-03-15"
            },
            "historicalPrices": [
              {
                "projectName": "西部污水处理厂项目",
                "winningPrice": 20487,
                "changeRate": 8.6,
                "winningBidder": "上海连成（集团）有限公司"
              },
              {
                "projectName": "北部水质净化中心",
                "winningPrice": 20283,
                "changeRate": 9.7,
                "winningBidder": "格兰富泵业（上海）有限公司"
              },
              {
                "projectName": "市政污水厂扩建工程",
                "winningPrice": 19372,
                "changeRate": 14.8,
                "winningBidder": "格兰富泵业（上海）有限公司"
              }
            ]
          },
          {
            "id": "m72",
            "stageId": "s5",
            "name": "气动三偏心蝶阀",
            "specification": "DN150",
            "unit": "个",
            "bids": [
              {
                "bidder": "上海连成（集团）有限公司",
                "brand": "格兰富",
                "priceExcludingTax": 70844,
                "taxRate": 13,
                "note": "原厂正品，质保3年",
                "priceIncludingTax": 80053,
                "isWinning": false
              },
              {
                "bidder": "威乐(中国)水泵系统有限公司",
                "brand": "格兰富",
                "priceExcludingTax": 93877,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 106081,
                "isWinning": false
              },
              {
                "bidder": "凯泉泵业集团有限公司",
                "brand": "碧水源",
                "priceExcludingTax": 91605,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 103513,
                "isWinning": false
              },
              {
                "bidder": "中联重科股份有限公司",
                "brand": "格兰富",
                "priceExcludingTax": 74932,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 84673,
                "isWinning": true
              }
            ],
            "winningBid": {
              "bidder": "中联重科股份有限公司",
              "price": 84673,
              "date": "2024-03-15"
            },
            "historicalPrices": [
              {
                "projectName": "西部污水处理厂项目",
                "winningPrice": 72542,
                "changeRate": 16.7,
                "winningBidder": "中联重科股份有限公司"
              },
              {
                "projectName": "北部水质净化中心",
                "winningPrice": 94886,
                "changeRate": -10.8,
                "winningBidder": "威乐(中国)水泵系统有限公司"
              },
              {
                "projectName": "市政污水厂扩建工程",
                "winningPrice": 83137,
                "changeRate": 1.8,
                "winningBidder": "中联重科股份有限公司"
              }
            ]
          },
          {
            "id": "m73",
            "stageId": "s5",
            "name": "气动三偏心蝶阀",
            "specification": "DN125",
            "unit": "个",
            "bids": [
              {
                "bidder": "ABB（中国）有限公司",
                "brand": "格兰富",
                "priceExcludingTax": 58989,
                "taxRate": 13,
                "note": "原厂正品，质保3年",
                "priceIncludingTax": 66657,
                "isWinning": false
              },
              {
                "bidder": "施耐德电气（中国）有限公司",
                "brand": "凯泉",
                "priceExcludingTax": 44003,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 49723,
                "isWinning": false
              },
              {
                "bidder": "上海连成（集团）有限公司",
                "brand": "碧水源",
                "priceExcludingTax": 39993,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 45192,
                "isWinning": true
              },
              {
                "bidder": "威乐(中国)水泵系统有限公司",
                "brand": "ABB",
                "priceExcludingTax": 41164,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 46515,
                "isWinning": false
              }
            ],
            "winningBid": {
              "bidder": "上海连成（集团）有限公司",
              "price": 45192,
              "date": "2024-03-15"
            },
            "historicalPrices": [
              {
                "projectName": "西部污水处理厂项目",
                "winningPrice": 49877,
                "changeRate": -9.4,
                "winningBidder": "上海连成（集团）有限公司"
              },
              {
                "projectName": "北部水质净化中心",
                "winningPrice": 48235,
                "changeRate": -6.3,
                "winningBidder": "威乐(中国)水泵系统有限公司"
              },
              {
                "projectName": "市政污水厂扩建工程",
                "winningPrice": 42947,
                "changeRate": 5.2,
                "winningBidder": "上海连成（集团）有限公司"
              }
            ]
          },
          {
            "id": "m74",
            "stageId": "s5",
            "name": "气动三偏心蝶阀",
            "specification": "DN100",
            "unit": "个",
            "bids": [
              {
                "bidder": "西门子（中国）有限公司",
                "brand": "丹麦APV",
                "priceExcludingTax": 83695,
                "taxRate": 13,
                "note": "原厂正品，质保3年",
                "priceIncludingTax": 94575,
                "isWinning": false
              },
              {
                "bidder": "格兰富泵业（上海）有限公司",
                "brand": "连成",
                "priceExcludingTax": 64214,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 72561,
                "isWinning": false
              },
              {
                "bidder": "中联重科股份有限公司",
                "brand": "KSB",
                "priceExcludingTax": 83441,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 94288,
                "isWinning": false
              },
              {
                "bidder": "威乐(中国)水泵系统有限公司",
                "brand": "丹麦APV",
                "priceExcludingTax": 72504,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 81929,
                "isWinning": true
              }
            ],
            "winningBid": {
              "bidder": "威乐(中国)水泵系统有限公司",
              "price": 81929,
              "date": "2024-03-15"
            },
            "historicalPrices": [
              {
                "projectName": "西部污水处理厂项目",
                "winningPrice": 92980,
                "changeRate": -11.9,
                "winningBidder": "威乐(中国)水泵系统有限公司"
              },
              {
                "projectName": "北部水质净化中心",
                "winningPrice": 82685,
                "changeRate": -0.9,
                "winningBidder": "中联重科股份有限公司"
              },
              {
                "projectName": "市政污水厂扩建工程",
                "winningPrice": 90402,
                "changeRate": -9.4,
                "winningBidder": "威乐(中国)水泵系统有限公司"
              }
            ]
          },
          {
            "id": "m75",
            "stageId": "s5",
            "name": "气动球阀",
            "specification": "DN100",
            "unit": "个",
            "bids": [
              {
                "bidder": "ABB（中国）有限公司",
                "brand": "ABB",
                "priceExcludingTax": 82028,
                "taxRate": 13,
                "note": "原厂正品，质保3年",
                "priceIncludingTax": 92691,
                "isWinning": false
              },
              {
                "bidder": "上海连成（集团）有限公司",
                "brand": "ABB",
                "priceExcludingTax": 61719,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 69742,
                "isWinning": true
              },
              {
                "bidder": "格兰富泵业（上海）有限公司",
                "brand": "连成",
                "priceExcludingTax": 66480,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 75122,
                "isWinning": false
              },
              {
                "bidder": "西门子（中国）有限公司",
                "brand": "西门子",
                "priceExcludingTax": 80629,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 91110,
                "isWinning": false
              }
            ],
            "winningBid": {
              "bidder": "上海连成（集团）有限公司",
              "price": 69742,
              "date": "2024-03-15"
            },
            "historicalPrices": [
              {
                "projectName": "西部污水处理厂项目",
                "winningPrice": 68627,
                "changeRate": 1.6,
                "winningBidder": "ABB（中国）有限公司"
              },
              {
                "projectName": "北部水质净化中心",
                "winningPrice": 67559,
                "changeRate": 3.2,
                "winningBidder": "上海连成（集团）有限公司"
              },
              {
                "projectName": "市政污水厂扩建工程",
                "winningPrice": 68987,
                "changeRate": 1.1,
                "winningBidder": "格兰富泵业（上海）有限公司"
              }
            ]
          },
          {
            "id": "m76",
            "stageId": "s5",
            "name": "气动球阀",
            "specification": "DN125",
            "unit": "个",
            "bids": [
              {
                "bidder": "上海连成（集团）有限公司",
                "brand": "威乐",
                "priceExcludingTax": 102799,
                "taxRate": 13,
                "note": "原厂正品，质保3年",
                "priceIncludingTax": 116162,
                "isWinning": false
              },
              {
                "bidder": "碧水源科技股份有限公司",
                "brand": "西门子",
                "priceExcludingTax": 88995,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 100564,
                "isWinning": false
              },
              {
                "bidder": "威乐(中国)水泵系统有限公司",
                "brand": "连成",
                "priceExcludingTax": 76179,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 86082,
                "isWinning": true
              },
              {
                "bidder": "赛莱默（中国）有限公司",
                "brand": "KSB",
                "priceExcludingTax": 94565,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 106858,
                "isWinning": false
              }
            ],
            "winningBid": {
              "bidder": "威乐(中国)水泵系统有限公司",
              "price": 86082,
              "date": "2024-03-15"
            },
            "historicalPrices": [
              {
                "projectName": "西部污水处理厂项目",
                "winningPrice": 92510,
                "changeRate": -6.9,
                "winningBidder": "赛莱默（中国）有限公司"
              },
              {
                "projectName": "北部水质净化中心",
                "winningPrice": 75566,
                "changeRate": 13.9,
                "winningBidder": "赛莱默（中国）有限公司"
              },
              {
                "projectName": "市政污水厂扩建工程",
                "winningPrice": 82129,
                "changeRate": 4.8,
                "winningBidder": "碧水源科技股份有限公司"
              }
            ]
          },
          {
            "id": "m77",
            "stageId": "s5",
            "name": "气动球阀",
            "specification": "DN150",
            "unit": "个",
            "bids": [
              {
                "bidder": "三一重工股份有限公司",
                "brand": "连成",
                "priceExcludingTax": 99260,
                "taxRate": 13,
                "note": "原厂正品，质保3年",
                "priceIncludingTax": 112163,
                "isWinning": false
              },
              {
                "bidder": "凯泉泵业集团有限公司",
                "brand": "ABB",
                "priceExcludingTax": 103511,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 116967,
                "isWinning": false
              },
              {
                "bidder": "赛莱默（中国）有限公司",
                "brand": "施耐德",
                "priceExcludingTax": 95391,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 107791,
                "isWinning": false
              },
              {
                "bidder": "威乐(中国)水泵系统有限公司",
                "brand": "碧水源",
                "priceExcludingTax": 89319,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 100930,
                "isWinning": true
              }
            ],
            "winningBid": {
              "bidder": "威乐(中国)水泵系统有限公司",
              "price": 100930,
              "date": "2024-03-15"
            },
            "historicalPrices": [
              {
                "projectName": "西部污水处理厂项目",
                "winningPrice": 112954,
                "changeRate": -10.6,
                "winningBidder": "凯泉泵业集团有限公司"
              },
              {
                "projectName": "北部水质净化中心",
                "winningPrice": 102824,
                "changeRate": -1.8,
                "winningBidder": "威乐(中国)水泵系统有限公司"
              },
              {
                "projectName": "市政污水厂扩建工程",
                "winningPrice": 114541,
                "changeRate": -11.9,
                "winningBidder": "凯泉泵业集团有限公司"
              }
            ]
          },
          {
            "id": "m78",
            "stageId": "s5",
            "name": "气动球阀",
            "specification": "DN20",
            "unit": "个",
            "bids": [
              {
                "bidder": "三一重工股份有限公司",
                "brand": "施耐德",
                "priceExcludingTax": 52188,
                "taxRate": 13,
                "note": "原厂正品，质保3年",
                "priceIncludingTax": 58972,
                "isWinning": false
              },
              {
                "bidder": "施耐德电气（中国）有限公司",
                "brand": "威乐",
                "priceExcludingTax": 40407,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 45659,
                "isWinning": true
              },
              {
                "bidder": "ABB（中国）有限公司",
                "brand": "格兰富",
                "priceExcludingTax": 50265,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 56799,
                "isWinning": false
              },
              {
                "bidder": "东方电气集团",
                "brand": "威乐",
                "priceExcludingTax": 43697,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 49377,
                "isWinning": false
              }
            ],
            "winningBid": {
              "bidder": "施耐德电气（中国）有限公司",
              "price": 45659,
              "date": "2024-03-15"
            },
            "historicalPrices": [
              {
                "projectName": "西部污水处理厂项目",
                "winningPrice": 40416,
                "changeRate": 13,
                "winningBidder": "施耐德电气（中国）有限公司"
              },
              {
                "projectName": "北部水质净化中心",
                "winningPrice": 43408,
                "changeRate": 5.2,
                "winningBidder": "ABB（中国）有限公司"
              },
              {
                "projectName": "市政污水厂扩建工程",
                "winningPrice": 45739,
                "changeRate": -0.2,
                "winningBidder": "三一重工股份有限公司"
              }
            ]
          },
          {
            "id": "m79",
            "stageId": "s5",
            "name": "气动球阀",
            "specification": "DN25",
            "unit": "个",
            "bids": [
              {
                "bidder": "碧水源科技股份有限公司",
                "brand": "ABB",
                "priceExcludingTax": 69429,
                "taxRate": 13,
                "note": "原厂正品，质保3年",
                "priceIncludingTax": 78454,
                "isWinning": false
              },
              {
                "bidder": "格兰富泵业（上海）有限公司",
                "brand": "施耐德",
                "priceExcludingTax": 78267,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 88441,
                "isWinning": false
              },
              {
                "bidder": "ABB（中国）有限公司",
                "brand": "施耐德",
                "priceExcludingTax": 62379,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 70488,
                "isWinning": true
              },
              {
                "bidder": "赛莱默（中国）有限公司",
                "brand": "KSB",
                "priceExcludingTax": 74362,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 84029,
                "isWinning": false
              }
            ],
            "winningBid": {
              "bidder": "ABB（中国）有限公司",
              "price": 70488,
              "date": "2024-03-15"
            },
            "historicalPrices": [
              {
                "projectName": "西部污水处理厂项目",
                "winningPrice": 67102,
                "changeRate": 5,
                "winningBidder": "ABB（中国）有限公司"
              },
              {
                "projectName": "北部水质净化中心",
                "winningPrice": 60959,
                "changeRate": 15.6,
                "winningBidder": "碧水源科技股份有限公司"
              },
              {
                "projectName": "市政污水厂扩建工程",
                "winningPrice": 80952,
                "changeRate": -12.9,
                "winningBidder": "赛莱默（中国）有限公司"
              }
            ]
          },
          {
            "id": "m80",
            "stageId": "s5",
            "name": "气动球阀",
            "specification": "DN40",
            "unit": "个",
            "bids": [
              {
                "bidder": "东方电气集团",
                "brand": "威乐",
                "priceExcludingTax": 63270,
                "taxRate": 13,
                "note": "原厂正品，质保3年",
                "priceIncludingTax": 71495,
                "isWinning": false
              },
              {
                "bidder": "三一重工股份有限公司",
                "brand": "碧水源",
                "priceExcludingTax": 60288,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 68125,
                "isWinning": true
              },
              {
                "bidder": "格兰富泵业（上海）有限公司",
                "brand": "碧水源",
                "priceExcludingTax": 67207,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 75943,
                "isWinning": false
              },
              {
                "bidder": "威乐(中国)水泵系统有限公司",
                "brand": "KSB",
                "priceExcludingTax": 67198,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 75933,
                "isWinning": false
              }
            ],
            "winningBid": {
              "bidder": "三一重工股份有限公司",
              "price": 68125,
              "date": "2024-03-15"
            },
            "historicalPrices": [
              {
                "projectName": "西部污水处理厂项目",
                "winningPrice": 66638,
                "changeRate": 2.2,
                "winningBidder": "威乐(中国)水泵系统有限公司"
              },
              {
                "projectName": "北部水质净化中心",
                "winningPrice": 66682,
                "changeRate": 2.2,
                "winningBidder": "东方电气集团"
              },
              {
                "projectName": "市政污水厂扩建工程",
                "winningPrice": 69620,
                "changeRate": -2.1,
                "winningBidder": "威乐(中国)水泵系统有限公司"
              }
            ]
          },
          {
            "id": "m81",
            "stageId": "s5",
            "name": "气动球阀",
            "specification": "DN65",
            "unit": "个",
            "bids": [
              {
                "bidder": "东方电气集团",
                "brand": "威乐",
                "priceExcludingTax": 25267,
                "taxRate": 13,
                "note": "原厂正品，质保3年",
                "priceIncludingTax": 28551,
                "isWinning": false
              },
              {
                "bidder": "上海连成（集团）有限公司",
                "brand": "ABB",
                "priceExcludingTax": 21155,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 23905,
                "isWinning": true
              },
              {
                "bidder": "赛莱默（中国）有限公司",
                "brand": "ABB",
                "priceExcludingTax": 22722,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 25675,
                "isWinning": false
              },
              {
                "bidder": "格兰富泵业（上海）有限公司",
                "brand": "连成",
                "priceExcludingTax": 24402,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 27574,
                "isWinning": false
              }
            ],
            "winningBid": {
              "bidder": "上海连成（集团）有限公司",
              "price": 23905,
              "date": "2024-03-15"
            },
            "historicalPrices": [
              {
                "projectName": "西部污水处理厂项目",
                "winningPrice": 27327,
                "changeRate": -12.5,
                "winningBidder": "格兰富泵业（上海）有限公司"
              },
              {
                "projectName": "北部水质净化中心",
                "winningPrice": 25803,
                "changeRate": -7.4,
                "winningBidder": "东方电气集团"
              },
              {
                "projectName": "市政污水厂扩建工程",
                "winningPrice": 25894,
                "changeRate": -7.7,
                "winningBidder": "东方电气集团"
              }
            ]
          },
          {
            "id": "m82",
            "stageId": "s5",
            "name": "气动球阀",
            "specification": "DN80",
            "unit": "个",
            "bids": [
              {
                "bidder": "上海连成（集团）有限公司",
                "brand": "连成",
                "priceExcludingTax": 74286,
                "taxRate": 13,
                "note": "原厂正品，质保3年",
                "priceIncludingTax": 83943,
                "isWinning": false
              },
              {
                "bidder": "格兰富泵业（上海）有限公司",
                "brand": "KSB",
                "priceExcludingTax": 70302,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 79441,
                "isWinning": false
              },
              {
                "bidder": "威乐(中国)水泵系统有限公司",
                "brand": "格兰富",
                "priceExcludingTax": 77236,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 87276,
                "isWinning": false
              },
              {
                "bidder": "西门子（中国）有限公司",
                "brand": "施耐德",
                "priceExcludingTax": 70517,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 79684,
                "isWinning": true
              }
            ],
            "winningBid": {
              "bidder": "西门子（中国）有限公司",
              "price": 79684,
              "date": "2024-03-15"
            },
            "historicalPrices": [
              {
                "projectName": "西部污水处理厂项目",
                "winningPrice": 79218,
                "changeRate": 0.6,
                "winningBidder": "西门子（中国）有限公司"
              },
              {
                "projectName": "北部水质净化中心",
                "winningPrice": 72751,
                "changeRate": 9.5,
                "winningBidder": "上海连成（集团）有限公司"
              },
              {
                "projectName": "市政污水厂扩建工程",
                "winningPrice": 83943,
                "changeRate": -5.1,
                "winningBidder": "威乐(中国)水泵系统有限公司"
              }
            ]
          },
          {
            "id": "m83",
            "stageId": "s5",
            "name": "电动调节阀",
            "specification": "DN80",
            "unit": "个",
            "bids": [
              {
                "bidder": "威乐(中国)水泵系统有限公司",
                "brand": "丹麦APV",
                "priceExcludingTax": 26862,
                "taxRate": 13,
                "note": "原厂正品，质保3年",
                "priceIncludingTax": 30354,
                "isWinning": false
              },
              {
                "bidder": "东方电气集团",
                "brand": "连成",
                "priceExcludingTax": 25209,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 28486,
                "isWinning": false
              },
              {
                "bidder": "中联重科股份有限公司",
                "brand": "凯泉",
                "priceExcludingTax": 25452,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 28760,
                "isWinning": false
              },
              {
                "bidder": "碧水源科技股份有限公司",
                "brand": "碧水源",
                "priceExcludingTax": 23082,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 26082,
                "isWinning": true
              }
            ],
            "winningBid": {
              "bidder": "碧水源科技股份有限公司",
              "price": 26082,
              "date": "2024-03-15"
            },
            "historicalPrices": [
              {
                "projectName": "西部污水处理厂项目",
                "winningPrice": 27216,
                "changeRate": -4.2,
                "winningBidder": "东方电气集团"
              },
              {
                "projectName": "北部水质净化中心",
                "winningPrice": 25675,
                "changeRate": 1.6,
                "winningBidder": "东方电气集团"
              },
              {
                "projectName": "市政污水厂扩建工程",
                "winningPrice": 28996,
                "changeRate": -10,
                "winningBidder": "中联重科股份有限公司"
              }
            ]
          },
          {
            "id": "m84",
            "stageId": "s5",
            "name": "气动法兰式蝶阀",
            "specification": "DN250，PN10，CIP管",
            "unit": "台",
            "bids": [
              {
                "bidder": "三一重工股份有限公司",
                "brand": "连成",
                "priceExcludingTax": 93225,
                "taxRate": 13,
                "note": "原厂正品，质保3年",
                "priceIncludingTax": 105344,
                "isWinning": false
              },
              {
                "bidder": "施耐德电气（中国）有限公司",
                "brand": "格兰富",
                "priceExcludingTax": 84977,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 96024,
                "isWinning": true
              },
              {
                "bidder": "威乐(中国)水泵系统有限公司",
                "brand": "施耐德",
                "priceExcludingTax": 80696,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 91186,
                "isWinning": false
              },
              {
                "bidder": "碧水源科技股份有限公司",
                "brand": "格兰富",
                "priceExcludingTax": 104551,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 118142,
                "isWinning": false
              }
            ],
            "winningBid": {
              "bidder": "施耐德电气（中国）有限公司",
              "price": 96024,
              "date": "2024-03-15"
            },
            "historicalPrices": [
              {
                "projectName": "西部污水处理厂项目",
                "winningPrice": 110299,
                "changeRate": -12.9,
                "winningBidder": "三一重工股份有限公司"
              },
              {
                "projectName": "北部水质净化中心",
                "winningPrice": 107961,
                "changeRate": -11.1,
                "winningBidder": "三一重工股份有限公司"
              },
              {
                "projectName": "市政污水厂扩建工程",
                "winningPrice": 107998,
                "changeRate": -11.1,
                "winningBidder": "碧水源科技股份有限公司"
              }
            ]
          },
          {
            "id": "m85",
            "stageId": "s5",
            "name": "气动对夹式蝶阀",
            "specification": "DN150，PN10，剩余污泥总管",
            "unit": "台",
            "bids": [
              {
                "bidder": "威乐(中国)水泵系统有限公司",
                "brand": "连成",
                "priceExcludingTax": 43890,
                "taxRate": 13,
                "note": "原厂正品，质保3年",
                "priceIncludingTax": 49595,
                "isWinning": false
              },
              {
                "bidder": "西门子（中国）有限公司",
                "brand": "碧水源",
                "priceExcludingTax": 33181,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 37494,
                "isWinning": true
              },
              {
                "bidder": "东方电气集团",
                "brand": "碧水源",
                "priceExcludingTax": 37309,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 42159,
                "isWinning": false
              },
              {
                "bidder": "ABB（中国）有限公司",
                "brand": "碧水源",
                "priceExcludingTax": 37739,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 42645,
                "isWinning": false
              }
            ],
            "winningBid": {
              "bidder": "西门子（中国）有限公司",
              "price": 37494,
              "date": "2024-03-15"
            },
            "historicalPrices": [
              {
                "projectName": "西部污水处理厂项目",
                "winningPrice": 33922,
                "changeRate": 10.5,
                "winningBidder": "威乐(中国)水泵系统有限公司"
              },
              {
                "projectName": "北部水质净化中心",
                "winningPrice": 35449,
                "changeRate": 5.8,
                "winningBidder": "ABB（中国）有限公司"
              },
              {
                "projectName": "市政污水厂扩建工程",
                "winningPrice": 39340,
                "changeRate": -4.7,
                "winningBidder": "ABB（中国）有限公司"
              }
            ]
          },
          {
            "id": "m86",
            "stageId": "s5",
            "name": "气动对夹式蝶阀",
            "specification": "DN80，PN10，产水专用设备抽真空",
            "unit": "台",
            "bids": [
              {
                "bidder": "格兰富泵业（上海）有限公司",
                "brand": "格兰富",
                "priceExcludingTax": 79987,
                "taxRate": 13,
                "note": "原厂正品，质保3年",
                "priceIncludingTax": 90385,
                "isWinning": false
              },
              {
                "bidder": "威乐(中国)水泵系统有限公司",
                "brand": "丹麦APV",
                "priceExcludingTax": 88025,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 99468,
                "isWinning": false
              },
              {
                "bidder": "凯泉泵业集团有限公司",
                "brand": "西门子",
                "priceExcludingTax": 86392,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 97622,
                "isWinning": false
              },
              {
                "bidder": "东方电气集团",
                "brand": "西门子",
                "priceExcludingTax": 63605,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 71873,
                "isWinning": true
              }
            ],
            "winningBid": {
              "bidder": "东方电气集团",
              "price": 71873,
              "date": "2024-03-15"
            },
            "historicalPrices": [
              {
                "projectName": "西部污水处理厂项目",
                "winningPrice": 72613,
                "changeRate": -1,
                "winningBidder": "威乐(中国)水泵系统有限公司"
              },
              {
                "projectName": "北部水质净化中心",
                "winningPrice": 62463,
                "changeRate": 15.1,
                "winningBidder": "东方电气集团"
              },
              {
                "projectName": "市政污水厂扩建工程",
                "winningPrice": 67463,
                "changeRate": 6.5,
                "winningBidder": "格兰富泵业（上海）有限公司"
              }
            ]
          },
          {
            "id": "m87",
            "stageId": "s5",
            "name": "气动对夹式蝶阀",
            "specification": "DN80，PN10，真空罐进口",
            "unit": "台",
            "bids": [
              {
                "bidder": "中联重科股份有限公司",
                "brand": "碧水源",
                "priceExcludingTax": 87533,
                "taxRate": 13,
                "note": "原厂正品，质保3年",
                "priceIncludingTax": 98912,
                "isWinning": false
              },
              {
                "bidder": "格兰富泵业（上海）有限公司",
                "brand": "威乐",
                "priceExcludingTax": 100623,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 113703,
                "isWinning": true
              },
              {
                "bidder": "上海连成（集团）有限公司",
                "brand": "连成",
                "priceExcludingTax": 104989,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 118637,
                "isWinning": false
              },
              {
                "bidder": "西门子（中国）有限公司",
                "brand": "丹麦APV",
                "priceExcludingTax": 103230,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 116649,
                "isWinning": false
              }
            ],
            "winningBid": {
              "bidder": "格兰富泵业（上海）有限公司",
              "price": 113703,
              "date": "2024-03-15"
            },
            "historicalPrices": [
              {
                "projectName": "西部污水处理厂项目",
                "winningPrice": 115188,
                "changeRate": -1.3,
                "winningBidder": "格兰富泵业（上海）有限公司"
              },
              {
                "projectName": "北部水质净化中心",
                "winningPrice": 115003,
                "changeRate": -1.1,
                "winningBidder": "上海连成（集团）有限公司"
              },
              {
                "projectName": "市政污水厂扩建工程",
                "winningPrice": 112809,
                "changeRate": 0.8,
                "winningBidder": "中联重科股份有限公司"
              }
            ]
          },
          {
            "id": "m88",
            "stageId": "s5",
            "name": "气动对夹式蝶阀",
            "specification": "DN50，PN10，真空罐排水",
            "unit": "台",
            "bids": [
              {
                "bidder": "施耐德电气（中国）有限公司",
                "brand": "威乐",
                "priceExcludingTax": 27835,
                "taxRate": 13,
                "note": "原厂正品，质保3年",
                "priceIncludingTax": 31453,
                "isWinning": true
              },
              {
                "bidder": "三一重工股份有限公司",
                "brand": "ABB",
                "priceExcludingTax": 35063,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 39621,
                "isWinning": false
              },
              {
                "bidder": "格兰富泵业（上海）有限公司",
                "brand": "威乐",
                "priceExcludingTax": 33110,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 37414,
                "isWinning": false
              },
              {
                "bidder": "碧水源科技股份有限公司",
                "brand": "ABB",
                "priceExcludingTax": 32986,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 37274,
                "isWinning": false
              }
            ],
            "winningBid": {
              "bidder": "施耐德电气（中国）有限公司",
              "price": 31453,
              "date": "2024-03-15"
            },
            "historicalPrices": [
              {
                "projectName": "西部污水处理厂项目",
                "winningPrice": 27040,
                "changeRate": 16.3,
                "winningBidder": "格兰富泵业（上海）有限公司"
              },
              {
                "projectName": "北部水质净化中心",
                "winningPrice": 28912,
                "changeRate": 8.8,
                "winningBidder": "三一重工股份有限公司"
              },
              {
                "projectName": "市政污水厂扩建工程",
                "winningPrice": 34015,
                "changeRate": -7.5,
                "winningBidder": "碧水源科技股份有限公司"
              }
            ]
          },
          {
            "id": "m89",
            "stageId": "s5",
            "name": "气动球阀",
            "specification": "DN20，PN10，真空罐排气",
            "unit": "台",
            "bids": [
              {
                "bidder": "西门子（中国）有限公司",
                "brand": "丹麦APV",
                "priceExcludingTax": 36946,
                "taxRate": 13,
                "note": "原厂正品，质保3年",
                "priceIncludingTax": 41748,
                "isWinning": true
              },
              {
                "bidder": "施耐德电气（中国）有限公司",
                "brand": "碧水源",
                "priceExcludingTax": 47026,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 53139,
                "isWinning": false
              },
              {
                "bidder": "威乐(中国)水泵系统有限公司",
                "brand": "威乐",
                "priceExcludingTax": 41457,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 46846,
                "isWinning": false
              },
              {
                "bidder": "上海连成（集团）有限公司",
                "brand": "KSB",
                "priceExcludingTax": 39465,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 44595,
                "isWinning": false
              }
            ],
            "winningBid": {
              "bidder": "西门子（中国）有限公司",
              "price": 41748,
              "date": "2024-03-15"
            },
            "historicalPrices": [
              {
                "projectName": "西部污水处理厂项目",
                "winningPrice": 45422,
                "changeRate": -8.1,
                "winningBidder": "威乐(中国)水泵系统有限公司"
              },
              {
                "projectName": "北部水质净化中心",
                "winningPrice": 40524,
                "changeRate": 3,
                "winningBidder": "上海连成（集团）有限公司"
              },
              {
                "projectName": "市政污水厂扩建工程",
                "winningPrice": 38577,
                "changeRate": 8.2,
                "winningBidder": "上海连成（集团）有限公司"
              }
            ]
          },
          {
            "id": "m90",
            "stageId": "s5",
            "name": "气动球阀",
            "specification": "DN15，PN10，气水分离罐补水",
            "unit": "台",
            "bids": [
              {
                "bidder": "凯泉泵业集团有限公司",
                "brand": "碧水源",
                "priceExcludingTax": 83360,
                "taxRate": 13,
                "note": "原厂正品，质保3年",
                "priceIncludingTax": 94196,
                "isWinning": true
              },
              {
                "bidder": "三一重工股份有限公司",
                "brand": "KSB",
                "priceExcludingTax": 102484,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 115806,
                "isWinning": false
              },
              {
                "bidder": "西门子（中国）有限公司",
                "brand": "碧水源",
                "priceExcludingTax": 97718,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 110421,
                "isWinning": false
              },
              {
                "bidder": "格兰富泵业（上海）有限公司",
                "brand": "KSB",
                "priceExcludingTax": 92713,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 104765,
                "isWinning": false
              }
            ],
            "winningBid": {
              "bidder": "凯泉泵业集团有限公司",
              "price": 94196,
              "date": "2024-03-15"
            },
            "historicalPrices": [
              {
                "projectName": "西部污水处理厂项目",
                "winningPrice": 103523,
                "changeRate": -9,
                "winningBidder": "西门子（中国）有限公司"
              },
              {
                "projectName": "北部水质净化中心",
                "winningPrice": 94584,
                "changeRate": -0.4,
                "winningBidder": "格兰富泵业（上海）有限公司"
              },
              {
                "projectName": "市政污水厂扩建工程",
                "winningPrice": 93038,
                "changeRate": 1.2,
                "winningBidder": "三一重工股份有限公司"
              }
            ]
          },
          {
            "id": "m91",
            "stageId": "s5",
            "name": "电磁阀",
            "specification": "DN20，PN10，储气罐排污",
            "unit": "台",
            "bids": [
              {
                "bidder": "ABB（中国）有限公司",
                "brand": "威乐",
                "priceExcludingTax": 54719,
                "taxRate": 13,
                "note": "原厂正品，质保3年",
                "priceIncludingTax": 61832,
                "isWinning": false
              },
              {
                "bidder": "凯泉泵业集团有限公司",
                "brand": "威乐",
                "priceExcludingTax": 44566,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 50359,
                "isWinning": true
              },
              {
                "bidder": "中联重科股份有限公司",
                "brand": "施耐德",
                "priceExcludingTax": 41886,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 47331,
                "isWinning": false
              },
              {
                "bidder": "威乐(中国)水泵系统有限公司",
                "brand": "碧水源",
                "priceExcludingTax": 46564,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 52617,
                "isWinning": false
              }
            ],
            "winningBid": {
              "bidder": "凯泉泵业集团有限公司",
              "price": 50359,
              "date": "2024-03-15"
            },
            "historicalPrices": [
              {
                "projectName": "西部污水处理厂项目",
                "winningPrice": 48019,
                "changeRate": 4.9,
                "winningBidder": "威乐(中国)水泵系统有限公司"
              },
              {
                "projectName": "北部水质净化中心",
                "winningPrice": 47267,
                "changeRate": 6.5,
                "winningBidder": "凯泉泵业集团有限公司"
              },
              {
                "projectName": "市政污水厂扩建工程",
                "winningPrice": 46399,
                "changeRate": 8.5,
                "winningBidder": "凯泉泵业集团有限公司"
              }
            ]
          },
          {
            "id": "m92",
            "stageId": "s5",
            "name": "气动对夹式蝶阀",
            "specification": "DN350，PN10，产水干管",
            "unit": "台",
            "bids": [
              {
                "bidder": "格兰富泵业（上海）有限公司",
                "brand": "威乐",
                "priceExcludingTax": 68084,
                "taxRate": 13,
                "note": "原厂正品，质保3年",
                "priceIncludingTax": 76934,
                "isWinning": false
              },
              {
                "bidder": "西门子（中国）有限公司",
                "brand": "丹麦APV",
                "priceExcludingTax": 68054,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 76901,
                "isWinning": true
              },
              {
                "bidder": "ABB（中国）有限公司",
                "brand": "ABB",
                "priceExcludingTax": 58572,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 66186,
                "isWinning": false
              },
              {
                "bidder": "赛莱默（中国）有限公司",
                "brand": "KSB",
                "priceExcludingTax": 72247,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 81639,
                "isWinning": false
              }
            ],
            "winningBid": {
              "bidder": "西门子（中国）有限公司",
              "price": 76901,
              "date": "2024-03-15"
            },
            "historicalPrices": [
              {
                "projectName": "西部污水处理厂项目",
                "winningPrice": 72963,
                "changeRate": 5.4,
                "winningBidder": "赛莱默（中国）有限公司"
              },
              {
                "projectName": "北部水质净化中心",
                "winningPrice": 86177,
                "changeRate": -10.8,
                "winningBidder": "格兰富泵业（上海）有限公司"
              },
              {
                "projectName": "市政污水厂扩建工程",
                "winningPrice": 80153,
                "changeRate": -4.1,
                "winningBidder": "赛莱默（中国）有限公司"
              }
            ]
          },
          {
            "id": "m93",
            "stageId": "s5",
            "name": "气动对夹式蝶阀",
            "specification": "DN300，PN10，吹扫干管",
            "unit": "台",
            "bids": [
              {
                "bidder": "东方电气集团",
                "brand": "凯泉",
                "priceExcludingTax": 38560,
                "taxRate": 13,
                "note": "原厂正品，质保3年",
                "priceIncludingTax": 43572,
                "isWinning": false
              },
              {
                "bidder": "西门子（中国）有限公司",
                "brand": "连成",
                "priceExcludingTax": 40513,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 45779,
                "isWinning": false
              },
              {
                "bidder": "ABB（中国）有限公司",
                "brand": "ABB",
                "priceExcludingTax": 36062,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 40750,
                "isWinning": true
              },
              {
                "bidder": "上海连成（集团）有限公司",
                "brand": "连成",
                "priceExcludingTax": 42990,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 48578,
                "isWinning": false
              }
            ],
            "winningBid": {
              "bidder": "ABB（中国）有限公司",
              "price": 40750,
              "date": "2024-03-15"
            },
            "historicalPrices": [
              {
                "projectName": "西部污水处理厂项目",
                "winningPrice": 43822,
                "changeRate": -7,
                "winningBidder": "上海连成（集团）有限公司"
              },
              {
                "projectName": "北部水质净化中心",
                "winningPrice": 42883,
                "changeRate": -5,
                "winningBidder": "上海连成（集团）有限公司"
              },
              {
                "projectName": "市政污水厂扩建工程",
                "winningPrice": 35091,
                "changeRate": 16.1,
                "winningBidder": "西门子（中国）有限公司"
              }
            ]
          },
          {
            "id": "m94",
            "stageId": "s5",
            "name": "气动对夹式蝶阀",
            "specification": "DN300,PN10, 清水池补水管",
            "unit": "台",
            "bids": [
              {
                "bidder": "施耐德电气（中国）有限公司",
                "brand": "威乐",
                "priceExcludingTax": 64242,
                "taxRate": 13,
                "note": "原厂正品，质保3年",
                "priceIncludingTax": 72593,
                "isWinning": true
              },
              {
                "bidder": "上海连成（集团）有限公司",
                "brand": "施耐德",
                "priceExcludingTax": 70288,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 79425,
                "isWinning": false
              },
              {
                "bidder": "西门子（中国）有限公司",
                "brand": "施耐德",
                "priceExcludingTax": 89811,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 101486,
                "isWinning": false
              },
              {
                "bidder": "威乐(中国)水泵系统有限公司",
                "brand": "格兰富",
                "priceExcludingTax": 87723,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 99126,
                "isWinning": false
              }
            ],
            "winningBid": {
              "bidder": "施耐德电气（中国）有限公司",
              "price": 72593,
              "date": "2024-03-15"
            },
            "historicalPrices": [
              {
                "projectName": "西部污水处理厂项目",
                "winningPrice": 65405,
                "changeRate": 11,
                "winningBidder": "西门子（中国）有限公司"
              },
              {
                "projectName": "北部水质净化中心",
                "winningPrice": 67197,
                "changeRate": 8,
                "winningBidder": "西门子（中国）有限公司"
              },
              {
                "projectName": "市政污水厂扩建工程",
                "winningPrice": 62959,
                "changeRate": 15.3,
                "winningBidder": "西门子（中国）有限公司"
              }
            ]
          },
          {
            "id": "m95",
            "stageId": "s5",
            "name": "在线MLSS仪",
            "specification": "量程0~20g/L，输出信号4~20mA",
            "unit": "套",
            "bids": [
              {
                "bidder": "东方电气集团",
                "brand": "凯泉",
                "priceExcludingTax": 70941,
                "taxRate": 13,
                "note": "原厂正品，质保3年",
                "priceIncludingTax": 80163,
                "isWinning": false
              },
              {
                "bidder": "上海连成（集团）有限公司",
                "brand": "碧水源",
                "priceExcludingTax": 76812,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 86797,
                "isWinning": false
              },
              {
                "bidder": "碧水源科技股份有限公司",
                "brand": "威乐",
                "priceExcludingTax": 66663,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 75329,
                "isWinning": true
              },
              {
                "bidder": "中联重科股份有限公司",
                "brand": "西门子",
                "priceExcludingTax": 68381,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 77270,
                "isWinning": false
              }
            ],
            "winningBid": {
              "bidder": "碧水源科技股份有限公司",
              "price": 75329,
              "date": "2024-03-15"
            },
            "historicalPrices": [
              {
                "projectName": "西部污水处理厂项目",
                "winningPrice": 76898,
                "changeRate": -2,
                "winningBidder": "中联重科股份有限公司"
              },
              {
                "projectName": "北部水质净化中心",
                "winningPrice": 79211,
                "changeRate": -4.9,
                "winningBidder": "上海连成（集团）有限公司"
              },
              {
                "projectName": "市政污水厂扩建工程",
                "winningPrice": 74852,
                "changeRate": 0.6,
                "winningBidder": "东方电气集团"
              }
            ]
          },
          {
            "id": "m96",
            "stageId": "s5",
            "name": "静压式液位计",
            "specification": "量程0～5m，输出信号4～20mA",
            "unit": "套",
            "bids": [
              {
                "bidder": "中联重科股份有限公司",
                "brand": "格兰富",
                "priceExcludingTax": 22166,
                "taxRate": 13,
                "note": "原厂正品，质保3年",
                "priceIncludingTax": 25047,
                "isWinning": false
              },
              {
                "bidder": "凯泉泵业集团有限公司",
                "brand": "格兰富",
                "priceExcludingTax": 18409,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 20802,
                "isWinning": true
              },
              {
                "bidder": "三一重工股份有限公司",
                "brand": "凯泉",
                "priceExcludingTax": 24046,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 27171,
                "isWinning": false
              },
              {
                "bidder": "威乐(中国)水泵系统有限公司",
                "brand": "丹麦APV",
                "priceExcludingTax": 22185,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 25069,
                "isWinning": false
              }
            ],
            "winningBid": {
              "bidder": "凯泉泵业集团有限公司",
              "price": 20802,
              "date": "2024-03-15"
            },
            "historicalPrices": [
              {
                "projectName": "西部污水处理厂项目",
                "winningPrice": 22454,
                "changeRate": -7.4,
                "winningBidder": "威乐(中国)水泵系统有限公司"
              },
              {
                "projectName": "北部水质净化中心",
                "winningPrice": 23822,
                "changeRate": -12.7,
                "winningBidder": "凯泉泵业集团有限公司"
              },
              {
                "projectName": "市政污水厂扩建工程",
                "winningPrice": 18932,
                "changeRate": 9.9,
                "winningBidder": "凯泉泵业集团有限公司"
              }
            ]
          },
          {
            "id": "m97",
            "stageId": "s5",
            "name": "压力变送器",
            "specification": "量程－100～200kPa，输出信号4～20mA，一体式",
            "unit": "套",
            "bids": [
              {
                "bidder": "东方电气集团",
                "brand": "威乐",
                "priceExcludingTax": 43432,
                "taxRate": 13,
                "note": "原厂正品，质保3年",
                "priceIncludingTax": 49078,
                "isWinning": false
              },
              {
                "bidder": "上海连成（集团）有限公司",
                "brand": "连成",
                "priceExcludingTax": 47786,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 53998,
                "isWinning": false
              },
              {
                "bidder": "格兰富泵业（上海）有限公司",
                "brand": "KSB",
                "priceExcludingTax": 44567,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 50360,
                "isWinning": false
              },
              {
                "bidder": "中联重科股份有限公司",
                "brand": "凯泉",
                "priceExcludingTax": 42442,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 47959,
                "isWinning": true
              }
            ],
            "winningBid": {
              "bidder": "中联重科股份有限公司",
              "price": 47959,
              "date": "2024-03-15"
            },
            "historicalPrices": [
              {
                "projectName": "西部污水处理厂项目",
                "winningPrice": 53243,
                "changeRate": -9.9,
                "winningBidder": "东方电气集团"
              },
              {
                "projectName": "北部水质净化中心",
                "winningPrice": 43872,
                "changeRate": 9.3,
                "winningBidder": "东方电气集团"
              },
              {
                "projectName": "市政污水厂扩建工程",
                "winningPrice": 51940,
                "changeRate": -7.7,
                "winningBidder": "东方电气集团"
              }
            ]
          },
          {
            "id": "m98",
            "stageId": "s5",
            "name": "电磁流量计",
            "specification": "DN300，量程0～750m3/h，橡胶衬里，不锈钢电极，输出信号4～20mA，1.0MPa，分体式",
            "unit": "套",
            "bids": [
              {
                "bidder": "西门子（中国）有限公司",
                "brand": "ABB",
                "priceExcludingTax": 67999,
                "taxRate": 13,
                "note": "原厂正品，质保3年",
                "priceIncludingTax": 76838,
                "isWinning": false
              },
              {
                "bidder": "凯泉泵业集团有限公司",
                "brand": "丹麦APV",
                "priceExcludingTax": 55671,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 62908,
                "isWinning": false
              },
              {
                "bidder": "上海连成（集团）有限公司",
                "brand": "碧水源",
                "priceExcludingTax": 62892,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 71067,
                "isWinning": true
              },
              {
                "bidder": "三一重工股份有限公司",
                "brand": "威乐",
                "priceExcludingTax": 64589,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 72985,
                "isWinning": false
              }
            ],
            "winningBid": {
              "bidder": "上海连成（集团）有限公司",
              "price": 71067,
              "date": "2024-03-15"
            },
            "historicalPrices": [
              {
                "projectName": "西部污水处理厂项目",
                "winningPrice": 61746,
                "changeRate": 15.1,
                "winningBidder": "上海连成（集团）有限公司"
              },
              {
                "projectName": "北部水质净化中心",
                "winningPrice": 77930,
                "changeRate": -8.8,
                "winningBidder": "三一重工股份有限公司"
              },
              {
                "projectName": "市政污水厂扩建工程",
                "winningPrice": 62762,
                "changeRate": 13.2,
                "winningBidder": "西门子（中国）有限公司"
              }
            ]
          },
          {
            "id": "m99",
            "stageId": "s5",
            "name": "在线浊度仪",
            "specification": "量程0～20NTU，输出信号4～20mA，分体式",
            "unit": "套",
            "bids": [
              {
                "bidder": "ABB（中国）有限公司",
                "brand": "ABB",
                "priceExcludingTax": 54388,
                "taxRate": 13,
                "note": "原厂正品，质保3年",
                "priceIncludingTax": 61458,
                "isWinning": true
              },
              {
                "bidder": "格兰富泵业（上海）有限公司",
                "brand": "碧水源",
                "priceExcludingTax": 56674,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 64041,
                "isWinning": false
              },
              {
                "bidder": "上海连成（集团）有限公司",
                "brand": "施耐德",
                "priceExcludingTax": 55269,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 62453,
                "isWinning": false
              },
              {
                "bidder": "赛莱默（中国）有限公司",
                "brand": "凯泉",
                "priceExcludingTax": 60607,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 68485,
                "isWinning": false
              }
            ],
            "winningBid": {
              "bidder": "ABB（中国）有限公司",
              "price": 61458,
              "date": "2024-03-15"
            },
            "historicalPrices": [
              {
                "projectName": "西部污水处理厂项目",
                "winningPrice": 56435,
                "changeRate": 8.9,
                "winningBidder": "ABB（中国）有限公司"
              },
              {
                "projectName": "北部水质净化中心",
                "winningPrice": 52910,
                "changeRate": 16.2,
                "winningBidder": "ABB（中国）有限公司"
              },
              {
                "projectName": "市政污水厂扩建工程",
                "winningPrice": 66484,
                "changeRate": -7.6,
                "winningBidder": "赛莱默（中国）有限公司"
              }
            ]
          },
          {
            "id": "m100",
            "stageId": "s5",
            "name": "电磁流量计",
            "specification": "DN250，量程0～350m3/h，橡胶衬里,不锈钢电极，输出信号4～20mA，1.0MPa，分体式",
            "unit": "套",
            "bids": [
              {
                "bidder": "上海连成（集团）有限公司",
                "brand": "丹麦APV",
                "priceExcludingTax": 21384,
                "taxRate": 13,
                "note": "原厂正品，质保3年",
                "priceIncludingTax": 24163,
                "isWinning": true
              },
              {
                "bidder": "三一重工股份有限公司",
                "brand": "格兰富",
                "priceExcludingTax": 23938,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 27049,
                "isWinning": false
              },
              {
                "bidder": "格兰富泵业（上海）有限公司",
                "brand": "格兰富",
                "priceExcludingTax": 21949,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 24802,
                "isWinning": false
              },
              {
                "bidder": "碧水源科技股份有限公司",
                "brand": "丹麦APV",
                "priceExcludingTax": 30497,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 34461,
                "isWinning": false
              }
            ],
            "winningBid": {
              "bidder": "上海连成（集团）有限公司",
              "price": 24163,
              "date": "2024-03-15"
            },
            "historicalPrices": [
              {
                "projectName": "西部污水处理厂项目",
                "winningPrice": 21113,
                "changeRate": 14.4,
                "winningBidder": "碧水源科技股份有限公司"
              },
              {
                "projectName": "北部水质净化中心",
                "winningPrice": 24670,
                "changeRate": -2.1,
                "winningBidder": "格兰富泵业（上海）有限公司"
              },
              {
                "projectName": "市政污水厂扩建工程",
                "winningPrice": 27774,
                "changeRate": -13,
                "winningBidder": "三一重工股份有限公司"
              }
            ]
          },
          {
            "id": "m101",
            "stageId": "s5",
            "name": "音叉液位计",
            "specification": "双叉标准型，螺纹连接",
            "unit": "套",
            "bids": [
              {
                "bidder": "中联重科股份有限公司",
                "brand": "格兰富",
                "priceExcludingTax": 28541,
                "taxRate": 13,
                "note": "原厂正品，质保3年",
                "priceIncludingTax": 32251,
                "isWinning": true
              },
              {
                "bidder": "东方电气集团",
                "brand": "西门子",
                "priceExcludingTax": 29456,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 33285,
                "isWinning": false
              },
              {
                "bidder": "赛莱默（中国）有限公司",
                "brand": "威乐",
                "priceExcludingTax": 35160,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 39730,
                "isWinning": false
              },
              {
                "bidder": "上海连成（集团）有限公司",
                "brand": "威乐",
                "priceExcludingTax": 33381,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 37720,
                "isWinning": false
              }
            ],
            "winningBid": {
              "bidder": "中联重科股份有限公司",
              "price": 32251,
              "date": "2024-03-15"
            },
            "historicalPrices": [
              {
                "projectName": "西部污水处理厂项目",
                "winningPrice": 29813,
                "changeRate": 8.2,
                "winningBidder": "上海连成（集团）有限公司"
              },
              {
                "projectName": "北部水质净化中心",
                "winningPrice": 29657,
                "changeRate": 8.7,
                "winningBidder": "上海连成（集团）有限公司"
              },
              {
                "projectName": "市政污水厂扩建工程",
                "winningPrice": 36242,
                "changeRate": -11,
                "winningBidder": "上海连成（集团）有限公司"
              }
            ]
          },
          {
            "id": "m102",
            "stageId": "s5",
            "name": "液位计",
            "specification": "测量范围0～4m，介质：NaClO，输出信号4～20mA",
            "unit": "套",
            "bids": [
              {
                "bidder": "西门子（中国）有限公司",
                "brand": "西门子",
                "priceExcludingTax": 33696,
                "taxRate": 13,
                "note": "原厂正品，质保3年",
                "priceIncludingTax": 38076,
                "isWinning": false
              },
              {
                "bidder": "格兰富泵业（上海）有限公司",
                "brand": "格兰富",
                "priceExcludingTax": 45985,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 51963,
                "isWinning": false
              },
              {
                "bidder": "威乐(中国)水泵系统有限公司",
                "brand": "西门子",
                "priceExcludingTax": 35906,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 40573,
                "isWinning": true
              },
              {
                "bidder": "中联重科股份有限公司",
                "brand": "凯泉",
                "priceExcludingTax": 35963,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 40638,
                "isWinning": false
              }
            ],
            "winningBid": {
              "bidder": "威乐(中国)水泵系统有限公司",
              "price": 40573,
              "date": "2024-03-15"
            },
            "historicalPrices": [
              {
                "projectName": "西部污水处理厂项目",
                "winningPrice": 37094,
                "changeRate": 9.4,
                "winningBidder": "中联重科股份有限公司"
              },
              {
                "projectName": "北部水质净化中心",
                "winningPrice": 39643,
                "changeRate": 2.3,
                "winningBidder": "格兰富泵业（上海）有限公司"
              },
              {
                "projectName": "市政污水厂扩建工程",
                "winningPrice": 38051,
                "changeRate": 6.6,
                "winningBidder": "格兰富泵业（上海）有限公司"
              }
            ]
          },
          {
            "id": "m103",
            "stageId": "s5",
            "name": "液位计",
            "specification": "测量范围0～4m，介质：柠檬酸，输出信号4～20mA",
            "unit": "套",
            "bids": [
              {
                "bidder": "三一重工股份有限公司",
                "brand": "ABB",
                "priceExcludingTax": 59175,
                "taxRate": 13,
                "note": "原厂正品，质保3年",
                "priceIncludingTax": 66867,
                "isWinning": false
              },
              {
                "bidder": "威乐(中国)水泵系统有限公司",
                "brand": "丹麦APV",
                "priceExcludingTax": 53862,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 60864,
                "isWinning": false
              },
              {
                "bidder": "格兰富泵业（上海）有限公司",
                "brand": "凯泉",
                "priceExcludingTax": 65808,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 74363,
                "isWinning": false
              },
              {
                "bidder": "中联重科股份有限公司",
                "brand": "威乐",
                "priceExcludingTax": 55944,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 63216,
                "isWinning": true
              }
            ],
            "winningBid": {
              "bidder": "中联重科股份有限公司",
              "price": 63216,
              "date": "2024-03-15"
            },
            "historicalPrices": [
              {
                "projectName": "西部污水处理厂项目",
                "winningPrice": 60419,
                "changeRate": 4.6,
                "winningBidder": "三一重工股份有限公司"
              },
              {
                "projectName": "北部水质净化中心",
                "winningPrice": 57643,
                "changeRate": 9.7,
                "winningBidder": "格兰富泵业（上海）有限公司"
              },
              {
                "projectName": "市政污水厂扩建工程",
                "winningPrice": 72055,
                "changeRate": -12.3,
                "winningBidder": "威乐(中国)水泵系统有限公司"
              }
            ]
          },
          {
            "id": "m104",
            "stageId": "s5",
            "name": "电磁流量计",
            "specification": "DN50，量程0～10m3/h，四氟衬里，钛电极，输出信号4～20mA，1.0MPa，分体式",
            "unit": "套",
            "bids": [
              {
                "bidder": "格兰富泵业（上海）有限公司",
                "brand": "格兰富",
                "priceExcludingTax": 61588,
                "taxRate": 13,
                "note": "原厂正品，质保3年",
                "priceIncludingTax": 69594,
                "isWinning": true
              },
              {
                "bidder": "凯泉泵业集团有限公司",
                "brand": "施耐德",
                "priceExcludingTax": 63621,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 71891,
                "isWinning": false
              },
              {
                "bidder": "东方电气集团",
                "brand": "ABB",
                "priceExcludingTax": 72152,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 81531,
                "isWinning": false
              },
              {
                "bidder": "西门子（中国）有限公司",
                "brand": "施耐德",
                "priceExcludingTax": 70018,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 79120,
                "isWinning": false
              }
            ],
            "winningBid": {
              "bidder": "格兰富泵业（上海）有限公司",
              "price": 69594,
              "date": "2024-03-15"
            },
            "historicalPrices": [
              {
                "projectName": "西部污水处理厂项目",
                "winningPrice": 63133,
                "changeRate": 10.2,
                "winningBidder": "凯泉泵业集团有限公司"
              },
              {
                "projectName": "北部水质净化中心",
                "winningPrice": 75214,
                "changeRate": -7.5,
                "winningBidder": "西门子（中国）有限公司"
              },
              {
                "projectName": "市政污水厂扩建工程",
                "winningPrice": 76246,
                "changeRate": -8.7,
                "winningBidder": "东方电气集团"
              }
            ]
          },
          {
            "id": "m105",
            "stageId": "s5",
            "name": "电磁流量计",
            "specification": "DN50，量程0～10m3/h，四氟衬里，钽电极，输出信号4～20mA，1.0MPa，分体式",
            "unit": "套",
            "bids": [
              {
                "bidder": "碧水源科技股份有限公司",
                "brand": "ABB",
                "priceExcludingTax": 110736,
                "taxRate": 13,
                "note": "原厂正品，质保3年",
                "priceIncludingTax": 125131,
                "isWinning": false
              },
              {
                "bidder": "西门子（中国）有限公司",
                "brand": "西门子",
                "priceExcludingTax": 89209,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 100806,
                "isWinning": false
              },
              {
                "bidder": "格兰富泵业（上海）有限公司",
                "brand": "施耐德",
                "priceExcludingTax": 86529,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 97777,
                "isWinning": true
              },
              {
                "bidder": "赛莱默（中国）有限公司",
                "brand": "施耐德",
                "priceExcludingTax": 108612,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 122731,
                "isWinning": false
              }
            ],
            "winningBid": {
              "bidder": "格兰富泵业（上海）有限公司",
              "price": 97777,
              "date": "2024-03-15"
            },
            "historicalPrices": [
              {
                "projectName": "西部污水处理厂项目",
                "winningPrice": 92694,
                "changeRate": 5.5,
                "winningBidder": "西门子（中国）有限公司"
              },
              {
                "projectName": "北部水质净化中心",
                "winningPrice": 92415,
                "changeRate": 5.8,
                "winningBidder": "西门子（中国）有限公司"
              },
              {
                "projectName": "市政污水厂扩建工程",
                "winningPrice": 83942,
                "changeRate": 16.5,
                "winningBidder": "碧水源科技股份有限公司"
              }
            ]
          },
          {
            "id": "m106",
            "stageId": "s5",
            "name": "电磁流量计",
            "specification": "DN150，量程0～100m3/h，橡胶衬里,不锈钢电极，输出信号4～20mA，1.0MPa，分体式",
            "unit": "台",
            "bids": [
              {
                "bidder": "西门子（中国）有限公司",
                "brand": "丹麦APV",
                "priceExcludingTax": 72051,
                "taxRate": 13,
                "note": "原厂正品，质保3年",
                "priceIncludingTax": 81417,
                "isWinning": false
              },
              {
                "bidder": "ABB（中国）有限公司",
                "brand": "连成",
                "priceExcludingTax": 77125,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 87151,
                "isWinning": false
              },
              {
                "bidder": "威乐(中国)水泵系统有限公司",
                "brand": "ABB",
                "priceExcludingTax": 75319,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 85110,
                "isWinning": true
              },
              {
                "bidder": "施耐德电气（中国）有限公司",
                "brand": "威乐",
                "priceExcludingTax": 75610,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 85439,
                "isWinning": false
              }
            ],
            "winningBid": {
              "bidder": "威乐(中国)水泵系统有限公司",
              "price": 85110,
              "date": "2024-03-15"
            },
            "historicalPrices": [
              {
                "projectName": "西部污水处理厂项目",
                "winningPrice": 78975,
                "changeRate": 7.8,
                "winningBidder": "施耐德电气（中国）有限公司"
              },
              {
                "projectName": "北部水质净化中心",
                "winningPrice": 75261,
                "changeRate": 13.1,
                "winningBidder": "威乐(中国)水泵系统有限公司"
              },
              {
                "projectName": "市政污水厂扩建工程",
                "winningPrice": 78162,
                "changeRate": 8.9,
                "winningBidder": "ABB（中国）有限公司"
              }
            ]
          },
          {
            "id": "m107",
            "stageId": "s5",
            "name": "普通压力表",
            "specification": "0~1.0MPa",
            "unit": "个",
            "bids": [
              {
                "bidder": "格兰富泵业（上海）有限公司",
                "brand": "连成",
                "priceExcludingTax": 79195,
                "taxRate": 13,
                "note": "原厂正品，质保3年",
                "priceIncludingTax": 89490,
                "isWinning": true
              },
              {
                "bidder": "施耐德电气（中国）有限公司",
                "brand": "碧水源",
                "priceExcludingTax": 89205,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 100801,
                "isWinning": false
              },
              {
                "bidder": "威乐(中国)水泵系统有限公司",
                "brand": "KSB",
                "priceExcludingTax": 83330,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 94162,
                "isWinning": false
              },
              {
                "bidder": "上海连成（集团）有限公司",
                "brand": "施耐德",
                "priceExcludingTax": 75874,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 85737,
                "isWinning": false
              }
            ],
            "winningBid": {
              "bidder": "格兰富泵业（上海）有限公司",
              "price": 89490,
              "date": "2024-03-15"
            },
            "historicalPrices": [
              {
                "projectName": "西部污水处理厂项目",
                "winningPrice": 96563,
                "changeRate": -7.3,
                "winningBidder": "格兰富泵业（上海）有限公司"
              },
              {
                "projectName": "北部水质净化中心",
                "winningPrice": 91261,
                "changeRate": -1.9,
                "winningBidder": "上海连成（集团）有限公司"
              },
              {
                "projectName": "市政污水厂扩建工程",
                "winningPrice": 84496,
                "changeRate": 5.9,
                "winningBidder": "威乐(中国)水泵系统有限公司"
              }
            ]
          },
          {
            "id": "m108",
            "stageId": "s5",
            "name": "浮球液位计",
            "specification": "0~1m",
            "unit": "个",
            "bids": [
              {
                "bidder": "格兰富泵业（上海）有限公司",
                "brand": "凯泉",
                "priceExcludingTax": 106300,
                "taxRate": 13,
                "note": "原厂正品，质保3年",
                "priceIncludingTax": 120118,
                "isWinning": false
              },
              {
                "bidder": "威乐(中国)水泵系统有限公司",
                "brand": "丹麦APV",
                "priceExcludingTax": 93679,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 105857,
                "isWinning": false
              },
              {
                "bidder": "ABB（中国）有限公司",
                "brand": "ABB",
                "priceExcludingTax": 75815,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 85670,
                "isWinning": true
              },
              {
                "bidder": "赛莱默（中国）有限公司",
                "brand": "连成",
                "priceExcludingTax": 107855,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 121876,
                "isWinning": false
              }
            ],
            "winningBid": {
              "bidder": "ABB（中国）有限公司",
              "price": 85670,
              "date": "2024-03-15"
            },
            "historicalPrices": [
              {
                "projectName": "西部污水处理厂项目",
                "winningPrice": 79120,
                "changeRate": 8.3,
                "winningBidder": "ABB（中国）有限公司"
              },
              {
                "projectName": "北部水质净化中心",
                "winningPrice": 89892,
                "changeRate": -4.7,
                "winningBidder": "格兰富泵业（上海）有限公司"
              },
              {
                "projectName": "市政污水厂扩建工程",
                "winningPrice": 89037,
                "changeRate": -3.8,
                "winningBidder": "格兰富泵业（上海）有限公司"
              }
            ]
          },
          {
            "id": "m109",
            "stageId": "s5",
            "name": "低压进线柜",
            "specification": "1000(宽)*2200(高)*1000(深)，MNS",
            "unit": "台",
            "bids": [
              {
                "bidder": "赛莱默（中国）有限公司",
                "brand": "碧水源",
                "priceExcludingTax": 68028,
                "taxRate": 13,
                "note": "原厂正品，质保3年",
                "priceIncludingTax": 76871,
                "isWinning": false
              },
              {
                "bidder": "格兰富泵业（上海）有限公司",
                "brand": "碧水源",
                "priceExcludingTax": 65403,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 73905,
                "isWinning": true
              },
              {
                "bidder": "威乐(中国)水泵系统有限公司",
                "brand": "西门子",
                "priceExcludingTax": 72439,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 81856,
                "isWinning": false
              },
              {
                "bidder": "三一重工股份有限公司",
                "brand": "凯泉",
                "priceExcludingTax": 75676,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 85513,
                "isWinning": false
              }
            ],
            "winningBid": {
              "bidder": "格兰富泵业（上海）有限公司",
              "price": 73905,
              "date": "2024-03-15"
            },
            "historicalPrices": [
              {
                "projectName": "西部污水处理厂项目",
                "winningPrice": 75083,
                "changeRate": -1.6,
                "winningBidder": "三一重工股份有限公司"
              },
              {
                "projectName": "北部水质净化中心",
                "winningPrice": 84980,
                "changeRate": -13,
                "winningBidder": "三一重工股份有限公司"
              },
              {
                "projectName": "市政污水厂扩建工程",
                "winningPrice": 68270,
                "changeRate": 8.3,
                "winningBidder": "赛莱默（中国）有限公司"
              }
            ]
          },
          {
            "id": "m110",
            "stageId": "s5",
            "name": "低压母联柜",
            "specification": "1000(宽)*2200(高)*1000(深)，MNS",
            "unit": "台",
            "bids": [
              {
                "bidder": "碧水源科技股份有限公司",
                "brand": "施耐德",
                "priceExcludingTax": 51428,
                "taxRate": 13,
                "note": "原厂正品，质保3年",
                "priceIncludingTax": 58113,
                "isWinning": true
              },
              {
                "bidder": "东方电气集团",
                "brand": "连成",
                "priceExcludingTax": 59380,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 67099,
                "isWinning": false
              },
              {
                "bidder": "施耐德电气（中国）有限公司",
                "brand": "威乐",
                "priceExcludingTax": 58926,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 66586,
                "isWinning": false
              },
              {
                "bidder": "凯泉泵业集团有限公司",
                "brand": "丹麦APV",
                "priceExcludingTax": 68363,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 77250,
                "isWinning": false
              }
            ],
            "winningBid": {
              "bidder": "碧水源科技股份有限公司",
              "price": 58113,
              "date": "2024-03-15"
            },
            "historicalPrices": [
              {
                "projectName": "西部污水处理厂项目",
                "winningPrice": 56613,
                "changeRate": 2.6,
                "winningBidder": "碧水源科技股份有限公司"
              },
              {
                "projectName": "北部水质净化中心",
                "winningPrice": 62448,
                "changeRate": -6.9,
                "winningBidder": "施耐德电气（中国）有限公司"
              },
              {
                "projectName": "市政污水厂扩建工程",
                "winningPrice": 58460,
                "changeRate": -0.6,
                "winningBidder": "凯泉泵业集团有限公司"
              }
            ]
          },
          {
            "id": "m111",
            "stageId": "s5",
            "name": "有源滤波柜",
            "specification": "200A",
            "unit": "台",
            "bids": [
              {
                "bidder": "赛莱默（中国）有限公司",
                "brand": "连成",
                "priceExcludingTax": 46545,
                "taxRate": 13,
                "note": "原厂正品，质保3年",
                "priceIncludingTax": 52595,
                "isWinning": true
              },
              {
                "bidder": "施耐德电气（中国）有限公司",
                "brand": "丹麦APV",
                "priceExcludingTax": 47626,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 53817,
                "isWinning": false
              },
              {
                "bidder": "威乐(中国)水泵系统有限公司",
                "brand": "西门子",
                "priceExcludingTax": 49023,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 55395,
                "isWinning": false
              },
              {
                "bidder": "凯泉泵业集团有限公司",
                "brand": "施耐德",
                "priceExcludingTax": 55079,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 62239,
                "isWinning": false
              }
            ],
            "winningBid": {
              "bidder": "赛莱默（中国）有限公司",
              "price": 52595,
              "date": "2024-03-15"
            },
            "historicalPrices": [
              {
                "projectName": "西部污水处理厂项目",
                "winningPrice": 57117,
                "changeRate": -7.9,
                "winningBidder": "凯泉泵业集团有限公司"
              },
              {
                "projectName": "北部水质净化中心",
                "winningPrice": 57575,
                "changeRate": -8.6,
                "winningBidder": "凯泉泵业集团有限公司"
              },
              {
                "projectName": "市政污水厂扩建工程",
                "winningPrice": 53166,
                "changeRate": -1.1,
                "winningBidder": "凯泉泵业集团有限公司"
              }
            ]
          },
          {
            "id": "m112",
            "stageId": "s5",
            "name": "产水泵变频控制柜",
            "specification": "800(宽)*2200(高)*1000(深)，MNS",
            "unit": "台",
            "bids": [
              {
                "bidder": "碧水源科技股份有限公司",
                "brand": "施耐德",
                "priceExcludingTax": 56493,
                "taxRate": 13,
                "note": "原厂正品，质保3年",
                "priceIncludingTax": 63837,
                "isWinning": false
              },
              {
                "bidder": "格兰富泵业（上海）有限公司",
                "brand": "KSB",
                "priceExcludingTax": 50218,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 56746,
                "isWinning": false
              },
              {
                "bidder": "威乐(中国)水泵系统有限公司",
                "brand": "KSB",
                "priceExcludingTax": 41410,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 46793,
                "isWinning": true
              },
              {
                "bidder": "中联重科股份有限公司",
                "brand": "施耐德",
                "priceExcludingTax": 49225,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 55624,
                "isWinning": false
              }
            ],
            "winningBid": {
              "bidder": "威乐(中国)水泵系统有限公司",
              "price": 46793,
              "date": "2024-03-15"
            },
            "historicalPrices": [
              {
                "projectName": "西部污水处理厂项目",
                "winningPrice": 40988,
                "changeRate": 14.2,
                "winningBidder": "中联重科股份有限公司"
              },
              {
                "projectName": "北部水质净化中心",
                "winningPrice": 51640,
                "changeRate": -9.4,
                "winningBidder": "威乐(中国)水泵系统有限公司"
              },
              {
                "projectName": "市政污水厂扩建工程",
                "winningPrice": 52412,
                "changeRate": -10.7,
                "winningBidder": "碧水源科技股份有限公司"
              }
            ]
          },
          {
            "id": "m113",
            "stageId": "s5",
            "name": "污泥回流泵变频控制柜",
            "specification": "800(宽)*2200(高)*1000(深)，MNS",
            "unit": "台",
            "bids": [
              {
                "bidder": "格兰富泵业（上海）有限公司",
                "brand": "KSB",
                "priceExcludingTax": 32036,
                "taxRate": 13,
                "note": "原厂正品，质保3年",
                "priceIncludingTax": 36200,
                "isWinning": false
              },
              {
                "bidder": "上海连成（集团）有限公司",
                "brand": "格兰富",
                "priceExcludingTax": 23227,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 26246,
                "isWinning": true
              },
              {
                "bidder": "威乐(中国)水泵系统有限公司",
                "brand": "西门子",
                "priceExcludingTax": 31231,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 35291,
                "isWinning": false
              },
              {
                "bidder": "中联重科股份有限公司",
                "brand": "凯泉",
                "priceExcludingTax": 30070,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 33979,
                "isWinning": false
              }
            ],
            "winningBid": {
              "bidder": "上海连成（集团）有限公司",
              "price": 26246,
              "date": "2024-03-15"
            },
            "historicalPrices": [
              {
                "projectName": "西部污水处理厂项目",
                "winningPrice": 29517,
                "changeRate": -11.1,
                "winningBidder": "威乐(中国)水泵系统有限公司"
              },
              {
                "projectName": "北部水质净化中心",
                "winningPrice": 28685,
                "changeRate": -8.5,
                "winningBidder": "格兰富泵业（上海）有限公司"
              },
              {
                "projectName": "市政污水厂扩建工程",
                "winningPrice": 24871,
                "changeRate": 5.5,
                "winningBidder": "格兰富泵业（上海）有限公司"
              }
            ]
          },
          {
            "id": "m114",
            "stageId": "s5",
            "name": "CIP泵变频控制柜",
            "specification": "800(宽)*2200(高)*1000(深)，MNS",
            "unit": "台",
            "bids": [
              {
                "bidder": "格兰富泵业（上海）有限公司",
                "brand": "西门子",
                "priceExcludingTax": 30969,
                "taxRate": 13,
                "note": "原厂正品，质保3年",
                "priceIncludingTax": 34994,
                "isWinning": false
              },
              {
                "bidder": "西门子（中国）有限公司",
                "brand": "凯泉",
                "priceExcludingTax": 29702,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 33563,
                "isWinning": false
              },
              {
                "bidder": "施耐德电气（中国）有限公司",
                "brand": "威乐",
                "priceExcludingTax": 30602,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 34580,
                "isWinning": true
              },
              {
                "bidder": "威乐(中国)水泵系统有限公司",
                "brand": "施耐德",
                "priceExcludingTax": 31469,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 35559,
                "isWinning": false
              }
            ],
            "winningBid": {
              "bidder": "施耐德电气（中国）有限公司",
              "price": 34580,
              "date": "2024-03-15"
            },
            "historicalPrices": [
              {
                "projectName": "西部污水处理厂项目",
                "winningPrice": 37112,
                "changeRate": -6.8,
                "winningBidder": "西门子（中国）有限公司"
              },
              {
                "projectName": "北部水质净化中心",
                "winningPrice": 35256,
                "changeRate": -1.9,
                "winningBidder": "西门子（中国）有限公司"
              },
              {
                "projectName": "市政污水厂扩建工程",
                "winningPrice": 29847,
                "changeRate": 15.9,
                "winningBidder": "格兰富泵业（上海）有限公司"
              }
            ]
          },
          {
            "id": "m115",
            "stageId": "s5",
            "name": "加药泵变频控制柜",
            "specification": "800(宽)*2200(高)*1000(深)，MNS",
            "unit": "台",
            "bids": [
              {
                "bidder": "三一重工股份有限公司",
                "brand": "西门子",
                "priceExcludingTax": 26710,
                "taxRate": 13,
                "note": "原厂正品，质保3年",
                "priceIncludingTax": 30182,
                "isWinning": true
              },
              {
                "bidder": "威乐(中国)水泵系统有限公司",
                "brand": "格兰富",
                "priceExcludingTax": 27190,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 30724,
                "isWinning": false
              },
              {
                "bidder": "上海连成（集团）有限公司",
                "brand": "连成",
                "priceExcludingTax": 20412,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 23065,
                "isWinning": false
              },
              {
                "bidder": "格兰富泵业（上海）有限公司",
                "brand": "西门子",
                "priceExcludingTax": 28517,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 32224,
                "isWinning": false
              }
            ],
            "winningBid": {
              "bidder": "三一重工股份有限公司",
              "price": 30182,
              "date": "2024-03-15"
            },
            "historicalPrices": [
              {
                "projectName": "西部污水处理厂项目",
                "winningPrice": 29809,
                "changeRate": 1.3,
                "winningBidder": "威乐(中国)水泵系统有限公司"
              },
              {
                "projectName": "北部水质净化中心",
                "winningPrice": 32834,
                "changeRate": -8.1,
                "winningBidder": "威乐(中国)水泵系统有限公司"
              },
              {
                "projectName": "市政污水厂扩建工程",
                "winningPrice": 31262,
                "changeRate": -3.5,
                "winningBidder": "上海连成（集团）有限公司"
              }
            ]
          },
          {
            "id": "m116",
            "stageId": "s5",
            "name": "低压电气柜",
            "specification": "800(宽)*2200(高)*1000(深)，MNS",
            "unit": "台",
            "bids": [
              {
                "bidder": "施耐德电气（中国）有限公司",
                "brand": "ABB",
                "priceExcludingTax": 69171,
                "taxRate": 13,
                "note": "原厂正品，质保3年",
                "priceIncludingTax": 78163,
                "isWinning": true
              },
              {
                "bidder": "中联重科股份有限公司",
                "brand": "凯泉",
                "priceExcludingTax": 91974,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 103930,
                "isWinning": false
              },
              {
                "bidder": "东方电气集团",
                "brand": "ABB",
                "priceExcludingTax": 74918,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 84657,
                "isWinning": false
              },
              {
                "bidder": "上海连成（集团）有限公司",
                "brand": "凯泉",
                "priceExcludingTax": 82915,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 93693,
                "isWinning": false
              }
            ],
            "winningBid": {
              "bidder": "施耐德电气（中国）有限公司",
              "price": 78163,
              "date": "2024-03-15"
            },
            "historicalPrices": [
              {
                "projectName": "西部污水处理厂项目",
                "winningPrice": 71570,
                "changeRate": 9.2,
                "winningBidder": "施耐德电气（中国）有限公司"
              },
              {
                "projectName": "北部水质净化中心",
                "winningPrice": 86436,
                "changeRate": -9.6,
                "winningBidder": "施耐德电气（中国）有限公司"
              },
              {
                "projectName": "市政污水厂扩建工程",
                "winningPrice": 71369,
                "changeRate": 9.5,
                "winningBidder": "施耐德电气（中国）有限公司"
              }
            ]
          },
          {
            "id": "m117",
            "stageId": "s5",
            "name": "气动阀箱",
            "specification": "非标定制，不锈钢304，IP55,支架安装",
            "unit": "台",
            "bids": [
              {
                "bidder": "碧水源科技股份有限公司",
                "brand": "丹麦APV",
                "priceExcludingTax": 97140,
                "taxRate": 13,
                "note": "原厂正品，质保3年",
                "priceIncludingTax": 109768,
                "isWinning": false
              },
              {
                "bidder": "格兰富泵业（上海）有限公司",
                "brand": "格兰富",
                "priceExcludingTax": 97784,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 110495,
                "isWinning": false
              },
              {
                "bidder": "赛莱默（中国）有限公司",
                "brand": "威乐",
                "priceExcludingTax": 88613,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 100132,
                "isWinning": false
              },
              {
                "bidder": "三一重工股份有限公司",
                "brand": "KSB",
                "priceExcludingTax": 83006,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 93796,
                "isWinning": true
              }
            ],
            "winningBid": {
              "bidder": "三一重工股份有限公司",
              "price": 93796,
              "date": "2024-03-15"
            },
            "historicalPrices": [
              {
                "projectName": "西部污水处理厂项目",
                "winningPrice": 85033,
                "changeRate": 10.3,
                "winningBidder": "赛莱默（中国）有限公司"
              },
              {
                "projectName": "北部水质净化中心",
                "winningPrice": 88191,
                "changeRate": 6.4,
                "winningBidder": "三一重工股份有限公司"
              },
              {
                "projectName": "市政污水厂扩建工程",
                "winningPrice": 102284,
                "changeRate": -8.3,
                "winningBidder": "三一重工股份有限公司"
              }
            ]
          },
          {
            "id": "m118",
            "stageId": "s5",
            "name": "电磁阀箱",
            "specification": "非标定制，不锈钢304，IP55,支架安装",
            "unit": "台",
            "bids": [
              {
                "bidder": "格兰富泵业（上海）有限公司",
                "brand": "ABB",
                "priceExcludingTax": 43156,
                "taxRate": 13,
                "note": "原厂正品，质保3年",
                "priceIncludingTax": 48766,
                "isWinning": false
              },
              {
                "bidder": "威乐(中国)水泵系统有限公司",
                "brand": "碧水源",
                "priceExcludingTax": 42281,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 47777,
                "isWinning": false
              },
              {
                "bidder": "凯泉泵业集团有限公司",
                "brand": "凯泉",
                "priceExcludingTax": 42164,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 47645,
                "isWinning": false
              },
              {
                "bidder": "西门子（中国）有限公司",
                "brand": "ABB",
                "priceExcludingTax": 38828,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 43875,
                "isWinning": true
              }
            ],
            "winningBid": {
              "bidder": "西门子（中国）有限公司",
              "price": 43875,
              "date": "2024-03-15"
            },
            "historicalPrices": [
              {
                "projectName": "西部污水处理厂项目",
                "winningPrice": 48199,
                "changeRate": -9,
                "winningBidder": "威乐(中国)水泵系统有限公司"
              },
              {
                "projectName": "北部水质净化中心",
                "winningPrice": 45599,
                "changeRate": -3.8,
                "winningBidder": "威乐(中国)水泵系统有限公司"
              },
              {
                "projectName": "市政污水厂扩建工程",
                "winningPrice": 49410,
                "changeRate": -11.2,
                "winningBidder": "格兰富泵业（上海）有限公司"
              }
            ]
          },
          {
            "id": "m119",
            "stageId": "s5",
            "name": "排水泵现场控制箱",
            "specification": "非标定制，不锈钢304，IP55,壁挂安装",
            "unit": "台",
            "bids": [
              {
                "bidder": "西门子（中国）有限公司",
                "brand": "西门子",
                "priceExcludingTax": 34322,
                "taxRate": 13,
                "note": "原厂正品，质保3年",
                "priceIncludingTax": 38783,
                "isWinning": false
              },
              {
                "bidder": "三一重工股份有限公司",
                "brand": "丹麦APV",
                "priceExcludingTax": 32300,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 36499,
                "isWinning": false
              },
              {
                "bidder": "上海连成（集团）有限公司",
                "brand": "西门子",
                "priceExcludingTax": 26130,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 29526,
                "isWinning": true
              },
              {
                "bidder": "凯泉泵业集团有限公司",
                "brand": "ABB",
                "priceExcludingTax": 28369,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 32056,
                "isWinning": false
              }
            ],
            "winningBid": {
              "bidder": "上海连成（集团）有限公司",
              "price": 29526,
              "date": "2024-03-15"
            },
            "historicalPrices": [
              {
                "projectName": "西部污水处理厂项目",
                "winningPrice": 30574,
                "changeRate": -3.4,
                "winningBidder": "上海连成（集团）有限公司"
              },
              {
                "projectName": "北部水质净化中心",
                "winningPrice": 27704,
                "changeRate": 6.6,
                "winningBidder": "三一重工股份有限公司"
              },
              {
                "projectName": "市政污水厂扩建工程",
                "winningPrice": 29201,
                "changeRate": 1.1,
                "winningBidder": "上海连成（集团）有限公司"
              }
            ]
          },
          {
            "id": "m120",
            "stageId": "s5",
            "name": "化料器控制箱",
            "specification": "工艺成套提供",
            "unit": "台",
            "bids": [
              {
                "bidder": "上海连成（集团）有限公司",
                "brand": "碧水源",
                "priceExcludingTax": 24665,
                "taxRate": 13,
                "note": "原厂正品，质保3年",
                "priceIncludingTax": 27871,
                "isWinning": false
              },
              {
                "bidder": "西门子（中国）有限公司",
                "brand": "碧水源",
                "priceExcludingTax": 27339,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 30893,
                "isWinning": false
              },
              {
                "bidder": "威乐(中国)水泵系统有限公司",
                "brand": "施耐德",
                "priceExcludingTax": 27325,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 30877,
                "isWinning": false
              },
              {
                "bidder": "ABB（中国）有限公司",
                "brand": "格兰富",
                "priceExcludingTax": 23161,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 26171,
                "isWinning": true
              }
            ],
            "winningBid": {
              "bidder": "ABB（中国）有限公司",
              "price": 26171,
              "date": "2024-03-15"
            },
            "historicalPrices": [
              {
                "projectName": "西部污水处理厂项目",
                "winningPrice": 25845,
                "changeRate": 1.3,
                "winningBidder": "ABB（中国）有限公司"
              },
              {
                "projectName": "北部水质净化中心",
                "winningPrice": 28074,
                "changeRate": -6.8,
                "winningBidder": "威乐(中国)水泵系统有限公司"
              },
              {
                "projectName": "市政污水厂扩建工程",
                "winningPrice": 28201,
                "changeRate": -7.2,
                "winningBidder": "上海连成（集团）有限公司"
              }
            ]
          },
          {
            "id": "m121",
            "stageId": "s5",
            "name": "电动单梁悬挂起重机开关箱",
            "specification": "工艺成套提供",
            "unit": "台",
            "bids": [
              {
                "bidder": "凯泉泵业集团有限公司",
                "brand": "格兰富",
                "priceExcludingTax": 70957,
                "taxRate": 13,
                "note": "原厂正品，质保3年",
                "priceIncludingTax": 80181,
                "isWinning": false
              },
              {
                "bidder": "三一重工股份有限公司",
                "brand": "丹麦APV",
                "priceExcludingTax": 67060,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 75777,
                "isWinning": false
              },
              {
                "bidder": "碧水源科技股份有限公司",
                "brand": "施耐德",
                "priceExcludingTax": 53584,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 60549,
                "isWinning": false
              },
              {
                "bidder": "上海连成（集团）有限公司",
                "brand": "连成",
                "priceExcludingTax": 58363,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 65950,
                "isWinning": true
              }
            ],
            "winningBid": {
              "bidder": "上海连成（集团）有限公司",
              "price": 65950,
              "date": "2024-03-15"
            },
            "historicalPrices": [
              {
                "projectName": "西部污水处理厂项目",
                "winningPrice": 62145,
                "changeRate": 6.1,
                "winningBidder": "凯泉泵业集团有限公司"
              },
              {
                "projectName": "北部水质净化中心",
                "winningPrice": 60433,
                "changeRate": 9.1,
                "winningBidder": "凯泉泵业集团有限公司"
              },
              {
                "projectName": "市政污水厂扩建工程",
                "winningPrice": 73033,
                "changeRate": -9.7,
                "winningBidder": "三一重工股份有限公司"
              }
            ]
          },
          {
            "id": "m122",
            "stageId": "s5",
            "name": "电动葫芦开关箱",
            "specification": "工艺成套提供",
            "unit": "台",
            "bids": [
              {
                "bidder": "凯泉泵业集团有限公司",
                "brand": "格兰富",
                "priceExcludingTax": 72912,
                "taxRate": 13,
                "note": "原厂正品，质保3年",
                "priceIncludingTax": 82390,
                "isWinning": false
              },
              {
                "bidder": "东方电气集团",
                "brand": "碧水源",
                "priceExcludingTax": 67307,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 76056,
                "isWinning": true
              },
              {
                "bidder": "ABB（中国）有限公司",
                "brand": "丹麦APV",
                "priceExcludingTax": 90471,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 102232,
                "isWinning": false
              },
              {
                "bidder": "威乐(中国)水泵系统有限公司",
                "brand": "碧水源",
                "priceExcludingTax": 91498,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 103392,
                "isWinning": false
              }
            ],
            "winningBid": {
              "bidder": "东方电气集团",
              "price": 76056,
              "date": "2024-03-15"
            },
            "historicalPrices": [
              {
                "projectName": "西部污水处理厂项目",
                "winningPrice": 65196,
                "changeRate": 16.7,
                "winningBidder": "凯泉泵业集团有限公司"
              },
              {
                "projectName": "北部水质净化中心",
                "winningPrice": 73676,
                "changeRate": 3.2,
                "winningBidder": "ABB（中国）有限公司"
              },
              {
                "projectName": "市政污水厂扩建工程",
                "winningPrice": 75433,
                "changeRate": 0.8,
                "winningBidder": "ABB（中国）有限公司"
              }
            ]
          },
          {
            "id": "m123",
            "stageId": "s5",
            "name": "动力配电箱",
            "specification": "非标定制，不锈钢304，IP55,支架安装",
            "unit": "台",
            "bids": [
              {
                "bidder": "格兰富泵业（上海）有限公司",
                "brand": "丹麦APV",
                "priceExcludingTax": 20594,
                "taxRate": 13,
                "note": "原厂正品，质保3年",
                "priceIncludingTax": 23271,
                "isWinning": false
              },
              {
                "bidder": "凯泉泵业集团有限公司",
                "brand": "施耐德",
                "priceExcludingTax": 17378,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 19637,
                "isWinning": true
              },
              {
                "bidder": "施耐德电气（中国）有限公司",
                "brand": "连成",
                "priceExcludingTax": 20134,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 22751,
                "isWinning": false
              },
              {
                "bidder": "上海连成（集团）有限公司",
                "brand": "格兰富",
                "priceExcludingTax": 22912,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 25890,
                "isWinning": false
              }
            ],
            "winningBid": {
              "bidder": "凯泉泵业集团有限公司",
              "price": 19637,
              "date": "2024-03-15"
            },
            "historicalPrices": [
              {
                "projectName": "西部污水处理厂项目",
                "winningPrice": 19955,
                "changeRate": -1.6,
                "winningBidder": "格兰富泵业（上海）有限公司"
              },
              {
                "projectName": "北部水质净化中心",
                "winningPrice": 20371,
                "changeRate": -3.6,
                "winningBidder": "施耐德电气（中国）有限公司"
              },
              {
                "projectName": "市政污水厂扩建工程",
                "winningPrice": 18373,
                "changeRate": 6.9,
                "winningBidder": "格兰富泵业（上海）有限公司"
              }
            ]
          },
          {
            "id": "m124",
            "stageId": "s5",
            "name": "产水泵现场按钮箱",
            "specification": "非标定制，不锈钢304，IP55,支架安装",
            "unit": "台",
            "bids": [
              {
                "bidder": "东方电气集团",
                "brand": "威乐",
                "priceExcludingTax": 79009,
                "taxRate": 13,
                "note": "原厂正品，质保3年",
                "priceIncludingTax": 89280,
                "isWinning": true
              },
              {
                "bidder": "上海连成（集团）有限公司",
                "brand": "碧水源",
                "priceExcludingTax": 80910,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 91428,
                "isWinning": false
              },
              {
                "bidder": "中联重科股份有限公司",
                "brand": "碧水源",
                "priceExcludingTax": 84859,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 95890,
                "isWinning": false
              },
              {
                "bidder": "碧水源科技股份有限公司",
                "brand": "西门子",
                "priceExcludingTax": 74230,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 83879,
                "isWinning": false
              }
            ],
            "winningBid": {
              "bidder": "东方电气集团",
              "price": 89280,
              "date": "2024-03-15"
            },
            "historicalPrices": [
              {
                "projectName": "西部污水处理厂项目",
                "winningPrice": 96159,
                "changeRate": -7.2,
                "winningBidder": "上海连成（集团）有限公司"
              },
              {
                "projectName": "北部水质净化中心",
                "winningPrice": 95001,
                "changeRate": -6,
                "winningBidder": "东方电气集团"
              },
              {
                "projectName": "市政污水厂扩建工程",
                "winningPrice": 100641,
                "changeRate": -11.3,
                "winningBidder": "中联重科股份有限公司"
              }
            ]
          },
          {
            "id": "m125",
            "stageId": "s5",
            "name": "CIP泵现场按钮箱",
            "specification": "非标定制，不锈钢304，IP55,支架安装",
            "unit": "台",
            "bids": [
              {
                "bidder": "施耐德电气（中国）有限公司",
                "brand": "连成",
                "priceExcludingTax": 66963,
                "taxRate": 13,
                "note": "原厂正品，质保3年",
                "priceIncludingTax": 75668,
                "isWinning": true
              },
              {
                "bidder": "东方电气集团",
                "brand": "丹麦APV",
                "priceExcludingTax": 88201,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 99667,
                "isWinning": false
              },
              {
                "bidder": "西门子（中国）有限公司",
                "brand": "施耐德",
                "priceExcludingTax": 99077,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 111957,
                "isWinning": false
              },
              {
                "bidder": "碧水源科技股份有限公司",
                "brand": "碧水源",
                "priceExcludingTax": 83630,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 94501,
                "isWinning": false
              }
            ],
            "winningBid": {
              "bidder": "施耐德电气（中国）有限公司",
              "price": 75668,
              "date": "2024-03-15"
            },
            "historicalPrices": [
              {
                "projectName": "西部污水处理厂项目",
                "winningPrice": 70961,
                "changeRate": 6.6,
                "winningBidder": "西门子（中国）有限公司"
              },
              {
                "projectName": "北部水质净化中心",
                "winningPrice": 74546,
                "changeRate": 1.5,
                "winningBidder": "东方电气集团"
              },
              {
                "projectName": "市政污水厂扩建工程",
                "winningPrice": 72416,
                "changeRate": 4.5,
                "winningBidder": "碧水源科技股份有限公司"
              }
            ]
          },
          {
            "id": "m126",
            "stageId": "s5",
            "name": "剩余污泥泵现场按钮箱",
            "specification": "非标定制，不锈钢304，IP55,支架安装",
            "unit": "台",
            "bids": [
              {
                "bidder": "上海连成（集团）有限公司",
                "brand": "碧水源",
                "priceExcludingTax": 62143,
                "taxRate": 13,
                "note": "原厂正品，质保3年",
                "priceIncludingTax": 70221,
                "isWinning": false
              },
              {
                "bidder": "三一重工股份有限公司",
                "brand": "施耐德",
                "priceExcludingTax": 47105,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 53228,
                "isWinning": true
              },
              {
                "bidder": "施耐德电气（中国）有限公司",
                "brand": "凯泉",
                "priceExcludingTax": 61552,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 69553,
                "isWinning": false
              },
              {
                "bidder": "凯泉泵业集团有限公司",
                "brand": "凯泉",
                "priceExcludingTax": 48433,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 54729,
                "isWinning": false
              }
            ],
            "winningBid": {
              "bidder": "三一重工股份有限公司",
              "price": 53228,
              "date": "2024-03-15"
            },
            "historicalPrices": [
              {
                "projectName": "西部污水处理厂项目",
                "winningPrice": 56164,
                "changeRate": -5.2,
                "winningBidder": "施耐德电气（中国）有限公司"
              },
              {
                "projectName": "北部水质净化中心",
                "winningPrice": 55661,
                "changeRate": -4.4,
                "winningBidder": "凯泉泵业集团有限公司"
              },
              {
                "projectName": "市政污水厂扩建工程",
                "winningPrice": 47522,
                "changeRate": 12,
                "winningBidder": "凯泉泵业集团有限公司"
              }
            ]
          },
          {
            "id": "m127",
            "stageId": "s5",
            "name": "真空泵现场按钮箱",
            "specification": "非标定制，不锈钢304，IP55,支架安装",
            "unit": "台",
            "bids": [
              {
                "bidder": "上海连成（集团）有限公司",
                "brand": "丹麦APV",
                "priceExcludingTax": 96887,
                "taxRate": 13,
                "note": "原厂正品，质保3年",
                "priceIncludingTax": 109482,
                "isWinning": false
              },
              {
                "bidder": "东方电气集团",
                "brand": "碧水源",
                "priceExcludingTax": 69854,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 78935,
                "isWinning": true
              },
              {
                "bidder": "西门子（中国）有限公司",
                "brand": "西门子",
                "priceExcludingTax": 78059,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 88206,
                "isWinning": false
              },
              {
                "bidder": "施耐德电气（中国）有限公司",
                "brand": "西门子",
                "priceExcludingTax": 82583,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 93318,
                "isWinning": false
              }
            ],
            "winningBid": {
              "bidder": "东方电气集团",
              "price": 78935,
              "date": "2024-03-15"
            },
            "historicalPrices": [
              {
                "projectName": "西部污水处理厂项目",
                "winningPrice": 88838,
                "changeRate": -11.1,
                "winningBidder": "上海连成（集团）有限公司"
              },
              {
                "projectName": "北部水质净化中心",
                "winningPrice": 84065,
                "changeRate": -6.1,
                "winningBidder": "施耐德电气（中国）有限公司"
              },
              {
                "projectName": "市政污水厂扩建工程",
                "winningPrice": 83024,
                "changeRate": -4.9,
                "winningBidder": "西门子（中国）有限公司"
              }
            ]
          },
          {
            "id": "m128",
            "stageId": "s5",
            "name": "污泥回流泵按钮箱",
            "specification": "非标定制，不锈钢304，IP55,支架安装",
            "unit": "台",
            "bids": [
              {
                "bidder": "格兰富泵业（上海）有限公司",
                "brand": "格兰富",
                "priceExcludingTax": 66092,
                "taxRate": 13,
                "note": "原厂正品，质保3年",
                "priceIncludingTax": 74683,
                "isWinning": false
              },
              {
                "bidder": "威乐(中国)水泵系统有限公司",
                "brand": "连成",
                "priceExcludingTax": 65013,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 73464,
                "isWinning": false
              },
              {
                "bidder": "ABB（中国）有限公司",
                "brand": "碧水源",
                "priceExcludingTax": 58444,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 66041,
                "isWinning": true
              },
              {
                "bidder": "碧水源科技股份有限公司",
                "brand": "丹麦APV",
                "priceExcludingTax": 57045,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 64460,
                "isWinning": false
              }
            ],
            "winningBid": {
              "bidder": "ABB（中国）有限公司",
              "price": 66041,
              "date": "2024-03-15"
            },
            "historicalPrices": [
              {
                "projectName": "西部污水处理厂项目",
                "winningPrice": 71180,
                "changeRate": -7.2,
                "winningBidder": "格兰富泵业（上海）有限公司"
              },
              {
                "projectName": "北部水质净化中心",
                "winningPrice": 70825,
                "changeRate": -6.8,
                "winningBidder": "ABB（中国）有限公司"
              },
              {
                "projectName": "市政污水厂扩建工程",
                "winningPrice": 72105,
                "changeRate": -8.4,
                "winningBidder": "威乐(中国)水泵系统有限公司"
              }
            ]
          },
          {
            "id": "m129",
            "stageId": "s5",
            "name": "污泥回流泵接线盒",
            "specification": "非标定制，不锈钢304，IP55,支架安装",
            "unit": "台",
            "bids": [
              {
                "bidder": "威乐(中国)水泵系统有限公司",
                "brand": "连成",
                "priceExcludingTax": 42120,
                "taxRate": 13,
                "note": "原厂正品，质保3年",
                "priceIncludingTax": 47595,
                "isWinning": false
              },
              {
                "bidder": "西门子（中国）有限公司",
                "brand": "连成",
                "priceExcludingTax": 46039,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 52024,
                "isWinning": false
              },
              {
                "bidder": "三一重工股份有限公司",
                "brand": "格兰富",
                "priceExcludingTax": 38214,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 43181,
                "isWinning": false
              },
              {
                "bidder": "赛莱默（中国）有限公司",
                "brand": "凯泉",
                "priceExcludingTax": 32881,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 37155,
                "isWinning": true
              }
            ],
            "winningBid": {
              "bidder": "赛莱默（中国）有限公司",
              "price": 37155,
              "date": "2024-03-15"
            },
            "historicalPrices": [
              {
                "projectName": "西部污水处理厂项目",
                "winningPrice": 37604,
                "changeRate": -1.2,
                "winningBidder": "三一重工股份有限公司"
              },
              {
                "projectName": "北部水质净化中心",
                "winningPrice": 36540,
                "changeRate": 1.7,
                "winningBidder": "威乐(中国)水泵系统有限公司"
              },
              {
                "projectName": "市政污水厂扩建工程",
                "winningPrice": 32928,
                "changeRate": 12.8,
                "winningBidder": "三一重工股份有限公司"
              }
            ]
          },
          {
            "id": "m130",
            "stageId": "s5",
            "name": "膜车间主站PLCA",
            "specification": "",
            "unit": "套",
            "bids": [
              {
                "bidder": "中联重科股份有限公司",
                "brand": "格兰富",
                "priceExcludingTax": 67839,
                "taxRate": 13,
                "note": "原厂正品，质保3年",
                "priceIncludingTax": 76658,
                "isWinning": true
              },
              {
                "bidder": "东方电气集团",
                "brand": "格兰富",
                "priceExcludingTax": 93418,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 105562,
                "isWinning": false
              },
              {
                "bidder": "西门子（中国）有限公司",
                "brand": "碧水源",
                "priceExcludingTax": 77447,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 87515,
                "isWinning": false
              },
              {
                "bidder": "碧水源科技股份有限公司",
                "brand": "威乐",
                "priceExcludingTax": 85671,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 96808,
                "isWinning": false
              }
            ],
            "winningBid": {
              "bidder": "中联重科股份有限公司",
              "price": 76658,
              "date": "2024-03-15"
            },
            "historicalPrices": [
              {
                "projectName": "西部污水处理厂项目",
                "winningPrice": 73801,
                "changeRate": 3.9,
                "winningBidder": "西门子（中国）有限公司"
              },
              {
                "projectName": "北部水质净化中心",
                "winningPrice": 79835,
                "changeRate": -4,
                "winningBidder": "西门子（中国）有限公司"
              },
              {
                "projectName": "市政污水厂扩建工程",
                "winningPrice": 78222,
                "changeRate": -2,
                "winningBidder": "西门子（中国）有限公司"
              }
            ]
          },
          {
            "id": "m131",
            "stageId": "s5",
            "name": "膜车间远程站PLCA.1-膜车间远程站PLCA.4",
            "specification": "",
            "unit": "套",
            "bids": [
              {
                "bidder": "碧水源科技股份有限公司",
                "brand": "ABB",
                "priceExcludingTax": 49140,
                "taxRate": 13,
                "note": "原厂正品，质保3年",
                "priceIncludingTax": 55528,
                "isWinning": false
              },
              {
                "bidder": "上海连成（集团）有限公司",
                "brand": "威乐",
                "priceExcludingTax": 35825,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 40482,
                "isWinning": true
              },
              {
                "bidder": "三一重工股份有限公司",
                "brand": "KSB",
                "priceExcludingTax": 47937,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 54168,
                "isWinning": false
              },
              {
                "bidder": "ABB（中国）有限公司",
                "brand": "西门子",
                "priceExcludingTax": 39461,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 44590,
                "isWinning": false
              }
            ],
            "winningBid": {
              "bidder": "上海连成（集团）有限公司",
              "price": 40482,
              "date": "2024-03-15"
            },
            "historicalPrices": [
              {
                "projectName": "西部污水处理厂项目",
                "winningPrice": 42567,
                "changeRate": -4.9,
                "winningBidder": "碧水源科技股份有限公司"
              },
              {
                "projectName": "北部水质净化中心",
                "winningPrice": 38756,
                "changeRate": 4.5,
                "winningBidder": "三一重工股份有限公司"
              },
              {
                "projectName": "市政污水厂扩建工程",
                "winningPrice": 39640,
                "changeRate": 2.1,
                "winningBidder": "ABB（中国）有限公司"
              }
            ]
          },
          {
            "id": "m132",
            "stageId": "s5",
            "name": "交换机",
            "specification": "",
            "unit": "个",
            "bids": [
              {
                "bidder": "西门子（中国）有限公司",
                "brand": "西门子",
                "priceExcludingTax": 41377,
                "taxRate": 13,
                "note": "原厂正品，质保3年",
                "priceIncludingTax": 46756,
                "isWinning": false
              },
              {
                "bidder": "施耐德电气（中国）有限公司",
                "brand": "KSB",
                "priceExcludingTax": 46917,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 53016,
                "isWinning": false
              },
              {
                "bidder": "三一重工股份有限公司",
                "brand": "格兰富",
                "priceExcludingTax": 41240,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 46601,
                "isWinning": true
              },
              {
                "bidder": "上海连成（集团）有限公司",
                "brand": "凯泉",
                "priceExcludingTax": 51511,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 58207,
                "isWinning": false
              }
            ],
            "winningBid": {
              "bidder": "三一重工股份有限公司",
              "price": 46601,
              "date": "2024-03-15"
            },
            "historicalPrices": [
              {
                "projectName": "西部污水处理厂项目",
                "winningPrice": 50150,
                "changeRate": -7.1,
                "winningBidder": "施耐德电气（中国）有限公司"
              },
              {
                "projectName": "北部水质净化中心",
                "winningPrice": 50255,
                "changeRate": -7.3,
                "winningBidder": "三一重工股份有限公司"
              },
              {
                "projectName": "市政污水厂扩建工程",
                "winningPrice": 50316,
                "changeRate": -7.4,
                "winningBidder": "上海连成（集团）有限公司"
              }
            ]
          },
          {
            "id": "m133",
            "stageId": "s5",
            "name": "膜控制系统软件编制",
            "specification": "",
            "unit": "项",
            "bids": [
              {
                "bidder": "威乐(中国)水泵系统有限公司",
                "brand": "丹麦APV",
                "priceExcludingTax": 44763,
                "taxRate": 13,
                "note": "原厂正品，质保3年",
                "priceIncludingTax": 50582,
                "isWinning": true
              },
              {
                "bidder": "东方电气集团",
                "brand": "丹麦APV",
                "priceExcludingTax": 64710,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 73122,
                "isWinning": false
              },
              {
                "bidder": "ABB（中国）有限公司",
                "brand": "KSB",
                "priceExcludingTax": 54537,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 61626,
                "isWinning": false
              },
              {
                "bidder": "上海连成（集团）有限公司",
                "brand": "格兰富",
                "priceExcludingTax": 49393,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 55814,
                "isWinning": false
              }
            ],
            "winningBid": {
              "bidder": "威乐(中国)水泵系统有限公司",
              "price": 50582,
              "date": "2024-03-15"
            },
            "historicalPrices": [
              {
                "projectName": "西部污水处理厂项目",
                "winningPrice": 49837,
                "changeRate": 1.5,
                "winningBidder": "东方电气集团"
              },
              {
                "projectName": "北部水质净化中心",
                "winningPrice": 53266,
                "changeRate": -5,
                "winningBidder": "ABB（中国）有限公司"
              },
              {
                "projectName": "市政污水厂扩建工程",
                "winningPrice": 53244,
                "changeRate": -5,
                "winningBidder": "上海连成（集团）有限公司"
              }
            ]
          },
          {
            "id": "m134",
            "stageId": "s5",
            "name": "膜控制系统现场调试服务",
            "specification": "",
            "unit": "项",
            "bids": [
              {
                "bidder": "格兰富泵业（上海）有限公司",
                "brand": "西门子",
                "priceExcludingTax": 86210,
                "taxRate": 13,
                "note": "原厂正品，质保3年",
                "priceIncludingTax": 97417,
                "isWinning": false
              },
              {
                "bidder": "三一重工股份有限公司",
                "brand": "丹麦APV",
                "priceExcludingTax": 86521,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 97768,
                "isWinning": false
              },
              {
                "bidder": "威乐(中国)水泵系统有限公司",
                "brand": "威乐",
                "priceExcludingTax": 78571,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 88785,
                "isWinning": true
              },
              {
                "bidder": "凯泉泵业集团有限公司",
                "brand": "连成",
                "priceExcludingTax": 88123,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 99578,
                "isWinning": false
              }
            ],
            "winningBid": {
              "bidder": "威乐(中国)水泵系统有限公司",
              "price": 88785,
              "date": "2024-03-15"
            },
            "historicalPrices": [
              {
                "projectName": "西部污水处理厂项目",
                "winningPrice": 91383,
                "changeRate": -2.8,
                "winningBidder": "威乐(中国)水泵系统有限公司"
              },
              {
                "projectName": "北部水质净化中心",
                "winningPrice": 80065,
                "changeRate": 10.9,
                "winningBidder": "格兰富泵业（上海）有限公司"
              },
              {
                "projectName": "市政污水厂扩建工程",
                "winningPrice": 82574,
                "changeRate": 7.5,
                "winningBidder": "格兰富泵业（上海）有限公司"
              }
            ]
          },
          {
            "id": "m135",
            "stageId": "s5",
            "name": "仪表保护箱",
            "specification": "",
            "unit": "个",
            "bids": [
              {
                "bidder": "三一重工股份有限公司",
                "brand": "凯泉",
                "priceExcludingTax": 42750,
                "taxRate": 13,
                "note": "原厂正品，质保3年",
                "priceIncludingTax": 48307,
                "isWinning": false
              },
              {
                "bidder": "威乐(中国)水泵系统有限公司",
                "brand": "ABB",
                "priceExcludingTax": 41403,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 46785,
                "isWinning": false
              },
              {
                "bidder": "碧水源科技股份有限公司",
                "brand": "格兰富",
                "priceExcludingTax": 38874,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 43927,
                "isWinning": true
              },
              {
                "bidder": "赛莱默（中国）有限公司",
                "brand": "格兰富",
                "priceExcludingTax": 39450,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 44578,
                "isWinning": false
              }
            ],
            "winningBid": {
              "bidder": "碧水源科技股份有限公司",
              "price": 43927,
              "date": "2024-03-15"
            },
            "historicalPrices": [
              {
                "projectName": "西部污水处理厂项目",
                "winningPrice": 40378,
                "changeRate": 8.8,
                "winningBidder": "威乐(中国)水泵系统有限公司"
              },
              {
                "projectName": "北部水质净化中心",
                "winningPrice": 47965,
                "changeRate": -8.4,
                "winningBidder": "威乐(中国)水泵系统有限公司"
              },
              {
                "projectName": "市政污水厂扩建工程",
                "winningPrice": 41624,
                "changeRate": 5.5,
                "winningBidder": "威乐(中国)水泵系统有限公司"
              }
            ]
          },
          {
            "id": "m136",
            "stageId": "s5",
            "name": "安装",
            "specification": "工艺设备、电气设备、仪表、阀门安装，工艺管道、电缆等材料及安装",
            "unit": "项",
            "bids": [
              {
                "bidder": "格兰富泵业（上海）有限公司",
                "brand": "连成",
                "priceExcludingTax": 94235,
                "taxRate": 13,
                "note": "原厂正品，质保3年",
                "priceIncludingTax": 106485,
                "isWinning": false
              },
              {
                "bidder": "三一重工股份有限公司",
                "brand": "丹麦APV",
                "priceExcludingTax": 96190,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 108694,
                "isWinning": false
              },
              {
                "bidder": "东方电气集团",
                "brand": "丹麦APV",
                "priceExcludingTax": 106621,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 120481,
                "isWinning": false
              },
              {
                "bidder": "上海连成（集团）有限公司",
                "brand": "ABB",
                "priceExcludingTax": 85775,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 96925,
                "isWinning": true
              }
            ],
            "winningBid": {
              "bidder": "上海连成（集团）有限公司",
              "price": 96925,
              "date": "2024-03-15"
            },
            "historicalPrices": [
              {
                "projectName": "西部污水处理厂项目",
                "winningPrice": 88543,
                "changeRate": 9.5,
                "winningBidder": "三一重工股份有限公司"
              },
              {
                "projectName": "北部水质净化中心",
                "winningPrice": 86609,
                "changeRate": 11.9,
                "winningBidder": "格兰富泵业（上海）有限公司"
              },
              {
                "projectName": "市政污水厂扩建工程",
                "winningPrice": 103922,
                "changeRate": -6.7,
                "winningBidder": "格兰富泵业（上海）有限公司"
              }
            ]
          }
        ]
      },
      {
        "id": "s6",
        "projectId": "p1",
        "name": "精确曝气系统及配套设备",
        "materials": []
      }
    ]
  },
  {
    "id": "p2",
    "name": "东部水质净化厂",
    "stages": [
      {
        "id": "s2-1",
        "projectId": "p2",
        "name": "进水泵房",
        "materials": []
      }
    ]
  },
  {
    "id": "p3",
    "name": "西部污水处理厂项目",
    "stages": [
      {
        "id": "s3-1",
        "projectId": "p3",
        "name": "提升泵及配套设备",
        "materials": [
          {
            "id": "m-p3-1",
            "stageId": "s3-1",
            "name": "提升水泵",
            "specification": "潜污泵，Q=2083m3/h，H=9.5m，N=75kW，带变频控制、导轨及自耦系统",
            "unit": "台",
            "bids": [
              {
                "bidder": "赛莱默（中国）有限公司",
                "brand": "赛莱默",
                "priceExcludingTax": 392840,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 443908,
                "isWinning": true
              },
              {
                "bidder": "格兰富泵业（上海）有限公司",
                "brand": "格兰富",
                "priceExcludingTax": 405230,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 457910,
                "isWinning": false
              }
            ],
            "winningBid": {
              "bidder": "赛莱默（中国）有限公司",
              "price": 443908,
              "date": "2024-02-20"
            },
            "historicalPrices": [
              {
                "projectName": "北部水质净化中心",
                "winningPrice": 522077,
                "changeRate": -15,
                "winningBidder": "赛莱默（中国）有限公司"
              },
              {
                "projectName": "南站水厂项目",
                "winningPrice": 501888,
                "changeRate": -11.5,
                "winningBidder": "中联重科股份有限公司"
              },
              {
                "projectName": "市政污水厂扩建工程",
                "winningPrice": 570910,
                "changeRate": -22.2,
                "winningBidder": "上海连成（集团）有限公司"
              }
            ]
          },
          {
            "id": "m-p3-2",
            "stageId": "s3-1",
            "name": "提升水泵",
            "specification": "潜污泵，Q=1041m3/h，H=9.5m，N=37kW，带变频控制、导轨及自耦系统",
            "unit": "台",
            "bids": [
              {
                "bidder": "施耐德电气（中国）有限公司",
                "brand": "施耐德",
                "priceExcludingTax": 295623,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 334054,
                "isWinning": true
              }
            ],
            "winningBid": {
              "bidder": "施耐德电气（中国）有限公司",
              "price": 334054,
              "date": "2024-02-20"
            },
            "historicalPrices": [
              {
                "projectName": "北部水质净化中心",
                "winningPrice": 303779,
                "changeRate": 9.9,
                "winningBidder": "上海连成（集团）有限公司"
              },
              {
                "projectName": "市政污水厂扩建工程",
                "winningPrice": 372713,
                "changeRate": -10.4,
                "winningBidder": "施耐德电气（中国）有限公司"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "p4",
    "name": "北部水质净化中心",
    "stages": [
      {
        "id": "s4-1",
        "projectId": "p4",
        "name": "提升泵及配套设备",
        "materials": [
          {
            "id": "m-p4-1",
            "stageId": "s4-1",
            "name": "提升水泵",
            "specification": "潜污泵，Q=2083m3/h，H=9.5m，N=75kW，带变频控制、导轨及自耦系统",
            "unit": "台",
            "bids": [
              {
                "bidder": "赛莱默（中国）有限公司",
                "brand": "赛莱默",
                "priceExcludingTax": 462017,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 522077,
                "isWinning": true
              },
              {
                "bidder": "上海连成（集团）有限公司",
                "brand": "连成",
                "priceExcludingTax": 491200,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 555056,
                "isWinning": false
              }
            ],
            "winningBid": {
              "bidder": "赛莱默（中国）有限公司",
              "price": 522077,
              "date": "2024-01-15"
            },
            "historicalPrices": [
              {
                "projectName": "西部污水处理厂项目",
                "winningPrice": 443908,
                "changeRate": 17.6,
                "winningBidder": "赛莱默（中国）有限公司"
              },
              {
                "projectName": "南站水厂项目",
                "winningPrice": 501888,
                "changeRate": 4,
                "winningBidder": "中联重科股份有限公司"
              },
              {
                "projectName": "市政污水厂扩建工程",
                "winningPrice": 570910,
                "changeRate": -8.6,
                "winningBidder": "上海连成（集团）有限公司"
              }
            ]
          },
          {
            "id": "m-p4-2",
            "stageId": "s4-1",
            "name": "提升水泵",
            "specification": "潜污泵，Q=1041m3/h，H=9.5m，N=37kW，带变频控制、导轨及自耦系统",
            "unit": "台",
            "bids": [
              {
                "bidder": "上海连成（集团）有限公司",
                "brand": "连成",
                "priceExcludingTax": 268831,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 303779,
                "isWinning": true
              }
            ],
            "winningBid": {
              "bidder": "上海连成（集团）有限公司",
              "price": 303779,
              "date": "2024-01-15"
            },
            "historicalPrices": [
              {
                "projectName": "西部污水处理厂项目",
                "winningPrice": 334054,
                "changeRate": -9.1,
                "winningBidder": "施耐德电气（中国）有限公司"
              },
              {
                "projectName": "市政污水厂扩建工程",
                "winningPrice": 372713,
                "changeRate": -18.5,
                "winningBidder": "施耐德电气（中国）有限公司"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "p5",
    "name": "市政污水厂扩建工程",
    "stages": [
      {
        "id": "s5-1",
        "projectId": "p5",
        "name": "提升泵及配套设备",
        "materials": [
          {
            "id": "m-p5-1",
            "stageId": "s5-1",
            "name": "提升水泵",
            "specification": "潜污泵，Q=2083m3/h，H=9.5m，N=75kW，带变频控制、导轨及自耦系统",
            "unit": "台",
            "bids": [
              {
                "bidder": "上海连成（集团）有限公司",
                "brand": "连成",
                "priceExcludingTax": 505230,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 570910,
                "isWinning": true
              },
              {
                "bidder": "ABB（中国）有限公司",
                "brand": "ABB",
                "priceExcludingTax": 522450,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 590368,
                "isWinning": false
              }
            ],
            "winningBid": {
              "bidder": "上海连成（集团）有限公司",
              "price": 570910,
              "date": "2023-12-10"
            },
            "historicalPrices": [
              {
                "projectName": "西部污水处理厂项目",
                "winningPrice": 443908,
                "changeRate": 28.6,
                "winningBidder": "赛莱默（中国）有限公司"
              },
              {
                "projectName": "北部水质净化中心",
                "winningPrice": 522077,
                "changeRate": 9.3,
                "winningBidder": "赛莱默（中国）有限公司"
              },
              {
                "projectName": "南站水厂项目",
                "winningPrice": 501888,
                "changeRate": 13.8,
                "winningBidder": "中联重科股份有限公司"
              }
            ]
          },
          {
            "id": "m-p5-2",
            "stageId": "s5-1",
            "name": "提升水泵",
            "specification": "潜污泵，Q=1041m3/h，H=9.5m，N=37kW，带变频控制、导轨及自耦系统",
            "unit": "台",
            "bids": [
              {
                "bidder": "施耐德电气（中国）有限公司",
                "brand": "施耐德",
                "priceExcludingTax": 329923,
                "taxRate": 13,
                "note": "",
                "priceIncludingTax": 372713,
                "isWinning": true
              }
            ],
            "winningBid": {
              "bidder": "施耐德电气（中国）有限公司",
              "price": 372713,
              "date": "2023-12-10"
            },
            "historicalPrices": [
              {
                "projectName": "西部污水处理厂项目",
                "winningPrice": 334054,
                "changeRate": 11.6,
                "winningBidder": "施耐德电气（中国）有限公司"
              },
              {
                "projectName": "北部水质净化中心",
                "winningPrice": 303779,
                "changeRate": 22.7,
                "winningBidder": "上海连成（集团）有限公司"
              }
            ]
          }
        ]
      }
    ]
  }
]

// ============ 树形数据转换（用于 el-tree） ============
export const buildTreeData = () => {
  return purchaseProjects.map(project => ({
    id: project.id,
    name: project.name,
    type: 'project',
    children: project.stages.map(stage => ({
      id: stage.id,
      name: stage.name,
      type: 'stage',
      children: stage.materials ? stage.materials.map(material => ({
        id: material.id,
        name: material.name,
        type: 'material',
        data: material
      })) : []
    }))
  }))
}

// ============ 根据ID查找材料 ============
export const findMaterialById = (materialId) => {
  for (const project of purchaseProjects) {
    for (const stage of project.stages) {
      if (!stage.materials) continue;
      const material = stage.materials.find(m => m.id === materialId)
      if (material) {
        return {
          ...material,
          projectName: project.name,
          stageName: stage.name
        }
      }
    }
  }
  return null
}

// 导出默认树形数据
export const defaultTreeData = buildTreeData()

// ============ 根据项目ID和材料信息查找材料 ============
export const findMaterialInProjectById = (projectId, materialName, specification) => {
  const project = purchaseProjects.find(p => p.id === projectId)
  if (!project) return null

  for (const stage of project.stages) {
    if (!stage.materials) continue
    const material = stage.materials.find(m =>
      m.name === materialName && m.specification === specification
    )
    if (material) {
      return {
        ...material,
        projectName: project.name,
        stageName: stage.name
      }
    }
  }
  return null
}

// ============ 获取所有项目的基本信息 ============
export const getAllProjectsInfo = () => {
  return purchaseProjects.map(p => ({
    id: p.id,
    name: p.name,
    stageCount: p.stages.length,
    materialCount: p.stages.reduce((sum, s) => sum + (s.materials?.length || 0), 0)
  }))
}

// ============ 通过项目名称和材料信息查找材料ID ============
export const findMaterialIdByProjectName = (projectName, materialName, specification) => {
  const project = purchaseProjects.find(p => p.name === projectName)
  if (!project) return null

  for (const stage of project.stages) {
    if (!stage.materials) continue
    const material = stage.materials.find(m =>
      m.name === materialName && m.specification === specification
    )
    if (material) {
      return {
        projectId: project.id,
        stageId: stage.id,
        materialId: material.id
      }
    }
  }
  return null
}
