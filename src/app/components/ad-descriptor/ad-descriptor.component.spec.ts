import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdDescriptorComponent } from './ad-descriptor.component';

describe('AdDescriptorComponent', () => {
  let component: AdDescriptorComponent;
  let fixture: ComponentFixture<AdDescriptorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdDescriptorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdDescriptorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
