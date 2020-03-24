import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeetableComponent } from './employeetable.component';

describe('EmployeetableComponent', () => {
  let component: EmployeetableComponent;
  let fixture: ComponentFixture<EmployeetableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeetableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeetableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
