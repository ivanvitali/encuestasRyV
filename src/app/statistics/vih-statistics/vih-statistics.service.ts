import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable, Subject, BehaviorSubject, combineLatest } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';

import { HivSurvey } from '../../survey/hiv-survey/hiv-survey.model';

@Injectable()
export class VihStatisticsService {

  private totalVihSurveys: number;
  totalVihSurveysChanged = new Subject<number>();

  vihSurvey: HivSurvey;

  surveys$: Observable<any[]>;
  ageFromFilter$: BehaviorSubject<number|null>;
  ageUpToFilter$: BehaviorSubject<number|null>;
  genderFilter$: BehaviorSubject<string|null>;
  answer1FamilyFilter$: BehaviorSubject<boolean|null>;
  answer1SchoolFilter$: BehaviorSubject<boolean|null>;
  

  constructor(private db: AngularFirestore) {
    // const gender$ = new Subject<string>();

    // const queryObservable = gender$.pipe(
    //   switchMap((gender) =>
    //     this.db.collection('vih-survey', ref => ref.where('gender', '==', gender))
    //       .valueChanges()
    //   )
    // );

    // queryObservable.subscribe((surveys) => {
    //   console.log(surveys);
    // });


    this.ageFromFilter$ = new BehaviorSubject(null);
    this.ageUpToFilter$ = new BehaviorSubject(null);
    this.genderFilter$ = new BehaviorSubject(null);
    this.answer1FamilyFilter$ = new BehaviorSubject(null);
    this.answer1SchoolFilter$ = new BehaviorSubject(null);

    this.surveys$ = combineLatest(
      this.ageFromFilter$,
      this.ageUpToFilter$,
      this.genderFilter$,
      this.answer1FamilyFilter$,
      this.answer1SchoolFilter$
    ).pipe(
      switchMap(([ageFrom, ageUpTo, gender, answer1Family, answer1School ]) =>
        this.db.collection('vih-survey', ref => {
          let query : firebase.firestore.CollectionReference | firebase.firestore.Query = ref;
          if (ageFrom) { query = query.where('age', '>=', ageFrom) };
          if (ageUpTo) { query = query.where('age', '<=', ageUpTo) };
          if (gender) { query = query.where('gender', '==', gender) };
          if (answer1Family) { query = query.where('answer1.family', '==', answer1Family) };
          if (answer1School) { query = query.where('answer1.school', '==', answer1School) };
          return query;
        }).valueChanges()
      )
    );

  }

  filterByAgeFrom(ageFrom: number|null) {
    this.ageFromFilter$.next(ageFrom);
    console.log('filtro por edad desde: ', ageFrom, ' ', this.surveys$);
  }

  filterByAgeUpTo(ageUpTo: number|null) {
    this.ageUpToFilter$.next(ageUpTo);
    console.log('filtro por edad hasta: ', ageUpTo, ' ', this.surveys$);
  }

  filterByGender(gender: string|null) {
    this.genderFilter$.next(gender);
    console.log('filtro por genero: ', gender, ' ', this.surveys$);
  }

  filterByAnswer1Family(family: boolean|null) {
    this.answer1FamilyFilter$.next(family);
    console.log('filtro por a1 family: ', family, ' ', this.surveys$);
  }

  filterByAnswer1School(school: boolean|null) {
    this.answer1SchoolFilter$.next(school);
    console.log('filtro por a1 school: ', school, ' ', this.surveys$);
  }

  // setTotalVihSurveys(value: number) {
  //   this.totalVihSurveys = value;
  // }

  // getTotalVihSurveys() {
  //   return this.totalVihSurveys;
  // }

  fetchTotalNumberVihSurveys() {
    this.db
      .collection('vih-survey')
      .valueChanges()
      // .pipe(map((surveysArray) => {
      //   return surveysArray.length;
      // }))
      .subscribe((surveys) => {
        this.totalVihSurveys = surveys.length;
        this.totalVihSurveysChanged.next(this.totalVihSurveys);
        console.log('fetchTotalNumberVihSurveys(): ', surveys.length);
      });
  }

  fetchTotalMenVihSurveys() {
    this.db
      .collection('vih-survey', ref => ref.where('gender', '==', 'Masculino'))
      .valueChanges()
      .subscribe((result) => {
        console.log('total hombres: ',result);
      });
  }

  fetchTotalTeenMenVihSurveys() {
    this.db
      .collection('vih-survey', ref => ref.where('age', '>=', 15)
                                          .where('age', '<=', 17))
      .valueChanges()
      .subscribe((result) => {
        console.log('adolescentes: ', result);
      });
  }

  // private addVihSurveyToDatabase(hivSurvey: HivSurvey) {
  //   this.db
  //       .collection('vih-survey')
  //       .add(hivSurvey);
  // }


  


}
