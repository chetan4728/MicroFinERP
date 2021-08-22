import { ApplicationpdfComponent } from './applicationpdf.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApplicationpdfRoutingModule } from './applicationpdf-routing.module';


@NgModule({
  declarations: [ApplicationpdfComponent],
  imports: [
    CommonModule,
    ApplicationpdfRoutingModule
  ]
})
export class ApplicationpdfModule { }
