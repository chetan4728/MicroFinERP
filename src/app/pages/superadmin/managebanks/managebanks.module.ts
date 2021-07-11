import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManagebanksComponent } from './managebanks.component';
import { ManagebanksRoutingModule } from './managebanks.routing.module';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';
import { FormbankComponent } from './formbank/formbank.component';
@NgModule({
  declarations: [ManagebanksComponent,FormbankComponent],
  imports: [
    CommonModule, ManagebanksRoutingModule, DataTablesModule , ReactiveFormsModule , FormsModule
  ]
})
export class ManagebanksModule { }