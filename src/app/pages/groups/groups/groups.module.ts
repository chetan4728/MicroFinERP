import { GroupRoutingModule } from './group-routing/group-routing.module';
import { GroupsComponent } from './../groups.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTablesModule } from 'angular-datatables';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';



@NgModule({
  declarations: [GroupsComponent],
  imports: [
    CommonModule,DataTablesModule,ReactiveFormsModule,FormsModule,GroupRoutingModule
  ]
})
export class GroupsModule { }
