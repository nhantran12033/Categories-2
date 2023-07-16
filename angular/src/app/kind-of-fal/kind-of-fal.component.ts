import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {  KindOfFALService} from '@proxy/kind-of-fals';
import { ConfirmationService, Confirmation } from '@abp/ng.theme.shared';
import { ListService } from '@abp/ng.core';
import { KindOfFALDto } from '../proxy/kind-of-fal';


@Component({
  selector: 'app-kind-of-fal',
  templateUrl: './kind-of-fal.component.html',
  styleUrls: ['./kind-of-fal.component.scss'],
  providers: [ListService]
})
export class KindOfFalComponent implements OnInit{
  isModalOpen = false;
  isEditOpen = false;
  isSearchOpen = false;
  search: string;
  onToggleSearch = new EventEmitter();
  form: FormGroup;
  showInput = false;
  kof: KindOfFALDto[]
  searchTable: string;
  constructor(
    private kofService: KindOfFALService,
    private fb: FormBuilder,
    private confirmation: ConfirmationService,
  ){}
  ngOnInit(): void {
      this.kofService.getList().subscribe(response => {
        this.kof = response;
      })
  }
  getList() {
    this.kofService.getListWhereByKindAndDesAndModifiedby(this.search, this.search, this.search).subscribe(response => {
      this.kof = response;
      this.search = "";
    })
  }
  buildForm(){
    this.form = this.fb.group({
      kindofFal: ['', Validators.required],
      description: ['', Validators.required],
      modifiedBy: ['', Validators.required],
    })
  }
  Search() {
    if (this.searchTable === '') {
      this.ngOnInit();
    }
    else {
      this.kofService.getListWhereByKindAndDesAndModifiedby(this.searchTable, this.searchTable, this.searchTable).subscribe(response => {
        this.kof = response;
      });
    }
    
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
    this.kofService.createList(this.form.value).subscribe(()=> {
      this.isModalOpen = false;
      this.ngOnInit();
    });
  }
  saveEdit(id: string) {
    if(this.form.invalid){
      return;
    }
    this.kofService.updateList(id, this.form.value).subscribe(() => {
      this.isEditOpen = false;
      this.form.reset();
      this.ngOnInit();
    });
  }
  delete(id: string){
    this.confirmation.warn('::Are you sure to delete', '::AreYouSure').subscribe((status) => {
      if (status === Confirmation.Status.confirm){
        this.kofService.delete(id).subscribe(()=> this.ngOnInit());
      } 
    });
  }
  IconSearch() {
    this.showInput = !this.showInput;
  }

  

}
