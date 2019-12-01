import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdSelectorComponent } from './ad-selector.component';

describe('AdSelectorComponent', () => {
  let component: AdSelectorComponent;
  let fixture: ComponentFixture<AdSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdSelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
