import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ValenbisiListComponent } from './valenbisi-list.component';

describe('ValenbisiListComponent', () => {
  let component: ValenbisiListComponent;
  let fixture: ComponentFixture<ValenbisiListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ValenbisiListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValenbisiListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
