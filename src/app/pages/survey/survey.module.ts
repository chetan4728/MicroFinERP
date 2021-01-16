import { SurveyComponent } from './survey.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SurveyRoutingModule } from './survey-routing.module';
import { AgmCoreModule } from '@agm/core';


@NgModule({
  declarations: [SurveyComponent],
  imports: [
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyD0fhyInxQCAVmBPVGJLN_QIF29pJfyYfQ',
      libraries: ['places']
    }), CommonModule, SurveyRoutingModule
  ]
})
export class SurveyModule { }
