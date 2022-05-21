import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DailyBalanceReportRoutingModule } from './daily-balance-report-routing.module';
import { DailyBalanceReportComponent } from './daily-balance-report.component';


@NgModule({
  declarations: [DailyBalanceReportComponent],
  imports: [
    CommonModule,
    DailyBalanceReportRoutingModule
  ]
})
export class DailyBalanceReportModule { }
