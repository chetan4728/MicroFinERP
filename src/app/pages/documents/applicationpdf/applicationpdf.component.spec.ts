import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationpdfComponent } from './applicationpdf.component';

describe('ApplicationpdfComponent', () => {
  let component: ApplicationpdfComponent;
  let fixture: ComponentFixture<ApplicationpdfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApplicationpdfComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicationpdfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
