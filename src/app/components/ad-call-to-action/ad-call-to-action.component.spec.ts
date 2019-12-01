import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdCallToActionComponent } from './ad-call-to-action.component';

describe('AdCallToActionComponent', () => {
  let component: AdCallToActionComponent;
  let fixture: ComponentFixture<AdCallToActionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdCallToActionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdCallToActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
