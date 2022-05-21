import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CollectionBalanceSheetComponent } from './collection-balance-sheet.component';

const routes: Routes = [
  {
    path:'',
    pathMatch:'full',
    component: CollectionBalanceSheetComponent,
    data:{
      title: 'Daily Balance Report'
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CollectionBalanceSheetRoutingModule { }
