startdate=2013-01-01
enddate=2016-12-31

sDateTs=`date -j -f "%Y-%m-%d" $startdate "+%s"`
eDateTs=`date -j -f "%Y-%m-%d" $enddate "+%s"`
dateTs=$sDateTs
offset=86400

while [ "$dateTs" -le "$eDateTs" ]
do
  date=`date -j -f "%s" $dateTs "+%Y-%m-%d"`
  python Crawler.py $date
  dateTs=$(($dateTs+$offset))
done