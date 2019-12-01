import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReasonRecentPurchaseComponent } from './reason-recent-purchase.component';

describe('ReasonRecentPurchaseComponent', () => {
  let component: ReasonRecentPurchaseComponent;
  let fixture: ComponentFixture<ReasonRecentPurchaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReasonRecentPurchaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReasonRecentPurchaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
