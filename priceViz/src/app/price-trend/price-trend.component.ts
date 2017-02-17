import { ChartComponent } from './chart/chart.component';
import {ViewChild} from '@angular/core/src/metadata/di';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-price-trend',
  templateUrl: './price-trend.component.html',
  styleUrls: ['./price-trend.component.scss']
})
export class PriceTrendComponent implements OnInit {

  @ViewChild('chart') chartComponent: ChartComponent

  constructor() { }

  ngOnInit() {
  }

  redraw() {
    this.chartComponent.show = false;
    this.chartComponent.draw();
  }

}
