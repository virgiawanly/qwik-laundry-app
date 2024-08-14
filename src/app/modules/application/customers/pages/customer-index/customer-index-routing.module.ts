import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CustomerIndexPage } from './customer-index.page';

const routes: Routes = [
  {
    path: '',
    component: CustomerIndexPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustomerIndexPageRoutingModule {}
