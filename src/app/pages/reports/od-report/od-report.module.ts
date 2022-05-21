import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OdReportRoutingModule } from './od-report-routing.module';
import { OdReportComponent } from './od-report.component';


@NgModule({
  declarations: [OdReportComponent],
  imports: [
    CommonModule,
    OdReportRoutingModule
  ]
})
export class OdReportModule { }
