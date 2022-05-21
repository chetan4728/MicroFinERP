import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MonthDemandReportRoutingModule } from './month-demand-report-routing.module';
import { MonthDemandReportComponent } from './month-demand-report.component';


@NgModule({
  declarations: [MonthDemandReportComponent],
  imports: [
    CommonModule,
    MonthDemandReportRoutingModule
  ]
})
export class MonthDemandReportModule { }
