import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LegaentityComponent } from './legaentity.component';

const routes: Routes = [{ path: '', component: LegaentityComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LegaentityRoutingModule { }
