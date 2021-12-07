import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Cgt1Component } from './cgt1.component';

describe('Cgt1Component', () => {
  let component: Cgt1Component;
  let fixture: ComponentFixture<Cgt1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Cgt1Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Cgt1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
