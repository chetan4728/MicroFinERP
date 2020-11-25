import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTablesModule } from 'angular-datatables';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BranchComponent } from './branch.component';
import { BranchRoutingModule } from './branch-routing.module';


@NgModule({
  declarations: [BranchComponent],
  imports: [
    CommonModule , DataTablesModule , ReactiveFormsModule , FormsModule,BranchRoutingModule
  ]
})
export class BranchModule { }
