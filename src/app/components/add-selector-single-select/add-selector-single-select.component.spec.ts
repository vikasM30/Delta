import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSelectorSingleSelectComponent } from './add-selector-single-select.component';

describe('AddSelectorSingleSelectComponent', () => {
  let component: AddSelectorSingleSelectComponent;
  let fixture: ComponentFixture<AddSelectorSingleSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddSelectorSingleSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSelectorSingleSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
