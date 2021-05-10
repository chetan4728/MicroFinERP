import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SuperheaderComponent } from './superheader.component';




describe('HeaderComponent', () => {
  let component: SuperheaderComponent;
  let fixture: ComponentFixture<SuperheaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuperheaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuperheaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
