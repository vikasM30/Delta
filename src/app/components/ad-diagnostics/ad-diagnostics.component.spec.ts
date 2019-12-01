import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdDiagnosticsComponent } from './ad-diagnostics.component';

describe('AdDiagnosticsComponent', () => {
  let component: AdDiagnosticsComponent;
  let fixture: ComponentFixture<AdDiagnosticsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdDiagnosticsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdDiagnosticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
