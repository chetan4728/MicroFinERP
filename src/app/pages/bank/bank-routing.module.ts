import { BankComponent } from './bank.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule} from '@angular/router';
const routes: Routes = [
    {
      path: '',
      pathMatch: 'full',
      component: BankComponent,
      data: {
        title: 'Manage Bank Details'
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
export class BankRoutingModule {}
