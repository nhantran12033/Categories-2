import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { TripInformationRoutingModule } from './trip-information-routing.module';
import { TripInformationComponent } from './trip-information.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    TripInformationComponent
  ],
  imports: [
    CommonModule,
    TripInformationRoutingModule,
    SharedModule,
    NgbDatepickerModule,
  ]
})
export class TripInformationModule { }
