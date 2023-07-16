import { ListService } from '@abp/ng.core';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild, ElementRef, Renderer2, NgModule } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { TripInformationService } from '../proxy/trips';
import { ToasterService } from "@abp/ng.theme.shared";
import { NgbDateNativeAdapter, NgbDateAdapter } from '@ng-bootstrap/ng-bootstrap';
import { TripExpenseService } from '../proxy/trip-expenses';
import { ExpenseDetailService } from '../proxy/expense-details';

@Component({
  selector: 'app-trip-information',
  templateUrl: './trip-information.component.html',
  styleUrls: ['./trip-information.component.scss'],
  providers: [
    ListService,
    { provide: NgbDateAdapter, useClass: NgbDateNativeAdapter }]
})
export class TripInformationComponent implements OnInit {
  expense: any
  depart: any
  data: any
  currency: any
  form: FormGroup;
  expenseForm: FormGroup
  expenseDetail: FormGroup
  type = ["DOMESTIC", "OVERSEA"]
  user = ["nhantran12033@gmail.com"]
  html: string[] = [];
  newtrip: string[] = [];
  Unit: any;
  Volume: any;
  currentID: string;
  selectedCode: string;
  selectedExchangeRate: number;
  total: number
  tripp: FormGroup;
  tripIndex: number;
  constructor(
    public readonly list: ListService,
    private trip: TripInformationService,
    private exDetail: ExpenseDetailService,
    private tripExpense: TripExpenseService,
    private http: HttpClient,
    private fb: FormBuilder,
    private toastr: ToasterService,
    private renderer: Renderer2

  ) { }
  ngOnInit(): void {
    this.loadLegal();
    this.loadDepartment();
    this.loadExpense();
    this.loadCurrency();
    this.createForm();
  }
  loadLegal() {
    this.http.get("https://localhost:44384/api/app/legal-entity/legal").subscribe((result) => {
      this.data = result;
    })
  }
  loadDepartment() {
    this.http.get("https://localhost:44384/api/app/department").subscribe((result) => {
      this.depart = result;
    })
  }
  loadExpense() {
    this.http.get("https://localhost:44384/api/app/expense-code").subscribe((result) => {
      this.expense = result;
    })
  }
  loadCurrency() {
    this.http.get("https://localhost:44384/api/app/currency").subscribe((result) => {
      this.currency = result;
    })
  }
  createForm() {
    this.form = this.fb.group({
      operaterName: this.fb.control(''),
      requestNumber: this.fb.control(''),
      requestedDate: this.fb.control(''),
      businessType: this.fb.control(''),
      legalEntity: this.fb.control(''),
      department: this.fb.control(''),
      expenseCode: this.fb.control(''),
      verifierUsername: this.fb.control(''),
      verifierName: this.fb.control(''),
      notes: this.fb.control(''),
      totalAmount: this.fb.control(''),
      TripExpenseDetail: this.fb.array([])
    });
  }

  createTripFormGroup() {
    return new FormGroup({
      purpose: new FormControl(''),
      destination: new FormControl(''),
      checkinTime: new FormControl(''),
      checkoutTime: new FormControl(''),
      totalNights: new FormControl(''),
      ExpenseDetail: new FormArray([
        this.createExpenseDetailFormGroup()
      ])
    });
  }

  createExpenseDetailFormGroup() {
    return new FormGroup({
      item: new FormControl(''),
      specification: new FormControl(''),
      originalCurrency: new FormControl(''),
      equivalentInVND: new FormControl(''),
      notes: new FormControl(''),
      originalUnit: new FormControl(''),
      volume: new FormControl(''),
      originalAmount: new FormControl('')
    });
  }

  addNewTrip() {
    const control = this.form.get('TripExpenseDetail') as FormArray;
    control.push(this.createTripFormGroup());
  }

  removeNewTrip(index) {
    const control = this.form.get('TripExpenseDetail') as FormArray;
    control.removeAt(index);
  }

  addNewDetail(tripIndex) {
    const control = this.form.get(`TripExpenseDetail.${tripIndex}.ExpenseDetail`) as FormArray;
    control.push(this.createExpenseDetailFormGroup());
  }

  removeNewDetail(tripIndex, detailIndex) {
    const control = this.form.get(`TripExpenseDetail.${tripIndex}.ExpenseDetail`) as FormArray;
    control.removeAt(detailIndex);
  }
  get tripExpenseDetail(): FormArray {
    return this.form.get('TripExpenseDetail') as FormArray;
  }

  getExpenseDetail(tripIndex: number): FormArray {
    const tripFormGroup = this.tripExpenseDetail.at(tripIndex) as FormGroup;
    return tripFormGroup.get('ExpenseDetail') as FormArray;
  }
  clickMess() {
    this.toastr.success('Thông báo thành công', 'Đã đưa dữ liệu vào cơ sở dữ liệu');
  }
  save() {
    this.trip.createTripInformation(this.form.value).subscribe((response) => {
      this.currentID = response.notes;
      this.tripExpense.createTrip(this.currentID, this.expenseForm.value).subscribe((result) => {
        this.total = result.totalNights;
        this.exDetail.createList(this.total, this.expenseDetail.value).subscribe(() => {
          this.toastr.success('Thông báo thành công', 'Đã thêm vào dữ liệu')
          this.form.reset();
          this.expenseDetail.reset();
          this.expenseForm.reset();
        })
      })
    })
  }
  onSelectCode(code: string) {
    const selectedRecord = this.currency.find(record => record.code === code);
    if (selectedRecord) {
      this.selectedExchangeRate = selectedRecord.exchangeRate;
    }
  }
  calculateTotalAmount() {
    var totalAmount = 0;
    const Unit = this.expenseDetail.get('originalUnit').value;
    const Volume = this.expenseDetail.get('volume').value;
    this.expenseDetail.get('originalAmount').setValue(Unit * Volume);

    this.expenseDetail.get('equivalentInVND').setValue(Unit * Volume * this.selectedExchangeRate);
    if (this.expenseDetail.get('equivalentInVND').value != '') {
      totalAmount += Unit * Volume * this.selectedExchangeRate
    }
    this.form.get('totalAmount').setValue(totalAmount);
  }
}
  

