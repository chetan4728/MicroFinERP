import { BankComponent } from './bank.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTablesModule } from 'angular-datatables';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BankRoutingModule } from './bank-routing.module';

@NgModule({
  declarations: [BankComponent],
  imports: [
    CommonModule , DataTablesModule , ReactiveFormsModule , FormsModule, BankRoutingModule
  ]
})
export class BankModule {}
