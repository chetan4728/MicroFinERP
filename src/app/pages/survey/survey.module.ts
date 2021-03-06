import { SurveyComponent } from './survey.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SurveyRoutingModule } from './survey-routing.module';
import { AgmCoreModule } from '@agm/core';

import { DataTablesModule } from 'angular-datatables';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ListingComponent } from './survey-listing/listing.component';

@NgModule({
  declarations: [SurveyComponent,ListingComponent],
  imports: [
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyD0fhyInxQCAVmBPVGJLN_QIF29pJfyYfQ',
      libraries: ['places']
    }), CommonModule, SurveyRoutingModule ,DataTablesModule ,FormsModule ,ReactiveFormsModule
  ]
})
export class SurveyModule { }
