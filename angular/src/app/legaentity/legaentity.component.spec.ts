import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LegaentityComponent } from './legaentity.component';

describe('LegaentityComponent', () => {
  let component: LegaentityComponent;
  let fixture: ComponentFixture<LegaentityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LegaentityComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LegaentityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
