import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagebanksComponent } from './managebanks.component';

describe('ManagebanksComponent', () => {
  let component: ManagebanksComponent;
  let fixture: ComponentFixture<ManagebanksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagebanksComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagebanksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
