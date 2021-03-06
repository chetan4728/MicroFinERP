
import { UsersComponent } from './users.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTablesModule } from 'angular-datatables';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Routes, RouterModule} from '@angular/router';
import { UserRoutingModule } from './user-routing.module';
import { UserFormComponent } from './user-form/user-form.component';
import { AttendanceComponent } from './attendance/attendance.component';

@NgModule({
  declarations: [UsersComponent, UserFormComponent, AttendanceComponent],
  imports: [
    CommonModule , DataTablesModule , ReactiveFormsModule , FormsModule, UserRoutingModule
  ]
})
export class UsersModule { }
