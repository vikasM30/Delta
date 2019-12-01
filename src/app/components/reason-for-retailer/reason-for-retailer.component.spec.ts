import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReasonForRetailerComponent } from './reason-for-retailer.component';

describe('ReasonForRetailerComponent', () => {
  let component: ReasonForRetailerComponent;
  let fixture: ComponentFixture<ReasonForRetailerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReasonForRetailerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReasonForRetailerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
