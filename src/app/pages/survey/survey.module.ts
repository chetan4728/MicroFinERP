import { SurveyComponent } from './survey.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SurveyRoutingModule } from './survey-routing.module';



@NgModule({
  declarations: [SurveyComponent],
  imports: [
    CommonModule, SurveyRoutingModule
  ]
})
export class SurveyModule { }
