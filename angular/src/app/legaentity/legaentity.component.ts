import { Component, EventEmitter, OnInit } from '@angular/core';
import { ListService, PagedResultDto } from '@abp/ng.core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LegalEntityService, LegalEntityDto } from '@proxy/legal-entitys'
import { ConfirmationService, Confirmation } from '@abp/ng.theme.shared';

@Component({
  selector: 'app-legaentity',
  templateUrl: './legaentity.component.html',
  styleUrls: ['./legaentity.component.scss'],
})
export class LegaentityComponent implements OnInit {
  legal: LegalEntityDto[];
  isModalOpen = false;
  isEditOpen = false;
  isSearchOpen = false;
  showInput = false;

  currentID: string;
  searchTable: string;
  form: FormGroup;
  constructor(
    private legalService: LegalEntityService,
    private fb: FormBuilder,
    private confirmation: ConfirmationService
  ) { }
  ngOnInit(): void {
    this.legalService.getListLegal().subscribe(response => {
      this.legal = response;
    })
  }
  
  Search() {
    if (this.searchTable === '') {
      this.ngOnInit();
    }
    else {
      this.legalService.getListWhereListByCodeAndDescriptionAndImportBy(this.searchTable, this.searchTable, this.searchTable).subscribe(response => {
        this.legal = response;
      });
    }
    
  }
  create() {
    this.buildForm();
    this.isModalOpen = true;
  }
  editLegal(id: string) {
    this.legalService.getListIDById(id).subscribe(() => {
      this.buildForm();
      this.isEditOpen = true;
      this.currentID = id;

    })

  }
  
  buildForm() {
    this.form = this.fb.group({
      code: ['', Validators.required],
      description: ['', Validators.required],
      importBy: ['', Validators.required],
    })
  }
  saveEdit() {
    if (this.form.invalid) {
      return;
    }
    this.legalService.updateListLegal(this.currentID, this.form.value).subscribe(() => {
      this.isEditOpen = false;

      this.ngOnInit();
    });
  }

  save() {
    if (this.form.invalid) {
      return;
    }
    this.legalService.createListLegal(this.form.value).subscribe(() => {
      this.isModalOpen = false;
      this.ngOnInit();
    });
  }

  delete(id: string) {
    this.confirmation.warn('::Are You Sure To Delete', '::AreYouSure').subscribe((status) => {
      if (status === Confirmation.Status.confirm) {
        this.legalService.deleteLegal(id).subscribe(() => this.ngOnInit());
      }
    });
  }
  IconSearch() {
    this.showInput = !this.showInput;
  }
}
