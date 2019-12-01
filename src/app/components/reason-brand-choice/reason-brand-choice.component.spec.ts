import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReasonBrandChoiceComponent } from './reason-brand-choice.component';

describe('ReasonBrandChoiceComponent', () => {
  let component: ReasonBrandChoiceComponent;
  let fixture: ComponentFixture<ReasonBrandChoiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReasonBrandChoiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReasonBrandChoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
