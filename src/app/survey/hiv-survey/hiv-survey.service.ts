import { HivSurvey } from './hiv-survey.model';
import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs';

@Injectable()
export class HivSurveyService {
    constructor(private db: AngularFirestore) {
    }

    getCountries(): Observable<any> {
        return this.db.collection('countries').valueChanges();
    }
}