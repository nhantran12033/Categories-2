import type { TripExpenseDto } from './models';
import { RestService, Rest } from '@abp/ng.core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TripExpenseService {
  apiName = 'Default';
  

  createTrip = (notes: string, dto: TripExpenseDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, TripExpenseDto>({
      method: 'POST',
      url: '/api/app/trip-expense/trip',
      params: { notes },
      body: dto,
    },
    { apiName: this.apiName,...config });
  

  getList = (config?: Partial<Rest.Config>) =>
    this.restService.request<any, TripExpenseDto[]>({
      method: 'GET',
      url: '/api/app/trip-expense',
    },
    { apiName: this.apiName,...config });
  

  getListID = (id: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, TripExpenseDto[]>({
      method: 'GET',
      url: `/api/app/trip-expense/${id}/i-d`,
    },
    { apiName: this.apiName,...config });

  constructor(private restService: RestService) {}
}
