import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrecloseReportRoutingModule } from './preclose-report-routing.module';
import { PrecloseReportComponent } from './preclose-report.component';
import { ViewPrecloseReportComponent } from './view-preclose-report/view-preclose-report.component';
import { DataTablesModule } from 'angular-datatables';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';


@NgModule({
  declarations: [PrecloseReportComponent, ViewPrecloseReportComponent],
  imports: [
    CommonModule,DataTablesModule,ReactiveFormsModule,FormsModule,PrecloseReportRoutingModule
  ]
})
export class PrecloseReportModule { }
