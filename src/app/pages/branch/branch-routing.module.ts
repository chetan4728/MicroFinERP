import { AreaFormComponent } from './area-form/area-form.component';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule} from '@angular/router';
import { BranchComponent } from './branch.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: BranchComponent,
    data: {
      title: 'Dashboard Component'
    }
  },
  {
    path: 'Area/:id',
    pathMatch: 'full',
    component: AreaFormComponent,
    data: {
      title: 'Area Component'
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
export class BranchRoutingModule { }
