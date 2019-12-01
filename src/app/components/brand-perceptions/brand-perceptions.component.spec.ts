import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrandPerceptionsComponent } from './brand-perceptions.component';

describe('BrandPerceptionsComponent', () => {
  let component: BrandPerceptionsComponent;
  let fixture: ComponentFixture<BrandPerceptionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BrandPerceptionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrandPerceptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
