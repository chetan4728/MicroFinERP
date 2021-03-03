import { CentersComponent } from './../centers.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule} from '@angular/router';

const routes: Routes = [
    {
      path: '',
      pathMatch: 'full',
      component: CentersComponent,
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
export class CenterRoutingModule { }
