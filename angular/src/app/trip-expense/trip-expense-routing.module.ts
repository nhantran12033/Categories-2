import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TripExpenseComponent } from './trip-expense.component';

const routes: Routes = [{ path: '', component: TripExpenseComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TripExpenseRoutingModule { }
