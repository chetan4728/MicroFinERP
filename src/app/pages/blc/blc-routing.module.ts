import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BlcComponent } from './blc.component';
import { BlcapprovalComponent } from './blcapproval/blcapproval.component';

const routes: Routes = [{
  path:'',
  component:BlcComponent
},

  {
    path: 'LoanDisbursementForm/:branch_id/:area_id/:center_id/:group_id/:action/:distribution_id',
    pathMatch: 'full',
    component: BlcapprovalComponent,
    data: {
      title: 'Loan Details'
    }
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BlcRoutingModule { }
