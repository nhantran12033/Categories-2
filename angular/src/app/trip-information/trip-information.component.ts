import { ListService } from '@abp/ng.core';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TripInformationService } from '../proxy/trips';
import { ToasterService } from "@abp/ng.theme.shared";
import { NgbDateNativeAdapter, NgbDateAdapter } from '@ng-bootstrap/ng-bootstrap';
import { TripExpenseService } from '../proxy/trip-expenses';

@Component({
  selector: 'app-trip-information',
  templateUrl: './trip-information.component.html',
  styleUrls: ['./trip-information.component.scss'],
  providers: [
    ListService,
    { provide: NgbDateAdapter, useClass: NgbDateNativeAdapter }],
})
export class TripInformationComponent implements OnInit {
  expense: any
  depart: any
  data: any
  currency: any
  form: FormGroup;
  expenseForm: FormGroup
  type = ["DOMESTIC", "OVERSEA"]
  user = ["nhantran12033@gmail.com"]
  html: string[] = [];
  newtrip: string[] = [];
  Unit: any;
  Volume: any;
  currentID: string;
  selectedCode: string;
  selectedExchangeRate: number;
  constructor(
    public readonly list: ListService,
    private trip: TripInformationService,
    private tripExpense: TripExpenseService,
    private http: HttpClient,
    private fb: FormBuilder,
    private FB: FormBuilder,
    private toastr: ToasterService,
    private renderer: Renderer2

  ) { }
  ngOnInit(): void {
    this.loadLegal();
    this.loadDepartment();
    this.loadExpense();
    this.loadCurrency();

    
    this.buildForm();
    this.buildExpense();
    
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

  buildForm() {
    this.form = this.fb.group({
      operaterName: ['', Validators.required],
      requestNumber: ['', Validators.required],
      requestedDate: [null, Validators.required],
      businessType: ['', Validators.required],
      legalEntity: ['', Validators.required],
      department: ['', Validators.required],
      expenseCode: ['', Validators.required],
      verifierUsername: ['', Validators.required],
      verifierName: ['', Validators.required],
      notes: ['', Validators.required],
      totalAmount: [null, Validators.required],
    })
  }
  buildExpense() {
    this.expenseForm = this.fb.group({
      purpose: ['', Validators.required],
      destination: ['', Validators.required],
      checkinTime: [null, Validators.required],
      checkoutTime: [null, Validators.required],
      totalNights: [null, Validators.required],
      item: ['', Validators.required],
      specification: ['', Validators.required],
      originalCurrency: ['', Validators.required],
      equivalentInVND: [null, Validators.required],
      notes: ['', Validators.required],
      originalUnit: [null, Validators.required],
      volume: [null, Validators.required],
      originalAmount: [null, Validators.required],
      totalAmount: [null, Validators.required],
      })


  }
  
  clickMess() {
    this.toastr.success('Thông báo thành công', 'Đã đưa dữ liệu vào cơ sở dữ liệu');
  }
  save() {
    this.trip.createTripInformation(this.form.value).subscribe((response) => {
      this.currentID = response.notes;
      this.tripExpense.createTrip(this.currentID, this.expenseForm.value).subscribe(() => {
        this.toastr.success('Thông báo thành công', 'Đã đưa dữ liệu tripEx vào cơ sở dữ liệu');
        this.form.reset();
        this.expenseForm.reset();
      })
    })
    
    
  }
  
  addNewDetail() {
    const newDetail = '<tr> <td style="border: 1px solid black";><i class="fa fa-trash"></i></td> <td style="border: 1px solid black"> <input style="height:90px;width:120px" /> </td> <td style="border: 1px solid black"> <input style="height: 90px; width: 120px" /> </td> <td style="border: 1px solid black"> <input style="width:120px" /> </td> <td style="border: 1px solid black"> <input style="width:120px" /> </td> <td style="border: 1px solid black"> <input style="width:120px" /> </td> <td style="border: 1px solid black"> <input style="width:120px" /> </td> <td style="border: 1px solid black"> <input style="width:120px" /> </td> <td style="border: 1px solid black"> <input style="height: 80px; width: 115px" /> </td> </tr>';
    this.html.push(newDetail);

  }
  remove(index: number) {
    this.html.splice(index, 1)
  }
  addNewTrip() {
    const newTrip = '<div class="form-body"> <div></div> <div class="form-item"> <div class="item-2"> <label>Purpose *<span>(Max 3999 characters)</span></label> <br /> <input /> </div> <div class="item-2"> <label>Purpose *<span>(Max 3999 characters)</span></label><br /> <input /> </div> <div class="item-3"> <label>Check-in time *</label><span> (dd-mm-yyyy) </span><br /> <input #datepicker="ngbDatepicker" name="datepicker" ngbDatepicker (click)="datepicker.toggle()" /> </div> <div class="item-3"> <label>Check-out time *</label><span> (dd-mm-yyyy) </span><br /> <input #datepicker="ngbDatepicker" name="datepicker" ngbDatepicker (click)="datepicker.toggle()" /> </div> <div class="item-3"> <label>Total nights</label><br /> <input placeholder="0 night"/> </div> </div> <div class="form-table"> <table border="1"> <thead> <tr> <th></th> <th> Item <span>*</span> <br /> <span style="font-size:9px">(Max 999 chacters)</span> </th> <th>Specification <br /><span style="font-size:9px">(Max 999 chacters)</span></th> <th>Original Currency <span>*</span></th> <th>Original Unit <span>*</span></th> <th>Volume <span>*</span></th> <th>Original Amount</th> <th>Equivalent in VND</th> <th>Notes <br /><span style="font-size:9px">(Max 999 chacters)</span></th> </tr> </thead> <tr> <td><button><i class="fa fa-trash"></i></button></td> <td> <input style="height:90px;width:120px" /> </td> <td> <input style="height: 90px; width: 120px" /> </td> <td> <input style="width:120px" /> </td> <td> <input style="width:120px" /> </td> <td> <input style="width:120px" /> </td> <td> <input style="width:120px" /> </td> <td> <input style="width:120px" /> </td> <td> <input style="height: 80px; width: 115px" /> </td> </tr> <tbody *ngFor="let table of html; let i = index"> <tr> <td><button (click)="remove(i)"><i class="fa fa-trash"></i></button></td> <td> <input style="height:90px;width:120px" /> </td> <td> <input style="height: 90px; width: 120px" /> </td> <td> <input style="width:120px" /> </td> <td> <input style="width:120px" /> </td> <td> <input style="width:120px" /> </td> <td> <input style="width:120px" /> </td> <td> <input style="width:120px" /> </td> <td> <input style="height: 80px; width: 115px" /> </td> </tr> </tbody> <tr> <td colspan="7" style="text-align:right;font-weight:bolder">Total Amount</td> <td style="text-align: right; font-weight: bolder">{{ 0 }}</td> <td>included 10% VAT</td> </tr> </table> </div> <div class="button-add"> <button class="btn btn-primary" (click)="addNewDetail()"> <span>{{ "::Add new detail" | abpLocalization }}</span> </button> </div> </div>';
    this.newtrip.push(newTrip);
  }
  removeTrip(index: number) {
    this.newtrip.splice(index, 1)
  }
  onSelectCode(code: string) {
    const selectedRecord = this.currency.find(record => record.code === code);
    if (selectedRecord) {
      this.selectedExchangeRate = selectedRecord.exchangeRate;
    }
  }
  calculateTotalAmount() {
    const Unit = this.expenseForm.get('originalUnit').value;
    const Volume = this.expenseForm.get('volume').value;
    

    this.expenseForm.get('totalAmount').setValue(Unit * Volume * this.selectedExchangeRate);

    this.form.get('totalAmount').setValue(Unit * Volume * this.selectedExchangeRate);

    this.expenseForm.get('originalAmount').setValue(Unit * Volume);

    this.expenseForm.get('equivalentInVND').setValue(Unit * Volume * this.selectedExchangeRate);
  }
}
  

