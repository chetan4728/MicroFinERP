import { RecoveryComponent } from './recovery.component';

import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewRecoveryComponent } from './view-recovery/view-recovery.component';


const routes:Routes = [
  {
    path:'',
    pathMatch:'full',
    component:RecoveryComponent,
    data:{
      title: 'Recovery Details'
    }
  },
  {
    path:'view-recovery/:branch_id/:area_id/:center_id/:group_id/:action/:distribution_id',
    component:ViewRecoveryComponent,
    data:{
      title: 'Recovery Details'
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
export class RecoveryRoutingModule { }
