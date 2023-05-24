import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerRoutingModule } from './customer-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomerDetailsComponent } from './customer-details/customer-details.component';
import { DataTablesModule } from 'angular-datatables';


@NgModule({
  declarations: [CustomerDetailsComponent],
  imports: [
    CommonModule ,
    DataTablesModule ,
    ReactiveFormsModule , 
    FormsModule, 
    CustomerRoutingModule
  ]
})
export class CustomerModule { }
