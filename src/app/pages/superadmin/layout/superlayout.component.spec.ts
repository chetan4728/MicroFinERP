import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SuperLayoutComponent } from './Superlayout.component';



describe('LayoutComponent', () => {
  let component: SuperLayoutComponent;
  let fixture: ComponentFixture<SuperLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuperLayoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuperLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
