import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanCollectionReportComponent } from './loan-collection-report.component';

describe('LoanCollectionReportComponent', () => {
  let component: LoanCollectionReportComponent;
  let fixture: ComponentFixture<LoanCollectionReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoanCollectionReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoanCollectionReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
