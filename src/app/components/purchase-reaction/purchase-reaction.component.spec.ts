import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseReactionComponent } from './purchase-reaction.component';

describe('PurchaseReactionComponent', () => {
  let component: PurchaseReactionComponent;
  let fixture: ComponentFixture<PurchaseReactionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PurchaseReactionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchaseReactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
