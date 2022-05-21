import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectionBalanceSheetComponent } from './collection-balance-sheet.component';

describe('CollectionBalanceSheetComponent', () => {
  let component: CollectionBalanceSheetComponent;
  let fixture: ComponentFixture<CollectionBalanceSheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CollectionBalanceSheetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CollectionBalanceSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
