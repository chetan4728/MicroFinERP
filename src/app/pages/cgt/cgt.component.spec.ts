import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CgtComponent } from './cgt.component';

describe('CgtComponent', () => {
  let component: CgtComponent;
  let fixture: ComponentFixture<CgtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CgtComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CgtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
