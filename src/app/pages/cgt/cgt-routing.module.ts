
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule} from '@angular/router';
import { CgtComponent } from './cgt.component';
const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: CgtComponent,
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
export class CgtRoutingModule { }
