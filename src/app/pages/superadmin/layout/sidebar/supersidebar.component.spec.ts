import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SupersidebarComponent } from './supersidebar.component';




describe('SidebarComponent', () => {
  let component: SupersidebarComponent;
  let fixture: ComponentFixture<SupersidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupersidebarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SupersidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
