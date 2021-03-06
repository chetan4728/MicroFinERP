import { DisbursementComponent } from './disbursement/disbursement.component';
import { LoanComponent } from './loan.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule} from '@angular/router';
import { FormComponent } from './form/form.component';


const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: LoanComponent,
    data: {
      title: 'Loan Details'
    }
  }, {
    path: 'LoanForm/:id',
    component: FormComponent,
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
export class LoanRoutingModule { }
