import { RoleComponent } from './role.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule} from '@angular/router';
const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: RoleComponent,
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
export class RoleRoutingModule { }
