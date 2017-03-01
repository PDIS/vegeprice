import { CWBConfig } from './cwb.config';
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

  stations:Array<string> = []
  selectedStations: Array<string> = []
  allData:Array<Chart> = []

  ngOnInit() {
    this.http.get(CWBConfig.stationURL)
      .map(data=>data.json())
      .subscribe(data=>{
        this.stations = data.map((station)=>{
          return station['name'];
        });
      })
  }

  private addItem() {
    this.selectedStations.push("");
  }

  private deleteItem(index) {
    this.selectedStations.splice(index, 1)
    this.allData.splice(index, 1);
  }

  private onSelectChange(station,index) {
    this.http.get( CWBConfig.byLocationURL + station + '.csv')
    .map(data=>{
      var chart:Chart = new Chart()
      chart.y_axis = 2
      chart.data = this.csvToChartData(data['_body'])
      chart.label = station;
      return chart;
    })
    .subscribe(chart=>{
      this.allData[index]=chart;
      this.chartDataService.addChartDataSet("cwb",this.allData);
    })
  }

  private csvToChartData(csv:string){
    let chartData = {};
    csv.split("\n").forEach((row)=>{
        chartData[row.split(",")[0]] = row.split(",")[1]
    });
    return chartData;
  }
}
