import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { HivSurvey } from './hiv-survey.model';

@Component({
  selector: 'app-hiv-survey',
  templateUrl: './hiv-survey.component.html',
  styleUrls: ['./hiv-survey.component.css']
})
export class HivSurveyComponent implements OnInit {

  constructor() {}

  ngOnInit() {
  }

  onSubmit(hivSurveyForm: NgForm) {
    console.log(hivSurveyForm.form);
    console.log('Saved: ' + JSON.stringify(hivSurveyForm.value));
  }

}
