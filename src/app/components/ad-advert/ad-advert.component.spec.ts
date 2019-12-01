import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdAdvertComponent } from './ad-advert.component';

describe('AdAdvertComponent', () => {
  let component: AdAdvertComponent;
  let fixture: ComponentFixture<AdAdvertComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdAdvertComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdAdvertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
