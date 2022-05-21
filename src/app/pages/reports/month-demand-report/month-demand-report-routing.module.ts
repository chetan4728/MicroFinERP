import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MonthDemandReportComponent } from './month-demand-report.component';

const routes: Routes = [
  {
    path:'',
    pathMatch:'full',
    component:MonthDemandReportComponent,
    data:{
      title: 'Demand Report'
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MonthDemandReportRoutingModule { }
