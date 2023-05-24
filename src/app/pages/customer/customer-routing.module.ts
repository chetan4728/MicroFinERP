import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomerDetailsComponent } from './customer-details/customer-details.component';
import { CustomerComponent } from './customer.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: CustomerComponent,
    data: {
      title: 'Dashboard Component'
    }
  },
  {
    path: 'customer-details',
    pathMatch: 'full',
    component: CustomerDetailsComponent,
    data: {
      title: 'Dashboard Component'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
