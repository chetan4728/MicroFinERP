import { LoanDisbursementComponent } from './loan-disbursement/loan-disbursement.component';
import { DisbursementComponent } from './disbursement.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule} from '@angular/router';



const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: DisbursementComponent,
    data: {
      title: 'Loan Details'
    }
  },
  {
    path: 'LoanDisbursementForm/:branch_id/:area_id/:center_id/:group_id/:action/:distribution_id',
    pathMatch: 'full',
    component: LoanDisbursementComponent,
    data: {
      title: 'Loan Details'
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
export class DisbursementRoutingModule { }