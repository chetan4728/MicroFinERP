import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AreasurveyComponent } from './areasurvey.component';

describe('AreasurveyComponent', () => {
  let component: AreasurveyComponent;
  let fixture: ComponentFixture<AreasurveyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AreasurveyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AreasurveyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
