import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsiderationComponent } from './consideration.component';

describe('ConsiderationComponent', () => {
  let component: ConsiderationComponent;
  let fixture: ComponentFixture<ConsiderationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsiderationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsiderationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
