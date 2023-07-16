import { Component, AfterViewInit, EventEmitter, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DepartmentService, DepartmentDto } from '@proxy/departments';
import { ConfirmationService, Confirmation } from '@abp/ng.theme.shared';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.scss']
})
export class DepartmentComponent implements OnInit{
  isModalOpen = false;
  isEditOpen = false;
  isSearchOpen = false;
  search: string;
  onToggleSearch = new EventEmitter();
  form: FormGroup;
  depart: DepartmentDto[];
  constructor(
    private departService: DepartmentService,
    private fb: FormBuilder,
    private confirmation: ConfirmationService,

  ) {}
  ngOnInit(): void {
    this.departService.getList().subscribe(response => {
        this.depart = response;
      })
  }
  getListDepart() {
    this.departService.getListWhereByCodeAndDesAndImportby(this.search, this.search, this.search).subscribe(response => {
      this.depart = response;
      this.search = "";
    })
  }
  buildForm(){
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
  editDepart(){
    this.buildForm();
    this.isEditOpen = true;
  }
  save(){
    if (this.form.invalid){
      return;
    }
    this.departService.createList(this.form.value).subscribe(()=>{
      this.isModalOpen = false;
      this.ngOnInit();
    });
  }
  saveEdit(id: string) {
    if (this.form.invalid) { 
      return;
    }
    this.departService.updateList(id, this.form.value).subscribe(() => {
      this.isEditOpen = false;
      this.form.reset();
        
        this.ngOnInit();
    });
  }
  delete(id: string){
    this.confirmation.warn('::Are you sure to delete', '::AreYouSure').subscribe((status) => {
      if (status === Confirmation.Status.confirm){
        this.departService.delete(id).subscribe(() => this.ngOnInit());
      }
    });
  }

}
