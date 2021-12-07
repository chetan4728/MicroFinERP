import { Cgt1Component } from './cgt1.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTablesModule } from 'angular-datatables';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Cgt1RoutingModule } from './cgt1-routing.module';


@NgModule({
  declarations: [Cgt1Component],
  imports: [
    CommonModule , DataTablesModule , ReactiveFormsModule , FormsModule, Cgt1RoutingModule
  ]

})
export class Cgt1Module { }
