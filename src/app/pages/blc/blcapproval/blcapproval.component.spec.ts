import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlcapprovalComponent } from './blcapproval.component';

describe('BlcapprovalComponent', () => {
  let component: BlcapprovalComponent;
  let fixture: ComponentFixture<BlcapprovalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlcapprovalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BlcapprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
