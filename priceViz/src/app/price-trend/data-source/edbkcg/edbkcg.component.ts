import {ChartDataService} from '../../chart/chart-data.service';
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

  constructor(private http: Http,private chartDataService:ChartDataService) { }

  ngOnInit() {
    this.http.get(EDBKCGConfig.FoodURL)
      .map(data => data.json())
      .subscribe(data => {
        this.foods = data;
      })

    this.http.get(EDBKCGConfig.MarketURL)
      .map(data => data.json())
      .subscribe(data => {
        // this.markets = ["平均價格"].concat(data);
        this.markets = data;
      })
  }

  private addItem() {
    // this.selectedSets.push(new EDBKCGData("","平均價格"));
    this.selectedSets.push(new EDBKCGData("",""));
  }

  private deleteItem(index) {
    this.selectedSets.splice(index, 1)
    this.allData.splice(index, 1);
  }

  private onSelectChange(index) {
    
    let set = this.selectedSets[index];
    
    if(set.food==="" || set.market==="")
      return

    this.http.get( EDBKCGConfig.byFoodURL + set.food + '.csv')
    .map(data=>{
      var chart:Chart = new Chart()
      chart.y_axis = 0
      chart.data = this.csvToChartData(data['_body'], set.market)
      chart.label = set.food + "-" + set.market;
      return chart;
    })
    .subscribe(chart=>{
      this.allData[index]=chart;
      this.chartDataService.addChartDataSet("edbkcg",this.allData);
    })
  }

  private csvToChartData(csv:string, marketFilter:string){
    let chartData = {};
    csv.split("\n").splice(1).forEach((row)=>{
        let [date,market,price] = row.split(",",3)
        chartData[date] = price
    });
    
    return chartData;
  }

}
