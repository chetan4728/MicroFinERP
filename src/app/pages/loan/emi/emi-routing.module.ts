import { EmiComponent } from './emi.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewEmiComponent } from './view-emi/view-emi.component';

const routes:Routes = [
  {
    path:'',
    pathMatch:'full',
    component:EmiComponent,
    data:{
      title: 'Emi Details'
    }
  },
  {
    path:'view-emi/:branch_id/:area_id/:center_id/:group_id/:action/:distribution_id',
    component:ViewEmiComponent,
    data:{
      title: 'Emi Details'
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
export class EmiRoutingModule { }
