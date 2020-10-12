import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SingleServicePage } from './single-service.page';

const routes: Routes = [
  {
    path: '',
    component: SingleServicePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SingleServicePageRoutingModule {}
