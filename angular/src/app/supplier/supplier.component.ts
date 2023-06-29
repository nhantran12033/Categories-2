import { ListService } from '@abp/ng.core';
import { Confirmation, ConfirmationService } from '@abp/ng.theme.shared';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { SupplierDto, SupplierService } from '../proxy/suppliers';

@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.scss'],
  providers: [ListService],
})
export class SupplierComponent implements OnInit {
  isModelOpen = false;
  isEditOpen = false;
  currentID: string;
  sup: SupplierDto[];
  form: FormGroup;
  showInput = false;
  searchTable: string;
  data: any;
  
  selectedLegalEntityDescriptions: string[] = [];
  selectedSupplier: string[] = [];

  constructor(
    public readonly list: ListService,
    private supplierService: SupplierService,
    private fb: FormBuilder,
    private confirmation: ConfirmationService,
    private http: HttpClient
  ) { }
 
  ngOnInit(): void {
    this.supplierService.getList().subscribe(response => {
      this.sup = response;
    })
    this.loadLegal();
  }
  Search() {
    if (this.searchTable === '') {
      this.ngOnInit();
    }
    else {
      this.supplierService.getListWhere(this.searchTable, this.searchTable, this.searchTable, this.searchTable, this.searchTable,
        this.searchTable, this.searchTable, this.searchTable, this.searchTable, this.searchTable, this.searchTable, this.searchTable).subscribe(response => {
        this.sup = response;
      });
    }
  }
  onLegalEntityChange(code: string) {
    
    this.selectedLegalEntityDescriptions = this.data.filter(item => item.code === code).map(item => item.description);
  }
  loadLegal() {
    this.http.get("https://localhost:44384/api/app/legal-entity/legal").subscribe((result) => {
      this.data = result;
    })
  }
  create() {
    this.buildForm();
    this.isModelOpen = true;
  }
  edit(id: string) {
    this.supplierService.getIDList(id).subscribe(() => {
      this.buildForm();
      this.isEditOpen = true;
      this.currentID = id;
    })
  }
  buildForm() {
    this.form = this.fb.group({
      code: ['', Validators.required],
      description: ['', Validators.required],
      vendorAccount: ['', Validators.required],
      vendorName: ['', Validators.required],
      vendorHold: ['', Validators.required],
      beneficiaryName: ['', Validators.required],
      beneficiaryAccount: ['', Validators.required],
      beneficiaryBankName: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', Validators.required],
      taxCode: ['', Validators.required],
      importBy: ['', Validators.required],
    })
  }
  save() {
    if (this.form.invalid) {
      return;
    }
    this.supplierService.createList(this.form.value).subscribe(() => {
      this.isModelOpen = false;
      this.form.reset();
      this.list.get();
      this.ngOnInit();
    });
  }
  saveEdit() {
    this.supplierService.updateList(this.currentID, this.form.value).subscribe(() => {
      this.isEditOpen = false;
      this.form.reset();
      this.list.get();
      this.ngOnInit();
    })
  }
  delete(id: string) {
    this.confirmation.warn('::Are You Sure To Delete', '::AreYouSure').subscribe((status) => {
      if (status === Confirmation.Status.confirm) {
        this.supplierService.deleteList(id).subscribe(() => this.ngOnInit());
      }
    });
  }
  IconSearch() {
    this.showInput = !this.showInput;
  }
}
