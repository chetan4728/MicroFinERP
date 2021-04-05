import { LoanRoutingModule } from './loan-routing.module';
import { LoanComponent } from './loan.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTablesModule } from 'angular-datatables';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FormComponent } from './form/form.component';



@NgModule({
  declarations: [LoanComponent, FormComponent],
  imports: [
    CommonModule,DataTablesModule,ReactiveFormsModule,FormsModule,LoanRoutingModule
  ]
})
export class LoanModule { }
