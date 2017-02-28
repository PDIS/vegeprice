import { SimpleChange } from '@angular/core/src/change_detection/change_detection_util';
import { GoogleChartComponent } from 'ng2-google-charts/google-chart/google-chart.component';
import { ViewChild } from '@angular/core/src/metadata/di';
import { ChartDataService } from './chart-data.service';
import { Component, OnInit } from '@angular/core';
import { Chart } from './chart'

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {

  constructor(private chartDataService: ChartDataService) { }

  chartData: Array<Chart> = [];
  show = false
  axis = []
  header = []
  dataTable = []

  width = window.innerWidth * 0.7
  height = window.innerHeight * 0.6

  pieChartOptions: Object = {
    chartType: 'LineChart',
    dataTable: this.dataTable,
    options: {
      'title': 'Tasks',
      'width': this.width,
      'height': this.height,
      'chartArea': {
        width: this.width * 0.9,
        left: this.width * 0.1,
        top: this.height * 0.1,
        height: this.height * 0.8
      },
      'legend': { position: 'bottom' },
      'interpolateNulls': true,
      'explorer': { 
        actions: ['dragToZoom', 'rightClickToReset'],
        axis: 'horizontal'
      },
      // 'curveType': 'function',
      focusTarget: 'category'
    },
  };

  ngOnInit() {
    this.chartData = [];
    this.axis = []
    this.header = []
    this.dataTable = []
    this.width = window.innerWidth * 0.7
    this.height = window.innerHeight * 0.6
  }

  draw() {
    this.ngOnInit()
    this.chartData = this.chartDataService.getChartDataSet()
    this.initAxis()
    this.initDataTable()
    this.axisToTime()
    this.dataTable[0] = ['Task'].concat(this.axis);
    this.dataTable = this.dataTable[0].map((x, i) => this.dataTable.map(x => x[i]));
    this.pieChartOptions['dataTable'] = this.dataTable
    // this.pieChartOptions['options']
    this.pieChartOptions = Object.create(this.pieChartOptions);
    this.show = true
  }

  private initDataTable() {
    this.chartData.map((chart, idx) => {
      var row = [];
      this.axis.forEach((key) => {
        row.push(Number(chart.data[key]));
      })
      this.dataTable[idx + 1] = [chart.label].concat(row);
    })
  }

  private initAxis() {
    this.axis = Object.keys(this.chartData[0].data).filter(key => key != "")
    this.axis = this.axis.sort((a, b) => { return (a > b) ? 1 : -1 });
  }

  private axisToTime() {
    this.axis = this.axis.map(key => new Date(key))
  }



}
