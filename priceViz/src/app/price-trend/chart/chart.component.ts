import { ChartDataService } from './chart-data.service';
import { Component, OnInit } from '@angular/core';
import {Chart} from './chart'

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {

  constructor(private chartDataService: ChartDataService) { }

  chartData:Array<Chart> = [];
  show = false
  axis = []
  header = []
  dataTable = []

  pieChartOptions = {
    chartType: 'LineChart',
    dataTable: this.dataTable,
    options: { 'title': 'Tasks' },
  };

  ngOnInit() {
    this.show = false
    this.chartData = [];
    this.axis = []
    this.header = []
    this.dataTable = []
  }

  ngOnChanges() { // <------
    this.draw();
    console.log("1213")
  }

  draw() {
    this.ngOnInit()
    this.chartData = this.chartDataService.getChartDataSet()
    this.initAxis()
    this.initDataTable()
    this.axisToTime()
    this.dataTable[0] = ['Task'].concat(this.axis);
    this.dataTable = this.dataTable[0].map((x,i) => this.dataTable.map(x => x[i]));
    this.pieChartOptions.dataTable = this.dataTable
    this.show = true
  }

  initDataTable(){
    this.chartData.map((chart,idx)=>{
      var row = [];
      this.axis.forEach((key)=>{
        row.push(Number(chart.data[key]));
      })
      this.dataTable[idx+1] = [chart.label].concat(row);
    })
  }

  initAxis(){
    this.axis = Object.keys(this.chartData[0].data).filter(key=>key!="")
    this.axis = this.axis.sort((a,b)=>{return (a>b)?1:-1});
  }

  axisToTime(){
    this.axis = this.axis.map(key=>new Date(key))
  }

  

}
