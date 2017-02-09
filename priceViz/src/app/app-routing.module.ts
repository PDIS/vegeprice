import { PriceTrendComponent } from './price-trend/price-trend.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {path: '', redirectTo:'priceTrend', pathMatch:'full'},
  {path: 'priceTrend', component: PriceTrendComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true})],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
