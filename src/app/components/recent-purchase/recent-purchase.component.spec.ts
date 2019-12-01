import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentPurchaseComponent } from './recent-purchase.component';

describe('RecentPurchaseComponent', () => {
  let component: RecentPurchaseComponent;
  let fixture: ComponentFixture<RecentPurchaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecentPurchaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecentPurchaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
