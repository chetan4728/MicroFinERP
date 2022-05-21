import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PrecloseReportComponent } from './preclose-report.component';
import { ViewPrecloseReportComponent } from './view-preclose-report/view-preclose-report.component';

const routes: Routes = [
  {
    path:'',
    pathMatch:'full',
    component:PrecloseReportComponent,
    data:{
      title: 'Loan PreClose Report'
    }
  },
  {
    path:'view-preclose/:branch_id/:area_id/:center_id/:group_id/:action/:distribution_id',
    component:ViewPrecloseReportComponent,
    data:{
      title: 'PreClose Report Details'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrecloseReportRoutingModule { }
