
import { NgModule } from '@angular/core';
import { Routes, RouterModule} from '@angular/router';
import { AreasurveyComponent } from './areasurvey.component';


const routes: Routes = [
    {
      path: '',
      pathMatch: 'full',
      component: AreasurveyComponent,
      data: {
        title: 'Assign Survey Details'
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

export class AreaSurveyRoutingModule { }
