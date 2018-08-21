import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable, Subject } from 'rxjs';
import { map, count } from 'rxjs/operators';
import { Country } from './country.model';
import { HivSurvey } from './hiv-survey.model';
import { State } from './state.model';
import { City } from './city.model';
import { District } from './district.model';

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

    getTest(): void {
        this.db
            .collection('countries')
            .valueChanges()
            .subscribe(
                (result) => {
                    console.log('test: ', result);
                }
            )
    }

    getTest2(): void {
        this.db
            .collection('countries')
            .snapshotChanges()
            .pipe(map(
                (docArray) => {
                    return docArray.map(
                        (doc) => {
                            return {
                                id: doc.payload.doc.id,
                                ...doc.payload.doc.data()
                            }
                        }
                    )
                }
            ))
            .subscribe(
                (result) => {
                    // for (const res of result) {
                    //     console.log(res.payload.doc.data());
                    // }
                    console.log('test2: ', result);
                }
            )
    }

}