import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Answer1PieComponent } from './answer1-pie.component';

describe('Answer1PieComponent', () => {
  let component: Answer1PieComponent;
  let fixture: ComponentFixture<Answer1PieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Answer1PieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Answer1PieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
