import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { KindOfFalRoutingModule } from "./kind-of-fal-routing.module";
import { KindOfFalComponent } from "./kind-of-fal.component";
import { SharedModule } from "../shared/shared.module";

@NgModule ({
    declarations: [
        KindOfFalComponent
    ],
    imports: [
        CommonModule,
        KindOfFalRoutingModule,
        SharedModule
    ]
})
export class KindOfFalModule{}