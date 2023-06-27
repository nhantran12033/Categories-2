import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LegaentityRoutingModule } from './legaentity-routing.module';
import { LegaentityComponent } from './legaentity.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    LegaentityComponent
  ],
  imports: [
    SharedModule,
    LegaentityRoutingModule
  ]
})
export class LegaentityModule { }
