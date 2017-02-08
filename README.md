# 高雄市公有零售市場交易價格查詢
本專案預計呈現各類食品交易價格變化，未來預計結合其他相關資訊（天氣、天災、進口數量等）觀察其變化關係

### 資料蒐集
資料來源：[http://edbkcg.kcg.gov.tw/prices](http://edbkcg.kcg.gov.tw/prices)
蒐集範圍：2014-01-01 ~ 2016-12-31

### 運行方式
 -   安裝 python 2.7
 -   安裝 pip
 -   `pip install -r requirements.txt`
 -   `python Crawler.py 2017-01-01`
 -   批次搜集(Linux & Mac)
    - 參考 2014-2016.sh 建立檔案
    - `sh 2014-2016.sh`
