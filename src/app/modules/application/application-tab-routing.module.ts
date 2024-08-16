import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApplicationLayoutModule } from 'src/app/shared/layouts/application-layout/application-layout.module';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/pages/home/home.module').then((m) => m.HomePageModule),
  },
  {
    path: 'transactions',
    loadChildren: () =>
      import('./transactions/pages/transaction-index/transaction-index.module').then(
        (m) => m.TransactionIndexPageModule
      ),
  },
  {
    path: 'settings',
    loadChildren: () =>
      import('./settings/pages/setting-index/setting-index.module').then((m) => m.SettingIndexPageModule),
  },
  {
    path: 'reports',
    loadChildren: () => import('./reports/pages/report-index/report-index.module').then((m) => m.ReportIndexPageModule),
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home',
  },
];

@NgModule({
  imports: [ApplicationLayoutModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ApplicationTabRoutingModule {}
