
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
