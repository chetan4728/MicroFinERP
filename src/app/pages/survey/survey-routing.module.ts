import { SurveyComponent } from './survey.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule} from '@angular/router';
import { ListingComponent } from './survey-listing/listing/listing.component';
import { AppsurveyComponent } from './appsurvey/appsurvey.component';
const routes: Routes = [
    {
      path: '',
      pathMatch: 'full',
      component: ListingComponent,
      data: {
        title: 'Assign Survey Details'
      }
    }
    ,
    {
      path: 'assign-survey',
      pathMatch: 'full',
      component: SurveyComponent,
      data: {
        title: 'Assign Survey'
      }
    }
    ,
    {
      path: 'app-survey',
      pathMatch: 'full',
      component: AppsurveyComponent,
      data: {
        title: 'App Survey'
      }
    }
  ];

@NgModule({
    imports: [
      RouterModule.forChild(routes)
    ],
    exports: [
      RouterModule
    ]
  })

export class SurveyRoutingModule { }
