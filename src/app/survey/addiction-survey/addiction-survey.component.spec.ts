import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddictionSurveyComponent } from './addiction-survey.component';

describe('AddictionSurveyComponent', () => {
  let component: AddictionSurveyComponent;
  let fixture: ComponentFixture<AddictionSurveyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddictionSurveyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddictionSurveyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
