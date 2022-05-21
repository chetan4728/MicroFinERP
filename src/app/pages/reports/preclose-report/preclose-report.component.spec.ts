import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrecloseReportComponent } from './preclose-report.component';

describe('PrecloseReportComponent', () => {
  let component: PrecloseReportComponent;
  let fixture: ComponentFixture<PrecloseReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrecloseReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrecloseReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
