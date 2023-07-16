import { RestService, Rest } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import type { ExpenseDetailDto } from '../expense-detail/models';

@Injectable({
  providedIn: 'root',
})
export class ExpenseDetailService {
  apiName = 'Default';
  

  createList = (total: number, dtos: ExpenseDetailDto[], config?: Partial<Rest.Config>) =>
    this.restService.request<any, ExpenseDetailDto>({
      method: 'POST',
      url: '/api/app/expense-detail/list',
      params: { total },
      body: dtos,
    },
    { apiName: this.apiName,...config });
  

  getList = (config?: Partial<Rest.Config>) =>
    this.restService.request<any, ExpenseDetailDto[]>({
      method: 'GET',
      url: '/api/app/expense-detail',
    },
    { apiName: this.apiName,...config });

  constructor(private restService: RestService) {}
}
