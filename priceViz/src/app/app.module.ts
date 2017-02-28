import { ChartDataService } from './price-trend/chart/chart-data.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { PriceTrendComponent } from './price-trend/price-trend.component';
import { CwbComponent } from './price-trend/data-source/cwb/cwb.component';
import { EdbkcgComponent } from './price-trend/data-source/edbkcg/edbkcg.component';
import { ChartComponent } from './price-trend/chart/chart.component';
import { Ng2GoogleChartsModule } from 'ng2-google-charts';
import { AmisComponent } from './price-trend/data-source/amis/amis.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PriceTrendComponent,
    CwbComponent,
    EdbkcgComponent,
    ChartComponent,
    AmisComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    Ng2GoogleChartsModule
  ],
  providers: [ChartDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
