import { ViewEmiComponent } from './view-emi/view-emi.component';
import { EmiComponent } from './emi.component';
import { EmiRoutingModule } from './emi-routing.module';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTablesModule } from 'angular-datatables';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
  declarations: [EmiComponent,ViewEmiComponent],
  imports: [
    CommonModule,DataTablesModule,ReactiveFormsModule,FormsModule,EmiRoutingModule
  ]
})


export class EmiModule { }
