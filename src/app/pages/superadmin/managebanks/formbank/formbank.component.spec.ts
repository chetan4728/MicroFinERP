import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormbankComponent } from './formbank.component';

describe('FormbankComponent', () => {
  let component: FormbankComponent;
  let fixture: ComponentFixture<FormbankComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormbankComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormbankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
