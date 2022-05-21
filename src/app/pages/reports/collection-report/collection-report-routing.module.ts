import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CollectionReportComponent } from './collection-report.component';

const routes: Routes = [
  {
    path:'',
    pathMatch:'full',
    component: CollectionReportComponent,
    data:{
      title: 'Daily Balance Report'
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CollectionReportRoutingModule { }
