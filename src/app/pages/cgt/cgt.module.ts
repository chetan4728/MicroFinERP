import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTablesModule } from 'angular-datatables';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CgtComponent } from './cgt.component';
import { CgtRoutingModule } from './cgt-routing.module';
@NgModule({
  declarations: [CgtComponent],
  imports: [
    CommonModule , DataTablesModule , ReactiveFormsModule , FormsModule, CgtRoutingModule
  ]
})
export class CgtModule { }
