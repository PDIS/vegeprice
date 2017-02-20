#!/usr/bin/env python
#coding: utf8
import httplib
import urllib
import os.path
import json
import sys
from bs4 import BeautifulSoup

def checkFolder():
    if not os.path.exists(FOLDER):
        os.makedirs(FOLDER)
    if not os.path.exists(FOLDER + "/byDate/"):
        os.makedirs(FOLDER + "/byDate/")
    if not os.path.exists(FOLDER + "/byFood/"):
        os.makedirs(FOLDER + "/byFood/")

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

def saveDataByFood():
    for row in DATATABLE:
        # 略過每個市場標頭
        if u"跳到" in row[0] or len(row) == 0:
            continue
        # 抓出大種類(但目前沒有用到)
        elif len(row) == 1:
            # foodType = row[0].strip()
            continue
        # 真正的資料內容
        else:
            saveDataByFoodRow(row)

def saveDataByFoodRow(dataRow):
    food = dataRow[0]
    FOODS.append(food)
    filename = FOLDER + "/byFood/" + food + ".csv"
    if not os.path.exists(filename):
        with open(filename, "a") as csvFile:
            csvFile.write("日期,市場,價格\n")

    dataArray = []
    with open(filename, "a") as csvFile:
        for idx, price in enumerate(dataRow[1:]):
            dataArray.append(("%s,%s,%s" % (DATE, MARKETS[idx], price.replace(",", ""))).encode('utf8'))
        csvFile.write("\n".join(dataArray)+"\n")

def saveDataByDate():
    filename = FOLDER + "/byDate/" + DATE + ".csv"
    with open(filename, "w") as csvFile:
        csvFile.write("食物,"+",".join(MARKETS).encode('utf8')+"\n")
        for row in DATATABLE:
            # 略過每個市場標頭
            if u"跳到" in row[0] or len(row) == 0:
                continue
            # 抓出大種類(但目前沒有用到)
            elif len(row) == 1:
                # foodType = row[0].strip()
                continue
            # 真正的資料內容
            else:
                csvFile.write(",".join([price.replace(",", "") for price in row]).encode('utf8')+"\n")
                FOODS.append(row[0])

def distinctFoods():
    return list(set(FOODS))

def saveFoods():
    filename = FOLDER + "/foods.json"
    with open(filename, "w") as jsonFile:
        jsonFile.write(json.dumps(FOODS, indent=2, ensure_ascii=False).encode('utf8'))

def saveMarkkets():
    filename = FOLDER + "/markets.json"
    with open(filename, "w") as jsonFile:
        jsonFile.write(json.dumps(MARKETS, indent=2, ensure_ascii=False).encode('utf8'))

FOODTYPE = ""
DATE = sys.argv[1]
FOLDER = "."
DATATABLE = getDataTable()
MARKETS = DATATABLE[0][1:]
FOODS = []

checkFolder()
# saveDataByFood()
saveDataByDate()
saveMarkkets()
FOODS = distinctFoods()
saveFoods()
