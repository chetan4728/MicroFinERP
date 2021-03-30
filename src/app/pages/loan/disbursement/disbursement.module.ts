import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTablesModule } from 'angular-datatables';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DisbursementComponent } from './disbursement.component';
import { DisbursementRoutingModule } from './disbursement-routing.module';
import { LoanDisbursementComponent } from './loan-disbursement/loan-disbursement.component';


@NgModule({
  declarations: [DisbursementComponent, LoanDisbursementComponent],
  imports: [
    CommonModule,DataTablesModule,ReactiveFormsModule,FormsModule,DisbursementRoutingModule
  ]
})

export class DisbursementModule { }
