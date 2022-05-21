import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoanCollectionReportComponent } from './loan-collection-report.component';

const routes: Routes = [
  {
    path:'',
    pathMatch:'full',
    component:LoanCollectionReportComponent,
    data:{
      title: 'Loan Collection Report'
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoanCollectionReportRoutingModule { }
