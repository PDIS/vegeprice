#!/usr/bin/env python
#coding: utf8
import httplib
import datetime
import urllib
import json
import os.path
import sys
from bs4 import BeautifulSoup

def getDataTable():
    params = urllib.urlencode({'yy': int(DATE.split("-")[0])-1911, 'mm': DATE.split("-")[1], 'dd': DATE.split("-")[2]})
    httpClient = httplib.HTTPConnection('edbkcg.kcg.gov.tw', 80, timeout=30)
    headers = {"Content-type": "application/x-www-form-urlencoded"}
    httpClient.request('POST', '/prices/market.qd1.php', params, headers)
    response = httpClient.getresponse()
    httpClient.close()
    soup = BeautifulSoup(response.read().decode('big5').encode('utf8'), "lxml")
    print soup.find_all('table')[1]
    table_data = [[cell.text for cell in row("td")] for row in soup.find_all('table')[2]("tr")]
    return table_data

def saveData(dataRow):
    food = dataRow[0]
    filename = FOLDER + "/" + food + ".json"
    dataArray = []

    if os.path.exists(filename):
        with open(filename, "r") as jsonFile:
            try: 
                dataArray = json.load(jsonFile)
            except ValueError: 
                dataArray = []
        
    with open(filename, "w+") as jsonFile:
        for idx, price in enumerate(dataRow[1:]):
            record = {}
            record['date'] = DATE
            record['market'] = MARKETS[idx+1]
            record['price'] = price
            record['timestamp'] = int(datetime.datetime.strptime(DATE, '%Y-%m-%d').strftime('%s'))
            dataArray.append(record)
        jsonFile.write(json.dumps(dataArray, ensure_ascii=False).encode('utf8'))

MARKETS = []
FOODTYPE = ""
DATE = sys.argv[1]
FOLDER = "vegeprice"
DATATABLE = getDataTable()
MARKETS = DATATABLE[0]

for row in DATATABLE:
    # 略過每個市場標頭
    if u"跳到" in row[0] or len(row) == 0:
        continue
    # 抓出大種類
    elif len(row) == 1:
        foodType = row[0].strip()
    # 真正的資料內容
    else:
        saveData(row)
