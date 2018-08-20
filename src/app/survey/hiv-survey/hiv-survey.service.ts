import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable, Subject } from 'rxjs';
import { map, count } from 'rxjs/operators';
import { Country } from './country.model';
import { HivSurvey } from './hiv-survey.model';
import { State } from './state.model';

@Injectable()
export class HivSurveyService {

    private availableCountries: Country[] = [];
    countriesChanged = new Subject<Country[]>();

    private availableStates: State[] = [];
    statesChanged = new Subject<State[]>();

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
                console.log('fetchCountries(): ',countries);
                this.availableCountries = countries;
                this.countriesChanged.next([...this.availableCountries]);
            });
    }

    fetchStates(id:string): void {
        this.db
            .collection('countries/'+id+'/states')
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
                console.log('fetchStates(id): ',states);
                this.availableStates = states;
                this.statesChanged.next([...this.availableStates]);
            });
    }

    getAvailableStates(): State[] {
        return this.availableStates;
    }

    getCountries() {
        return this.db
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
            .subscribe((result) => {
                console.log(result);
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

    getCountryArgentina() {
        return this.db
            .collection('countries', ref => ref.where('name', '==', 'Argentina'))
            .snapshotChanges()
            .pipe(map((docArray) => {
                return docArray.map((doc) => {
                    return {
                        id: doc.payload.doc.id,
                        ...doc.payload.doc.data()
                    };
                });
            }));
    }

    // getCountryId() {
    //     return this.db
    //         .collection('countries', ref => ref.where('name', '==', 'Argentina'))
    //         .snapshotChanges()
    //         .pipe(map((docArray) => docArray.map((doc) => {
    //             const id = doc.payload.doc.id;
    //             return id;
    //         })));
    // }

    getStates(id:string) {
        return this.db
            .collection('countries/'+id+'/states')
            .snapshotChanges()
            .pipe(map((docArray) => {
                return docArray.map((doc) => {
                    return {
                        id: doc.payload.doc.id,
                        ...doc.payload.doc.data()
                    };
                });
            }));
    }
}