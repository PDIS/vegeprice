import { ChartDataService } from './../../chart/chart-data.service';
import { Chart } from './../../chart/chart';
import 'rxjs/add/operator/map';
import { Http } from '@angular/http/src/http';
import { AfterViewChecked } from '@angular/core/src/metadata/lifecycle_hooks';
import { DoCheck } from '@angular/core/src/metadata/lifecycle_hooks';
import { Component, OnInit } from '@angular/core';
declare var $;

@Component({
  selector: 'app-cwb',
  templateUrl: './cwb.component.html',
  styleUrls: ['./cwb.component.scss']
})
export class CwbComponent implements OnInit {

  constructor(private http: Http, private chartDataService:ChartDataService) { }

  selectedItems: Array<string> = []
  stations:Array<Object> = []

  ngOnInit() {
    this.http.get('https://raw.githubusercontent.com/PDIS/vegeprice/master/cwb/stations.json')
      .map(data=>data.json())
      .subscribe(data=>{
        this.stations = data;
      })
  }

  addItem() {
    this.selectedItems.push("");
  }

  deleteItem(index) {
    this.selectedItems.splice(index, 1)
  }

  onSelectChange(station,index) {
    this.http.get('https://raw.githubusercontent.com/PDIS/vegeprice/master/cwb/byLocation/' + station + '.csv')
    .map(data=>data['_body'])
    .subscribe(data=>{
      var rows:Array<String> = data.split("\n");
      // var chartAxis = rows.map((row)=>row.split(",")[0])
      // var chartData = rows.map((row)=>Number(row.split(",")[1]))
      var chartData = {}
      rows.map((row)=>{
        chartData[row.split(",")[0]] = row.split(",")[1]
      })

      var chart:Chart = new Chart();
      chart.data = chartData
      chart.y_axis = 0
      chart.label = station
      this.chartDataService.addChartDataSet(chart);
    })
  }
}
