import { RoleComponent } from './role.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoleRoutingModule } from './role-routing.module';
import { DataTablesModule } from 'angular-datatables';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
  declarations: [RoleComponent],
  imports: [
    CommonModule , DataTablesModule , ReactiveFormsModule , FormsModule, RoleRoutingModule
  ]
})
export class RoleModule { }
