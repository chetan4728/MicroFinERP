import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SuperHeaderComponent } from './superheader.component';



describe('HeaderComponent', () => {
  let component: SuperHeaderComponent;
  let fixture: ComponentFixture<SuperHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuperHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuperHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
