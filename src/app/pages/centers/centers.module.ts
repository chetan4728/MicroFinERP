import { CenterRoutingModule } from './center-routing/center-routing.module';
import { CentersComponent } from './centers.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTablesModule } from 'angular-datatables';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';



@NgModule({
  declarations: [CentersComponent],
  imports: [
    CommonModule,DataTablesModule,ReactiveFormsModule,FormsModule,CenterRoutingModule
  ]
})
export class CentersModule { }
