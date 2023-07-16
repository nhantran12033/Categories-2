import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { KindOfFalComponent } from './kind-of-fal.component';

const routes: Routes = [{ path: '', component: KindOfFalComponent}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class KindOfFalRoutingModule {}