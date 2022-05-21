import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DailyBalanceReportComponent } from './daily-balance-report.component';

const routes: Routes = [
  {
    path:'',
    pathMatch:'full',
    component:DailyBalanceReportComponent,
    data:{
      title: 'Daily Balance Report'
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DailyBalanceReportRoutingModule { }
