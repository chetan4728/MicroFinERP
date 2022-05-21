import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoanCollectionReportRoutingModule } from './loan-collection-report-routing.module';
import { LoanCollectionReportComponent } from './loan-collection-report.component';


@NgModule({
  declarations: [LoanCollectionReportComponent],
  imports: [
    CommonModule,
    LoanCollectionReportRoutingModule
  ]
})
export class LoanCollectionReportModule { }
