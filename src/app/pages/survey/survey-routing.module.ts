import { SurveyComponent } from './survey.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule} from '@angular/router';
import { ListingComponent } from './survey-listing/listing.component';

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
      path: 'assign-survey-edit/:id',
      pathMatch: 'full',
      component: SurveyComponent,
      data: {
        title: 'Assign Survey'
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
