import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LegaentityRoutingModule } from './legaentity-routing.module';
import { LegaentityComponent } from './legaentity.component';


@NgModule({
  declarations: [
    LegaentityComponent
  ],
  imports: [
    CommonModule,
    LegaentityRoutingModule
  ]
})
export class LegaentityModule { }
