import { SurveyComponent } from './survey.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule} from '@angular/router';
const routes: Routes = [
    {
      path: '',
      pathMatch: 'full',
      component: SurveyComponent,
      data: {
        title: 'Manage Bank Details'
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
