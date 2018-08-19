import { Component, OnInit } from '@angular/core';
import {
  FormGroup, 
  FormControl,
  Validators,
  FormArray
} from '@angular/forms';

import { HivSurvey } from './hiv-survey.model';
import { HivSurveyService } from './hiv-survey.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-hiv-survey',
  templateUrl: './hiv-survey.component.html',
  styleUrls: ['./hiv-survey.component.css']
})
export class HivSurveyComponent implements OnInit {

  hivSurveyForm: FormGroup;
  hivSurvey: HivSurvey = new HivSurvey();

  countries: Observable<any>;

  // hivSurveyForm = new FormGroup({
  //   email: new FormControl('', Validators.email),
  //   age: new FormControl('', Validators.required),
  //   gender: new FormControl('', Validators.required),
  //   civilStatus: new FormControl('', Validators.required),
  //   instruction: new FormControl(),



  //   // answer1: new FormArray({
      
  //   // }),

  //   question3: new FormGroup({
  //     answer: new FormControl('', Validators.required),
  //     motive: new FormControl('', Validators.required)
  //   }),
    

  //   answer4: new FormControl()
  // });

  // question3 = new FormGroup({
  //   answer3: new FormControl('', Validators.required),
  //   motive: new FormControl('', Validators.required)
  // })

  // get answer1() {
  //   return this.hivSurveyForm.get('answer1');
  // }

  // get answer3() {
  //   return this.hivSurveyForm.get('question3.answer');
  // }

  // get answer4() {
  //   return this.hivSurveyForm.get('answer4');
  // }

  get age() {
    return this.hivSurveyForm.get('age');
  }

  get email() {
    return this.hivSurveyForm.get('email');
  }

  get gender() {
    return this.hivSurveyForm.get('gender');
  }
  
  get civilStatus() {
    return this.hivSurveyForm.get('civilStatus');
  }

  civilStatusList = [
    { id: 1,
      status: 'Soltero'
    },
    { id: 2,
      status: 'Casado'
    },
    { id: 3,
      status: 'Viudo'
    },
    { id: 4,
      status: 'Separado'
    },
    { id: 5,
      status: 'Pareja'
    }
  ];

  private isEmptyFieldEmail(form: FormGroup) {
    return (form.get('email').value === "" || form.get('email').value === null) ? true : false;
  }

  constructor(private hivSurveyService: HivSurveyService) {}

  ngOnInit(): void {
    this.hivSurveyForm = new FormGroup({
      email: new FormControl('', Validators.email),
      age: new FormControl('', [Validators.required, Validators.pattern('^[1-9]+[0-9]*$')]),
      gender: new FormControl('', Validators.required),
      civilStatus: new FormControl('', Validators.required),
      instruction: new FormControl()
    });

    this.countries = this.hivSurveyService.getCountries();
  }

  onSubmit(hivSurveyForm: FormGroup) {

    if (this.isEmptyFieldEmail(hivSurveyForm)) {
      delete hivSurveyForm.value['email'];
    }
    console.log(hivSurveyForm.value);
  }

}
