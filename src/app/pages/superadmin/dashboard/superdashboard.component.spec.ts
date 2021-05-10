import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SuperDashboardComponent } from './superdashboard.component';



describe('DashboardComponent', () => {
  let component: SuperDashboardComponent;
  let fixture: ComponentFixture<SuperDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuperDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuperDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
