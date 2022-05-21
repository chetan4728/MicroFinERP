import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthDemandReportComponent } from './month-demand-report.component';

describe('MonthDemandReportComponent', () => {
  let component: MonthDemandReportComponent;
  let fixture: ComponentFixture<MonthDemandReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MonthDemandReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MonthDemandReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
