import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SuperfooterComponent } from './superfooter.component';




describe('FooterComponent', () => {
  let component: SuperfooterComponent;
  let fixture: ComponentFixture<SuperfooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuperfooterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuperfooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
