
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule} from '@angular/router';
import { SuperDashboardComponent } from './superdashboard.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: SuperDashboardComponent,
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
export class SuperDashboardRoutingModule { }
