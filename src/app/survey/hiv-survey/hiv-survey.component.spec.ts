import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HivSurveyComponent } from './hiv-survey.component';

describe('HivSurveyComponent', () => {
  let component: HivSurveyComponent;
  let fixture: ComponentFixture<HivSurveyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HivSurveyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HivSurveyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
