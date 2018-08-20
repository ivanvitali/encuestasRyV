import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  FormGroup, 
  FormControl,
  Validators,
  FormArray
} from '@angular/forms';

import { HivSurvey } from './hiv-survey.model';
import { Country } from './country.model';
import { State } from './state.model';
import { HivSurveyService } from './hiv-survey.service';
import { Observable, Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-hiv-survey',
  templateUrl: './hiv-survey.component.html',
  styleUrls: ['./hiv-survey.component.css']
})
export class HivSurveyComponent implements OnInit, OnDestroy {

  hivSurveyForm: FormGroup;
  hivSurvey: HivSurvey = new HivSurvey();

  countries: Country[];
  countrySubscription: Subscription;
  //states: Observable<any[]>;
  states: State[];
  stateSubscription: Subscription;

  showStatesSelectInputField: boolean = false;

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
      instruction: new FormControl('', Validators.required),
      country: new FormControl('', Validators.required),
      state: new FormControl('', Validators.required)
    });

    this.countrySubscription = this.hivSurveyService.countriesChanged
      .subscribe((availableCountries) => {
        this.countries = availableCountries;
        // console.log('countries: ',this.countries);
      });
    
    this.stateSubscription = this.hivSurveyService.statesChanged
      .subscribe((availableStates) => {
        this.states = availableStates;
        // console.log('countries: ',this.countries);
      });
    
    this.hivSurveyService.fetchCountries();


    this.hivSurveyForm
      .get('country')
      .valueChanges
      .subscribe((value) => {
        // get CountryID
        let countryId:string = this.getCountryId(this.countries, value);
        // fetch states
        this.hivSurveyService.fetchStates(countryId);

        if (countryId) {
          this.showStatesSelectInputField = true;
        } else {
          this.showStatesSelectInputField = false;
        }
        
      });

    //test
    this.hivSurveyService.getTest();
    this.hivSurveyService.getTest2();
  }

  onSubmit(hivSurveyForm: FormGroup) {

    if (this.isEmptyFieldEmail(hivSurveyForm)) {
      delete hivSurveyForm.value['email'];
    }
    console.log(hivSurveyForm.value);
  }

  getCountryId(countries: Country[], name: string): string {
    return this.getCountryByName(countries, name).id;    
  }

  private getCountryByName(countries: Country[], name: string): Country {
    for (let index = 0; index < countries.length; index++) {
      if (countries[index].name === name) {
        return countries[index];
      }
    }
  }

  ngOnDestroy() {
    this.countrySubscription.unsubscribe();
    this.stateSubscription.unsubscribe();
  }

}
