import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppsurveyComponent } from './appsurvey.component';

describe('AppsurveyComponent', () => {
  let component: AppsurveyComponent;
  let fixture: ComponentFixture<AppsurveyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppsurveyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppsurveyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
