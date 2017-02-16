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
    if not os.path.exists(FOLDER + "/byLocation/"):
        os.makedirs(FOLDER + "/byLocation/")

def loadStations(filename):
    with open(filename, "r") as jsonFile:
        return json.load(jsonFile)

def startCrawl():
    for station in STATIONS:
        body = ""
        while True:
            httpClient = httplib.HTTPConnection('www.cwb.gov.tw', 80, timeout=3000)
            httpClient.request('GET', '/V7/climate/dailyPrecipitation/Data/' + station['id'] + '_' + DATE + '.htm')
            response = httpClient.getresponse()
            httpClient.close()
            body = response.read()
            if body != "":
                break
        getDataTable(station, body)

def getDataTable(station, body):
    soup = BeautifulSoup(body, "lxml")
    table_data = [[cell.text for cell in row("td")] for row in soup.find_all('table')[1]("tr")]
    data = []
    for day, row in enumerate(table_data):
        for month, value in enumerate(row):
            if value != '' and day <= 31:
                if value == '-' or value == 'T':
                    value = 0
                data.append("%s-%02d-%02d, %s" % (DATE, month+1, day, value))
    saveData(station, data)

def saveData(station, data):
    with open(FOLDER+"/byLocation/"+station['name']+".csv", "a") as csvFile:
        csvFile.write("\n".join(data)+"\n")

DATE = sys.argv[1]
FOLDER = "."
STATIONS = []
DATATABLE = []


STATIONS = loadStations("stations.json")
checkFolder()
startCrawl()
