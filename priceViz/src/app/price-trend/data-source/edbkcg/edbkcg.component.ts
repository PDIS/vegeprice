import { ChartDataService } from '../../chart/chart-data.service';
import { Chart } from './../../chart/chart';
import { EDBKCGConfig } from './edbkcg.config';
import { Http } from '@angular/http/src/http';
import { EDBKCGData } from './edbkcg.data';
import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash'

@Component({
  selector: 'app-edbkcg',
  templateUrl: './edbkcg.component.html',
  styleUrls: ['./edbkcg.component.scss']
})
export class EdbkcgComponent implements OnInit {

  selectedSets: Array<EDBKCGData> = []
  foods: Array<string> = []
  markets: Array<string> = []
  allData: Array<Chart> = []

  constructor(private http: Http, private chartDataService: ChartDataService) { }

  ngOnInit() {
    this.http.get(EDBKCGConfig.FoodURL)
      .map(data => data.json())
      .subscribe(data => {
        this.foods = data;
      })

    this.http.get(EDBKCGConfig.MarketURL)
      .map(data => data.json())
      .subscribe(data => {
        this.markets = ["平均價格", "中位價格"].concat(data);
        // this.markets = data;
      })
  }

  private addItem() {
    this.selectedSets.push(new EDBKCGData("", "平均價格"));
    // this.selectedSets.push(new EDBKCGData("", ""));
  }

  private deleteItem(index) {
    this.selectedSets.splice(index, 1)
    this.allData.splice(index, 1);
  }

  private onSelectChange(index) {

    let set = this.selectedSets[index];

    if (set.food === "" || set.market === "")
      return

    this.http.get(EDBKCGConfig.byFoodURL + set.food + '.csv')
      .map(data => {
        var chart: Chart = new Chart()
        chart.y_axis = 0
        chart.data = this.csvToChartData(data['_body'], set.market)
        chart.label = set.food + "-" + set.market;
        return chart;
      })
      .subscribe(chart => {
        this.allData[index] = chart;
        this.chartDataService.addChartDataSet("edbkcg", this.allData);
      })
  }

  private csvToChartData(csv: string, marketFilter: string) {
    let chartData = {};
    let tmpData = []
    csv.split("\n").splice(1).forEach((row) => {
      let [date, market, price] = row.split(",", 3)
      tmpData.push({ date: date, market: market, price: price })
    });

    if (marketFilter === "平均價格") {
      // group by same date
      let groupByDate = _.groupBy(tmpData, function (a) { return a['date'] })
      // foreach date compute avg
      Object.keys(groupByDate).forEach((date) => {
        // fetch field price, cast to int and filter NaN 
        let priceList = _.chain(groupByDate[date])
          .map((record) => parseInt(record['price']))
          .filter(price => price > 0)
          .value()
        chartData[date] = _.mean(priceList);
      })
    }
    else if (marketFilter === "中位價格") {
      // group by same date
      let groupByDate = _.groupBy(tmpData, function (a) { return a['date'] })
      // foreach date compute avg
      Object.keys(groupByDate).forEach((date) => {
        // fetch field price, cast to int and filter NaN 
        let priceList = _.chain(groupByDate[date])
          .map((record) => parseInt(record['price']))
          .filter(price => price > 0)
          .value()
        if (priceList.length !== 0) {
          chartData[date] = priceList[Math.ceil(priceList.length/2)]
        }
      })
    }
    else {
      tmpData.forEach(data => {
        if (data['market'] === marketFilter) {
          chartData[data['date']] = parseInt(data['price'])
        }
      })
    }

    console.log(chartData)

    return chartData;
  }

}
