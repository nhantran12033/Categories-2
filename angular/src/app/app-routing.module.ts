import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule),
  },
  {
    path: 'account',
    loadChildren: () => import('@abp/ng.account').then(m => m.AccountModule.forLazy()),
  },
  {
    path: 'identity',
    loadChildren: () => import('@abp/ng.identity').then(m => m.IdentityModule.forLazy()),
  },
  {
    path: 'tenant-management',
    loadChildren: () =>
      import('@abp/ng.tenant-management').then(m => m.TenantManagementModule.forLazy()),
  },
  {
    path: 'setting-management',
    loadChildren: () =>
      import('@abp/ng.setting-management').then(m => m.SettingManagementModule.forLazy()),
  },
  { path: 'departments', loadChildren: () => import('./department/department.module').then(m => m.DepartmentModule) },
  { path: 'legalentitys', loadChildren: () => import('./legaentity/legaentity.module').then(m => m.LegaentityModule) },
  { path: 'vats', loadChildren: () => import('./vat/vat.module').then(m => m.VatModule) },
  { path: 'currencys', loadChildren: () => import('./currency/currency.module').then(m => m.CurrencyModule) },
  { path: 'suppliers', loadChildren: () => import('./supplier/supplier.module').then(m => m.SupplierModule) },
  { path: 'trip', loadChildren: () => import('./trip-information/trip-information.module').then(m => m.TripInformationModule) },
  { path: 'tripExpenses', loadChildren: () => import('./trip-expense/trip-expense.module').then(m => m.TripExpenseModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {})],
  exports: [RouterModule],
})
export class AppRoutingModule {}
