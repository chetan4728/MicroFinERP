import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DisbursedComponent } from './disbursed.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: DisbursedComponent,
    data: {
      title: 'Disbursed Loan Details'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DisbursedRoutingModule { }
