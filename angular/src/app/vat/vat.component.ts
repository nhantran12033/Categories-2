import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { VATService, VATDTO } from '@proxy/vats'
import { ConfirmationService, Confirmation } from '@abp/ng.theme.shared';
import { NgbDateNativeAdapter, NgbDateAdapter } from '@ng-bootstrap/ng-bootstrap';
import { ListService } from '@abp/ng.core';

@Component({
  selector: 'app-vat',
  templateUrl: './vat.component.html',
  styleUrls: ['./vat.component.scss'],
  providers: [
    ListService,
    { provide: NgbDateAdapter, useClass: NgbDateNativeAdapter }
  ],
})
export class VatComponent implements OnInit {
  vat: VATDTO[];
  isModalOpen = false;
  isEditOpen = false;
  isSearchOpen = false;
  showInput = false;
  currentID: string;
  searchTable: string;

  form: FormGroup;
  constructor(
    public readonly list: ListService,
    private vatService: VATService,
    private fb: FormBuilder,
    private confirmation: ConfirmationService
  ) { }
  ngOnInit(): void {
    this.vatService.getList().subscribe(response => {
      this.vat = response;
    })
  }

  Search() {

    if (this.searchTable === '') {
      this.ngOnInit();
    }
    else {
      this.vatService.getListWhere(parseInt(this.searchTable), parseInt(this.searchTable), this.searchTable, this.searchTable).subscribe(response => {
        this.vat = response;
      });
    }

  }
  create() {
    this.buildForm();
    this.isModalOpen = true;
  }
  editLegal(id: string) {
    this.vatService.getListIDById(id).subscribe(() => {
      this.buildForm();
      this.isEditOpen = true;
      this.currentID = id;

    })

  }

  buildForm() {
    this.form = this.fb.group({
      vaTs: [null, Validators.required],
      vatAxCode: [null, Validators.required],
      description: ['', Validators.required],
      modified: [null, Validators.required],
      modifiedBy: ['', Validators.required]
    })
  }
  saveEdit() {
    if (this.form.invalid) {
      return;
    }
    this.vatService.updateList(this.currentID, this.form.value).subscribe(() => {
      this.isEditOpen = false;

      this.ngOnInit();
    });
  }

  save() {
    if (this.form.invalid) {
      return;
    }
    this.vatService.createList(this.form.value).subscribe(() => {
      this.isModalOpen = false;
      this.form.reset();
      this.list.get();
      this.ngOnInit();
    });
  }

  delete(id: string) {
    this.confirmation.warn('::Are You Sure To Delete', '::AreYouSure').subscribe((status) => {
      if (status === Confirmation.Status.confirm) {
        this.vatService.delete(id).subscribe(() => this.ngOnInit());
      }
    });
  }
  IconSearch() {
    this.showInput = !this.showInput;
  }
}
