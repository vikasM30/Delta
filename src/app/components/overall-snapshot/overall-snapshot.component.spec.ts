import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OverallSnapshotComponent } from './overall-snapshot.component';

describe('OverallSnapshotComponent', () => {
  let component: OverallSnapshotComponent;
  let fixture: ComponentFixture<OverallSnapshotComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OverallSnapshotComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OverallSnapshotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
