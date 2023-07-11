import { NgModule } from '@angular/core';
import { VatRoutingModule } from './vat-routing.module';
import { VatComponent } from './vat.component';
import { SharedModule } from '../shared/shared.module';
import { PercentPipe } from '@angular/common';
import { CommonModule } from '@angular/common';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    VatComponent

  ],
  imports: [
    SharedModule,
    CommonModule,
    VatRoutingModule,
    NgbDatepickerModule,
  ],
  providers: [
    PercentPipe
  ]
})
export class VatModule { }
