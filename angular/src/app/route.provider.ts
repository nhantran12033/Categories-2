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
        path: '/Categories',
        name: 'Categories',
        iconClass: 'fas fa-table',
        order: 1,
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
      }
    ]);
  };
}
