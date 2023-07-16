import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpenseCodesComponent } from './expense-codes.component';

describe('ExpenseCodesComponent', () => {
  let component: ExpenseCodesComponent;
  let fixture: ComponentFixture<ExpenseCodesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpenseCodesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExpenseCodesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
