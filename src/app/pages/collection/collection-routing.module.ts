import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CollectionComponent } from './collection.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: CollectionComponent,
    data: {
      title: 'Collection Component'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class CollectionRoutingModule { }