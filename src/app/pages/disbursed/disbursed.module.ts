import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DisbursedRoutingModule } from './disbursed-routing.module';
import { DisbursedComponent } from './disbursed.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';

@NgModule({
  declarations: [DisbursedComponent],
  imports: [
    CommonModule,
    DisbursedRoutingModule,
    DataTablesModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class DisbursedModule { }
