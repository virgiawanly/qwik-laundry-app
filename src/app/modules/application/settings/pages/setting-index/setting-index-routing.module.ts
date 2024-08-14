import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SettingIndexPage } from './setting-index.page';

const routes: Routes = [
  {
    path: '',
    component: SettingIndexPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SettingIndexPageRoutingModule {}
