import { Chart } from './chart';
import { Injectable } from '@angular/core';

@Injectable()
export class ChartDataService {

  constructor() { }

  chartDataSet:Array<Chart> = []

  getChartDataSet(){
    return this.chartDataSet;
  }

  addChartDataSet(chart:Chart){
    this.chartDataSet.push(chart);
  }

}
