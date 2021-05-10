import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SuperSidebarComponent } from './supersidebar.component';



describe('SidebarComponent', () => {
  let component: SuperSidebarComponent;
  let fixture: ComponentFixture<SuperSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuperSidebarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuperSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
