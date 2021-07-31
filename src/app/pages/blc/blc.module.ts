import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTablesModule } from 'angular-datatables';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BlcRoutingModule } from './blc-routing.module';
import { BlcComponent } from './blc.component';
import { BlcapprovalComponent } from './blcapproval/blcapproval.component';


@NgModule({
  declarations: [BlcComponent, BlcapprovalComponent],
  imports: [
    CommonModule,
    BlcRoutingModule,
    BlcRoutingModule,
    DataTablesModule,ReactiveFormsModule,FormsModule
  ],
})
export class BlcModule { }
