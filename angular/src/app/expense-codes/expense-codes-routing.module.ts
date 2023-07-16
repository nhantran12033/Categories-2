import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ExpenseCodesComponent } from "./expense-codes.component";

const routes: Routes = [{ path: '', component: ExpenseCodesComponent}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ExpenseCodesRoutingModule{}