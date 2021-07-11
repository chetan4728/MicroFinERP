import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTablesModule } from 'angular-datatables';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AreaFormComponent } from './area-form.component';
import { AreaFormRoutingModule } from './area-form-routing.module';
import { AgmCoreModule } from '@agm/core';
@NgModule({
  declarations: [AreaFormComponent],
  imports: [AgmCoreModule.forRoot({
    apiKey: 'AIzaSyD0fhyInxQCAVmBPVGJLN_QIF29pJfyYfQ'
  }),
    CommonModule , DataTablesModule , ReactiveFormsModule , FormsModule,AreaFormRoutingModule
  ]
})
export class AreaFormModule { }
