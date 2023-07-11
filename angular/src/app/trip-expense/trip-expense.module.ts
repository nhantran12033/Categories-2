import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TripExpenseRoutingModule } from './trip-expense-routing.module';
import { TripExpenseComponent } from './trip-expense.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    TripExpenseComponent
  ],
  imports: [
    TripExpenseRoutingModule,
    SharedModule,
  ]
})
export class TripExpenseModule { }
