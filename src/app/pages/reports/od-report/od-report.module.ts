import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OdReportRoutingModule } from './od-report-routing.module';
import { OdReportComponent } from './od-report.component';
import { FormControl, FormsModule } from '@angular/forms';


@NgModule({
  declarations: [OdReportComponent],
  imports: [
    CommonModule,
    OdReportRoutingModule,
    FormsModule
  ]
})
export class OdReportModule { }
