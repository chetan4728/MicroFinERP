
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule} from '@angular/router';
import { ManagebanksComponent } from './managebanks.component';
import { FormbankComponent } from './formbank/formbank.component';
const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: ManagebanksComponent,
    data: {
      title: 'Banks Component'
    }
  },
  {
    path: 'bankform',
    pathMatch: 'full',
    component: FormbankComponent,
    data: {
      title: 'Banks Component'
    }
  },
  {
    path: 'BankEdit/:id',
    pathMatch: 'full',
    component: FormbankComponent,
    data: {
      title: 'Banks Component'
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
export class ManagebanksRoutingModule { }
