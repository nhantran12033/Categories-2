import { Component, OnInit, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators, Form } from '@angular/forms';
import { ExpenseCodeDto, ExpenseCodeService } from '@proxy/expense-codes';
import { ConfirmationService, Confirmation } from '@abp/ng.theme.shared';
import { RouterTestingHarness } from '@angular/router/testing';


@Component({
  selector: 'app-expense-codes',
  templateUrl: './expense-codes.component.html',
  styleUrls: ['./expense-codes.component.scss']
})
export class ExpenseCodesComponent implements OnInit {
  isModalOpen = false;
  isEditOpen = false;
  isSearchOpen = false;
  search: string;
  onToggleSearch = new EventEmitter();
  form: FormGroup;
  expensecode: ExpenseCodeDto[];
  constructor (
    private expensecodeService: ExpenseCodeService,
    private fb: FormBuilder,
    private confirmation: ConfirmationService,
  ) {}
  ngOnInit(): void {
      this.expensecodeService.getList().subscribe(response => {
        this.expensecode = response;
      })
  }
  getList() {
    this.expensecodeService.getWhereListByCodeAndDesAndImportBy(this.search, this.search, this.search).subscribe(response => {
      this.expensecode = response;
      this.search ="";
    })
  }
  buildForm() {
    this.form = this.fb.group({
      code: ['', Validators.required],
      description: ['', Validators.required],
      importBy: ['', Validators.required],
    })
  }
  create(){
    this.buildForm();
    this.isModalOpen = true;
  }
  edit(){
    this.buildForm();
    this.isModalOpen = true;
  }
  save(){
    if (this.form.invalid){
      return;
    }
    this.expensecodeService.createList(this.form.value).subscribe(()=> {
      this.isModalOpen = false;
      this.ngOnInit();
    });
  }
  saveEdit(id: string){
    if (this.form.invalid){
      return;
    }
    this.expensecodeService.updateList(id, this.form.value).subscribe(()=> {
      this.isEditOpen = false;
      this.form.reset();
      this.ngOnInit();
    });
  }
  delete(id:string){
    this.confirmation.warn('::Are you sure to delete', '::AreYouSure').subscribe((status) => {
      if (status === Confirmation.Status.confirm){
        this.expensecodeService.delete(id).subscribe(()=> this.ngOnInit());
      }
    });

  }

}
