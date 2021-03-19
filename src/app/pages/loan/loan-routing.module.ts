import { LoanComponent } from './loan.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule} from '@angular/router';


const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: LoanComponent,
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
export class LoanRoutingModule { }
