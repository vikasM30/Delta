import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryBrandHealthComponent } from './category-brand-health.component';

describe('CategoryBrandHealthComponent', () => {
  let component: CategoryBrandHealthComponent;
  let fixture: ComponentFixture<CategoryBrandHealthComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoryBrandHealthComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryBrandHealthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
