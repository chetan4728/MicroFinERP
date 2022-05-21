import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CollectionReportRoutingModule } from './collection-report-routing.module';
import { CollectionReportComponent } from './collection-report.component';


@NgModule({
  declarations: [CollectionReportComponent],
  imports: [
    CommonModule,
    CollectionReportRoutingModule
  ]
})
export class CollectionReportModule { }
