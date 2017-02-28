import { AMISData } from './amis.data';
import { AMISConfig } from './amis.config';
import { EDBKCGConfig } from './../edbkcg/edbkcg.config';
import { ChartDataService } from './../../chart/chart-data.service';
import { Http } from '@angular/http/src/http';
import { Component, OnInit } from '@angular/core';
import { Chart } from './../../chart/chart';

@Component({
  selector: 'app-amis',
  templateUrl: './amis.component.html',
  styleUrls: ['./amis.component.scss']
})
export class AmisComponent implements OnInit {

  constructor(private http: Http, private chartDataService: ChartDataService) { }

  selectedSets: Array<AMISData> = []
  foods: Array<string> = []
  markets: Array<string> = []
  options: Array<Object> = []
  allData: Array<Chart> = []

  ngOnInit() {
    this.http.get(AMISConfig.FoodURL)
      .map(data => data.json())
      .subscribe(data => {
        this.foods = data;
      })

    this.http.get(AMISConfig.MarketURL)
      .map(data => data.json())
      .subscribe(data => {
        this.markets = data;
      })

    this.options.push({key:'highPrice',value:'上價'})
    this.options.push({key:'midPrice',value:'中價'})
    this.options.push({key:'lowPrice',value:'下價'})
    this.options.push({key:'avgPrice',value:'均價'})
    this.options.push({key:'amount',value:'銷售量'})

  }

  private addItem() {
    this.selectedSets.push(new AMISData("", "", "amount"));
  }

  private deleteItem(index) {
    this.selectedSets.splice(index, 1)
    this.allData.splice(index, 1);
  }

  private onSelectChange(index) {

    let set = this.selectedSets[index];

    console.log(set)

    if (set.food === "" || set.market === "" || set.option === "")
      return

    this.http.get(AMISConfig.byFoodURL + set.food + '.csv')
      .map(data => {
        var chart: Chart = new Chart()
        chart.y_axis = 1
        chart.data = this.csvToChartData(data['_body'], set.market, set.option)
        chart.label = set.food + "-" + set.market + "-" + set.option;
        return chart;
      })
      .subscribe(chart => {
        this.allData[index] = chart;
        this.chartDataService.addChartDataSet("amis", this.allData);
      })
  }

  private csvToChartData(csv: string, marketFilter: string, optionFilter: string) {
    let chartData = {};
    let tmpData = []
    csv.split("\n").splice(1).forEach((row) => {
      let [date, market, highPrice, midPrice, lowPrice, avgPrice, amount] = row.split(",", 7)
      tmpData.push(
        {
          date: date,
          market: market,
          highPrice: highPrice,
          midPrice: midPrice,
          lowPrice: lowPrice,
          avgPrice: avgPrice,
          amount: amount,
        }
      )
    });

    console.table(tmpData)

    // if (marketFilter === "平均價格") {
    //   // group by same date
    //   let groupByDate = _.groupBy(tmpData, function (a) { return a['date'] })
    //   // foreach date compute avg
    //   Object.keys(groupByDate).forEach((date) => {
    //     // fetch field price, cast to int and filter NaN 
    //     let priceList = _.chain(groupByDate[date])
    //       .map((record) => parseInt(record['price']))
    //       .filter(price => price > 0)
    //       .value()
    //     chartData[date] = _.mean(priceList);
    //   })
    // }
    // else if (marketFilter === "中位價格") {
    //   // group by same date
    //   let groupByDate = _.groupBy(tmpData, function (a) { return a['date'] })
    //   // foreach date compute avg
    //   Object.keys(groupByDate).forEach((date) => {
    //     // fetch field price, cast to int and filter NaN 
    //     let priceList = _.chain(groupByDate[date])
    //       .map((record) => parseInt(record['price']))
    //       .filter(price => price > 0)
    //       .value()
    //     if (priceList.length !== 0) {
    //       chartData[date] = priceList[Math.ceil(priceList.length/2)]
    //     }
    //   })
    // }
    // else {
    tmpData.forEach(data => {
      if (data['market'] === marketFilter) {
        chartData[data['date']] = parseInt(data[optionFilter])
      }
    })
    // }

    console.log(chartData)

    return chartData;
  }

}
