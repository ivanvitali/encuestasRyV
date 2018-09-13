import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Country } from './country.model';
import { HivSurvey } from './hiv-survey.model';
import { State } from './state.model';
import { City } from './city.model';
import { District } from './district.model';
import { FormGroup } from '@angular/forms';

@Injectable()
export class HivSurveyService {

    private availableCountries: Country[] = [];
    countriesChanged = new Subject<Country[]>();

    private availableStates: State[] = [];
    statesChanged = new Subject<State[]>();

    private availableCities: City[] = [];
    citiesChanged = new Subject<City[]>();

    private availableDistricts: District[] = [];
    districtsChanged = new Subject<District[]>();

    constructor(private db: AngularFirestore) {}

    fetchCountries(): void {
        this.db
            .collection('countries')
            .snapshotChanges()
            .pipe(map((docArray) => {
                return docArray.map((doc) => {
                    return { 
                        id: doc.payload.doc.id,
                        ...doc.payload.doc.data()
                    };
                });
            }))
            .subscribe((countries: Country[]) => {
                this.availableCountries = countries;
                this.countriesChanged.next([...this.availableCountries]);
            });
    }

    fetchStates(countryId:string): void {
        this.db
            .collection('countries/'+countryId+'/states')
            .snapshotChanges()
            .pipe(map((docArray) => {
                return docArray.map((doc) => {
                    return { 
                        id: doc.payload.doc.id,
                        ...doc.payload.doc.data()
                    };
                });
            }))
            .subscribe((states: State[]) => {
                this.availableStates = states;
                this.statesChanged.next([...this.availableStates]);
            });
    }

    getAvailableStates(): State[] {
        return this.availableStates;
    }

    fetchCities(countryId:string, stateId:string): void {
        this.db
            .collection('countries/'+countryId+'/states/'+stateId+'/cities')
            .snapshotChanges()
            .pipe(map((docArray) => {
                return docArray.map((doc) => {
                    return { 
                        id: doc.payload.doc.id,
                        ...doc.payload.doc.data()
                    };
                });
            }))
            .subscribe((cities: City[]) => {
                this.availableCities = cities;
                this.citiesChanged.next([...this.availableCities]);
            });
    }

    fetchDistricts(countryId:string, stateId:string, cityId:string): void {
        this.db
            .collection('countries/'+countryId+'/states/'+stateId+'/cities/'+cityId+'/districts')
            .snapshotChanges()
            .pipe(map((docArray) => {
                return docArray.map((doc) => {
                    return { 
                        id: doc.payload.doc.id,
                        ...doc.payload.doc.data()
                    };
                });
            }))
            .subscribe((districts: District[]) => {
                this.availableDistricts = districts;
                this.districtsChanged.next([...this.availableDistricts]);
            });
    }

    // addSurvey(hivSurvey: HivSurvey) {
    //     this.addVihSurveyToDatabase(hivSurvey);
    // }

    // private addVihSurveyToDatabase(hivSurvey: HivSurvey) {
    //     this.db
    //         .collection('vih-survey')
    //         .add(hivSurvey);
    // }

    addVihSurveyFiltered(vihSurvey: HivSurvey, gender: string) {
        if (gender === 'Masculino') {
            this.addManVihSurvey(vihSurvey);
        } else {
            this.addWomanVihSurvey(vihSurvey);
        }
    }
    
    private addManVihSurvey(vihSurvey: HivSurvey) {
        if (vihSurvey.age < 15) {
            this.addManLower15VihSurvey(vihSurvey);
        } else if (vihSurvey.age >= 15 && vihSurvey.age < 18) {
            this.addManBetween1517VihSurvey(vihSurvey);
        } else if (vihSurvey.age >= 18 && vihSurvey.age < 22) {
            this.addManBetween1821VihSurvey(vihSurvey);
        } else if (vihSurvey.age >= 22 && vihSurvey.age < 31) {
            this.addManBetween2230VihSurvey(vihSurvey);
        } else {
            this.addManGreater30VihSurvey(vihSurvey);
        }
        console.log('se ingreso con exito la encuesta filtrada! addManVihSurvey');
    }

    private addManLower15VihSurvey(vihSurvey: HivSurvey) {
        this.db
            .collection('vih-survey-filter/man/12-15')
            .add(vihSurvey);
    }

    private addManBetween1517VihSurvey(vihSurvey: HivSurvey) {
        this.db
            .collection('vih-survey-filter/man/15-17')
            .add(vihSurvey);
    }

    private addManBetween1821VihSurvey(vihSurvey: HivSurvey) {
        this.db
            .collection('vih-survey-filter/man/18-21')
            .add(vihSurvey);
    }

    private addManBetween2230VihSurvey(vihSurvey: HivSurvey) {
        this.db
            .collection('vih-survey-filter/man/22-30')
            .add(vihSurvey);
    }

    private addManGreater30VihSurvey(vihSurvey: HivSurvey) {
        this.db
            .collection('vih-survey-filter/man/31-99')
            .add(vihSurvey);
    }

    private addWomanVihSurvey(vihSurvey: HivSurvey) {
        if (vihSurvey.age < 15) {
            this.addWomanLower15VihSurvey(vihSurvey);
        } else if (vihSurvey.age >= 15 && vihSurvey.age < 18) {
            this.addWomanBetween1517VihSurvey(vihSurvey);
        } else if (vihSurvey.age >= 18 && vihSurvey.age < 22) {
            this.addWomanBetween1821VihSurvey(vihSurvey);
        } else if (vihSurvey.age >= 22 && vihSurvey.age < 31) {
            this.addWomanBetween2230VihSurvey(vihSurvey);
        } else {
            this.addWomanGreater30VihSurvey(vihSurvey);
        }
        console.log('se ingreso con exito la encuesta filtrada! addWomanVihSurvey');
    }

    private addWomanLower15VihSurvey(vihSurvey: HivSurvey) {
        this.db
            .collection('vih-survey-filter/woman/12-15')
            .add(vihSurvey);
    }

    private addWomanBetween1517VihSurvey(vihSurvey: HivSurvey) {
        this.db
            .collection('vih-survey-filter/woman/15-17')
            .add(vihSurvey);
    }

    private addWomanBetween1821VihSurvey(vihSurvey: HivSurvey) {
        this.db
            .collection('vih-survey-filter/woman/18-21')
            .add(vihSurvey);
    }

    private addWomanBetween2230VihSurvey(vihSurvey: HivSurvey) {
        this.db
            .collection('vih-survey-filter/woman/22-30')
            .add(vihSurvey);
    }

    private addWomanGreater30VihSurvey(vihSurvey: HivSurvey) {
        this.db
            .collection('vih-survey-filter/woman/31-99')
            .add(vihSurvey);
    }

}