import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlcComponent } from './blc.component';

describe('BlcComponent', () => {
  let component: BlcComponent;
  let fixture: ComponentFixture<BlcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlcComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BlcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
