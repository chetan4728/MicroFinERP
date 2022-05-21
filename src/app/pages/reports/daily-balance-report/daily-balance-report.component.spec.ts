import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyBalanceReportComponent } from './daily-balance-report.component';

describe('DailyBalanceReportComponent', () => {
  let component: DailyBalanceReportComponent;
  let fixture: ComponentFixture<DailyBalanceReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DailyBalanceReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DailyBalanceReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
