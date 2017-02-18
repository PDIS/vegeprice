start=2013
end=2016

offset=1

while [ $start -le $end ]
do
  python Crawler.py $start
  start=$((start+offset))
done