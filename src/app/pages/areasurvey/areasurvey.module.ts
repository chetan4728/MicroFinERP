
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AgmCoreModule } from '@agm/core';

import { DataTablesModule } from 'angular-datatables';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AreasurveyComponent } from './areasurvey.component';
import { AreaSurveyRoutingModule } from './areasurvey-routing.module';
import { ViewsurveyComponent } from './viewsurvey/viewsurvey.component';


@NgModule({
  declarations: [AreasurveyComponent, ViewsurveyComponent],
  imports: [
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyD0fhyInxQCAVmBPVGJLN_QIF29pJfyYfQ',
      libraries: ['places']
    }), CommonModule, AreaSurveyRoutingModule ,DataTablesModule ,FormsModule ,ReactiveFormsModule
  ]
})
export class AreaSurveyModule { }
