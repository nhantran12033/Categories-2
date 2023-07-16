import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ExpenseCodesRoutingModule } from "./expense-codes-routing.module";
import { ExpenseCodesComponent } from "./expense-codes.component";
import { SharedModule } from "../shared/shared.module";

@NgModule({
    declarations: [
        ExpenseCodesComponent
    ],
    imports: [
        CommonModule,
        ExpenseCodesRoutingModule,
        SharedModule
    ]
})
export class ExpenseCodesModule{}