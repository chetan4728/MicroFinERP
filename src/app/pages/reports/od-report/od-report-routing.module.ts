import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OdReportComponent } from './od-report.component';

const routes: Routes = [
  {
    path:'',
    pathMatch:'full',
    component:OdReportComponent,
    data:{
      title: 'Loan Collection Report'
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OdReportRoutingModule { }
