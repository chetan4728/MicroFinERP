import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule} from '@angular/router';
import { GroupsComponent } from '../../groups.component';


const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: GroupsComponent,
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
export class GroupRoutingModule { }
