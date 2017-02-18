import { Chart } from './chart';
import { Injectable } from '@angular/core';

@Injectable()
export class ChartDataService {

  constructor() { }

  chartDataSet: Object = {}

  getChartDataSet() {
    var combineDataSet: Array<Chart> = []
    Object.keys(this.chartDataSet).forEach(key => {
      combineDataSet = combineDataSet.concat(this.chartDataSet[key])
    })

    return combineDataSet;
  }

  addChartDataSet(dataSource: string, chartData: Array<Chart>) {
    this.chartDataSet[dataSource] = chartData;
  }

}
