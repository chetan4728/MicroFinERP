import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTablesModule } from 'angular-datatables';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RecoveryRoutingModule } from './recovery-routing.module';
import { RecoveryComponent } from './recovery.component';

@NgModule({
  declarations: [RecoveryComponent],
  imports: [
    CommonModule,DataTablesModule,ReactiveFormsModule,FormsModule,RecoveryRoutingModule
  ]
})
export class RecoveryModule { }
