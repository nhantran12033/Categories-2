import { RoutesService, eLayoutType } from '@abp/ng.core';
import { APP_INITIALIZER } from '@angular/core';

export const APP_ROUTE_PROVIDER = [
  { provide: APP_INITIALIZER, useFactory: configureRoutes, deps: [RoutesService], multi: true },
];

function configureRoutes(routesService: RoutesService) {
  return () => {
    routesService.add([
      {
        path: '/',
        name: '::Menu:Home',
        iconClass: 'fas fa-home',
        order: 1,
        layout: eLayoutType.application,
      },
      {
        path: '/NewRequest',
        name: 'New Request',
        iconClass: 'fas fa-plus',
        layout: eLayoutType.application,
      },
      {
        path: '/trip',
        name: 'Business Trip',
        parentName: 'New Request',
        layout: eLayoutType.application,
      },
      {
        path: '/Categories',
        name: 'Categories',
        iconClass: 'fas fa-table',
        order: 2,
        layout: eLayoutType.application
      },
      {
        path: '/legalentitys',
        name: 'Legal Entity',
        parentName: 'Categories',
        layout: eLayoutType.application
      },
      {
        path: '/vats',
        name: 'VAT',
        parentName: 'Categories',
        layout: eLayoutType.application
      },
      {
        path: '/suppliers',
        name: 'Supplier',
        parentName: 'Categories',
        layout: eLayoutType.application
      },
      {
        path: '/tripExpenses',
        name: 'Business Trip List',
        iconClass: 'fas fa-list',
        layout: eLayoutType.application
      },
      {
        path: '/currencys',
        name: 'Currency',
        iconClass: 'fas fa-list',
        layout: eLayoutType.application
      }
    ]);
  };
}
