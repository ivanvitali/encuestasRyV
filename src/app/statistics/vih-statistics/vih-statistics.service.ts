import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable, Subject, BehaviorSubject, combineLatest } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';

import { HivSurvey } from '../../survey/hiv-survey/hiv-survey.model';
import { Answer1 } from './answer1.model';

@Injectable()
export class VihStatisticsService {

  private totalVihSurveys: number;
  totalVihSurveysChanged = new Subject<number>();

  // answer1 man 15-17
  answer1FamilyMan1517SurveyNumberChanged = new Subject<number>();
  answer1SchoolMan1517SurveyNumberChanged = new Subject<number>();

  // answer1Statistics: Answer1[];
  // answer1StatisticsChanged = new Subject<Answer1[]>();

  

  // Answer1 Man 15-17
  surveysMan1517Answer1$: Observable<any[]>;

  
  
  man1517Answer1FamilyFilter$: BehaviorSubject<boolean|null>;
  man1517Answer1SchoolFilter$: BehaviorSubject<boolean|null>;

  surveysMan1517Answer1Family: Observable<any[]>;


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

    this.man1517Answer1FamilyFilter$ = new BehaviorSubject(null);
    this.man1517Answer1SchoolFilter$ = new BehaviorSubject(null);

    this.surveysMan1517Answer1$ = combineLatest(
      this.man1517Answer1FamilyFilter$,
      this.man1517Answer1SchoolFilter$
    ).pipe(
      switchMap(([answer1Family, answer1School]) =>
        this.db.collection('vih-survey-filter/man/15-17', ref => {
          let query : firebase.firestore.CollectionReference | firebase.firestore.Query = ref;
          if (answer1Family) { query = query.where('answer1.family', '==', answer1Family) };
          if (answer1School) { query = query.where('answer1.school', '==', answer1School) };
          return query;
        }).valueChanges()
      )
    );


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

  fetchAnswer1FamilyMan1517Survey(): void {
    this.db
        .collection('/vih-survey-filter/man/15-17', ref => ref.where('answer1.family','==', true))
        .valueChanges()
        .subscribe((surveys) => {
          this.answer1FamilyMan1517SurveyNumberChanged.next(surveys.length);
          console.log('fetch answer1 family',surveys);
        });
  }

  fetchAnswer1SchoolMan1517Survey(): void {
    this.db
        .collection('/vih-survey-filter/man/15-17', ref => ref.where('answer1.school','==', true))
        .valueChanges()
        .subscribe((surveys) => {
          this.answer1SchoolMan1517SurveyNumberChanged.next(surveys.length);
          console.log('fetch answer1 school',surveys);
        });
  }

  filterMan1517Answer1ByFamily(family: boolean|null) {
    this.man1517Answer1FamilyFilter$.next(family);
    console.log('filtro man 15-17 por family: ', family, ' ', this.surveysMan1517Answer1$);
  }

  filterMan1517Answer1BySchool(school: boolean|null) {
    this.man1517Answer1SchoolFilter$.next(school);
    console.log('filtro man 15-17 por school: ', school, ' ', this.surveysMan1517Answer1$);
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

  // fetchMan1517Answer1Statistic(): void {
  //   this.db
  //       .collection('/vih-statistics/man15-17/answer1')
  //       .snapshotChanges()
  //       .pipe(map((docArray) => {
  //           return docArray.map((doc) => {
  //               return { 
  //                   //id: doc.payload.doc.id,
  //                   ...doc.payload.doc.data()
  //               };
  //           });
  //       }))
  //       .subscribe((answer1: Answer1[]) => {
  //           this.answer1Statistics = answer1;
  //           this.answer1StatisticsChanged.next([...this.answer1Statistics]);
  //       });
  // }

  updateStatisticAnswer1(countNumber: number, genderRange: string, docId: string) {
    this.db
      .collection('/vih-statistics/'+genderRange+'/answer1')
      .doc(docId)
      .update({
        y: countNumber
      });
  }
  
}
