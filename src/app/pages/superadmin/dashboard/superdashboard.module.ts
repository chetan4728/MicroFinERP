
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SuperDashboardComponent } from './superdashboard.component';
import { SuperDashboardRoutingModule } from './superdashboard-routing.module';


@NgModule({
  declarations: [SuperDashboardComponent],
  imports: [
    CommonModule, SuperDashboardRoutingModule
  ]
})
export class SuperDashboardModule { }
