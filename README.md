# 高雄市公有零售市場交易價格查詢

以高雄市公有零售市場交易價格為例，本專案預計呈現各類食品交易價格變化，未來預計結合農委會其他相關資訊（天氣、天災、進口數量等）觀察其變化關係，其中並嘗試以視覺化呈現模式，使批發、銷售以及可能影響事件可比對觀察

-------------

### 資料蒐集
 -  資料來源：[高雄市公有零售市場交易價格查詢](http://edbkcg.kcg.gov.tw/prices)
 -  蒐集範圍：2014-01-01 ~ 2016-12-31

-------------

### 運行方式
 -   安裝 python 2.7
 -   安裝 pip
 -   `pip install -r requirements.txt`
 -   `python Crawler.py 2017-01-01`
 -   批次搜集
    - 參考 2014-2016.sh 建立 sh or bat 檔
    - `sh 2014-2016.sh` ( Linux & Mac )
