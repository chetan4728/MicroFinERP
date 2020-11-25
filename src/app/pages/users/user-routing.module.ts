import { UsersComponent } from './users.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule} from '@angular/router';
import { UserFormComponent } from './user-form/user-form.component';
const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: UsersComponent,
    data: {
      title: 'Dashboard Component'
    }
  }, {
    path: 'UserAdd',
    component: UserFormComponent,
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
export class UserRoutingModule { }
