import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TripInformationComponent } from './trip-information.component';

const routes: Routes = [{ path: '', component: TripInformationComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TripInformationRoutingModule { }
