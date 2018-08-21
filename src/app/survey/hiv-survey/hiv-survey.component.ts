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
import { City } from './city.model';
import { District } from './district.model';
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

  cities: City[];
  citySubscription: Subscription;

  districts: District[];
  districtSubscription: Subscription;

  showStateSelectInputField: boolean = false;
  showCitySelectInputField: boolean = false;
  showDistrictSelectInputField: boolean = false;

  private countryIdSelected: string;
  private stateIdSelected: string;
  private cityIdSelected: string;

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
      location: new FormGroup({
        country: new FormControl('', Validators.required),
        state: new FormControl('', Validators.required),
        city: new FormControl('', Validators.required),
        district: new FormControl('', Validators.required)
      })
      
    });

    this.countrySubscription = this.hivSurveyService.countriesChanged
      .subscribe((availableCountries) => {
        this.countries = availableCountries;
      });
    
    this.stateSubscription = this.hivSurveyService.statesChanged
      .subscribe((availableStates) => {
        this.states = availableStates;
      });
    
    this.citySubscription = this.hivSurveyService.citiesChanged
      .subscribe((availableCities) => {
        this.cities = availableCities;
      });

    this.districtSubscription = this.hivSurveyService.districtsChanged
      .subscribe((availableDistricts) => {
        this.districts = availableDistricts;
      });
    
    this.hivSurveyService.fetchCountries();


    this.hivSurveyForm
      .get('location.country')
      .valueChanges
      .subscribe((value) => {
        if (value) {
          // get CountryID
          let countryId:string = this.getCountryId(this.countries, value);
          // fetch states by countryId
          this.hivSurveyService.fetchStates(countryId);

          if (countryId) {
            this.setCoutryId(countryId);
            this.showStateSelectInputField = true;
          } else {
            this.showStateSelectInputField = false;
          }
        }
      });
    
    this.hivSurveyForm
      .get('location.state')
      .valueChanges
      .subscribe((value) => {
        if (value) {
          // get StateID
          let stateId:string = this.getStateId(this.states, value);

          // fetch cities by countryId and stateId
          this.hivSurveyService.fetchCities(this.countryIdSelected, stateId );

          if (stateId) {
            this.setStateId(stateId);
            this.showCitySelectInputField = true;
          } else {
            this.showCitySelectInputField = false;
          }
        }
      });
    
    this.hivSurveyForm
      .get('location.city')
      .valueChanges
      .subscribe((value) => {
        if (value) {
          // get CityID
          let cityId:string = this.getCityId(this.cities, value);

          // fetch districts by countryId, stateID and cityId
          this.hivSurveyService.fetchDistricts(this.countryIdSelected, this.stateIdSelected, cityId );

          if (cityId) {
            this.setCityId(cityId);
            this.showDistrictSelectInputField = true;
          } else {
            this.showDistrictSelectInputField = false;
          }
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
    return this.getLocationByName(countries, name).id;    
  }

  setCoutryId(value: string):void {
    this.countryIdSelected = value;
  }

  getStateId(states: State[], name: string): string {
    return this.getLocationByName(states, name).id;    
  }

  setStateId(value: string):void {
    this.stateIdSelected = value;
  }

  getCityId(cities: City[], name: string): string {
    return this.getLocationByName(cities, name).id;    
  }

  setCityId(value: string):void {
    this.cityIdSelected = value;
  }

  private getLocationByName(location: any[], name: string): any {
    for (let index = 0; index < location.length; index++) {
      if (location[index].name === name) {
        return location[index];
      }
    }
  }

  ngOnDestroy() {
    this.countrySubscription.unsubscribe();
    this.stateSubscription.unsubscribe();
    this.citySubscription.unsubscribe();
    this.districtSubscription.unsubscribe();
  }

}
