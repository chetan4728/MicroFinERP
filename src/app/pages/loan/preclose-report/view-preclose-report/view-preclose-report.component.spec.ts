import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPrecloseReportComponent } from './view-preclose-report.component';

describe('ViewPrecloseReportComponent', () => {
  let component: ViewPrecloseReportComponent;
  let fixture: ComponentFixture<ViewPrecloseReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewPrecloseReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewPrecloseReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
