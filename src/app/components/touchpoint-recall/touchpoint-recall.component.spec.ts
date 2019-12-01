import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TouchpointRecallComponent } from './touchpoint-recall.component';

describe('TouchpointRecallComponent', () => {
  let component: TouchpointRecallComponent;
  let fixture: ComponentFixture<TouchpointRecallComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TouchpointRecallComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TouchpointRecallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
