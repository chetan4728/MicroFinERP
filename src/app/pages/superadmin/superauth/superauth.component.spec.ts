import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperauthComponent } from './superauth.component';

describe('SuperauthComponent', () => {
  let component: SuperauthComponent;
  let fixture: ComponentFixture<SuperauthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuperauthComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuperauthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
