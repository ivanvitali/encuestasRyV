import { Component, OnInit, OnDestroy } from '@angular/core';
import { VihStatisticsService } from './vih-statistics.service';
import {  Subscription, Observable } from 'rxjs';

@Component({
  selector: 'app-vih-statistics',
  templateUrl: './vih-statistics.component.html',
  styleUrls: ['./vih-statistics.component.css']
})
export class VihStatisticsComponent implements OnInit, OnDestroy {

  totalVihSurveys: number;
  totalVihSurveysSubscription: Subscription;

  // obtener colleccion de hombres entre 15-17 años para la respuesta1
  surveysMan1517Answer1: any[];
  // surveysMan1517Answer1FamilySubscription: Subscription;
  // surveysMan1517Answer1SchoolSubscription: Subscription;

  // answer1 man 15-17
  answer1FamilyMan1517SurveyNumberSubscription: Subscription;
  answer1SchoolMan1517SurveyNumberSubscription: Subscription;

  vihSurveysFiltered: any[];
  vihSurveysFilteredSubscription: Subscription;


  constructor(private vihStatisticsService: VihStatisticsService) { }

  ngOnInit() {
    //this.vihStatisticsService.filterMan1517Answer1ByFamily(true);
    //this.vihStatisticsService.filterMan1517Answer1BySchool(true);

    this.vihStatisticsService.fetchAnswer1FamilyMan1517Survey();
    this.vihStatisticsService.fetchAnswer1SchoolMan1517Survey();


    this.totalVihSurveysSubscription = this.vihStatisticsService.totalVihSurveysChanged
      .subscribe((totalVihSurveys) => {
        this.totalVihSurveys = totalVihSurveys;
        console.log('cantidad total de encuestas: ', this.totalVihSurveys);
      });
    
    this.answer1FamilyMan1517SurveyNumberSubscription = this.vihStatisticsService.answer1FamilyMan1517SurveyNumberChanged
      .subscribe((surveysNumber: number) => {
        // this.totalVihSurveys = totalVihSurveys;
        console.log('familias answer1 man 15-17: ', surveysNumber);
        this.vihStatisticsService.updateStatisticAnswer1(surveysNumber, 'man15-17','family');
      });
    
    this.answer1SchoolMan1517SurveyNumberSubscription = this.vihStatisticsService.answer1SchoolMan1517SurveyNumberChanged
      .subscribe((surveysNumber: number) => {
        // this.totalVihSurveys = totalVihSurveys;
        console.log('school answer1 man 15-17: ', surveysNumber);
        this.vihStatisticsService.updateStatisticAnswer1(surveysNumber, 'man15-17','school');
      });
    
    // this.surveysMan1517Answer1FamilySubscription = this.vihStatisticsService.surveysMan1517Answer1$
    //   .subscribe((surveys) => {
    //     this.surveysMan1517Answer1 = surveys;
        
    //     this.vihStatisticsService.updateStatisticAnswer1(surveys.length, 'man15-17', 'family');
    //     console.log('cantidad total hombres 15-17 que reciben info por familia: ', surveys.length);
    //     //this.vihStatisticsService.filterMan1517Answer1BySchool(true);
    //   });
    
    // this.surveysMan1517Answer1SchoolSubscription = this.vihStatisticsService.surveysMan1517Answer1$
    //   .subscribe((surveys) => {
    //     this.surveysMan1517Answer1 = surveys;
        
    //     this.vihStatisticsService.updateStatisticAnswer1(surveys.length, 'man15-17', 'school');
    //     console.log('cantidad total hombres 15-17 que reciben info por escuela: ', surveys.length);
    //     //this.vihStatisticsService.filterMan1517Answer1BySchool(true);
    //   });

    // this.vihStatisticsService.fetchTotalNumberVihSurveys();
    // this.vihStatisticsService.fetchTotalMenVihSurveys();
    // this.vihStatisticsService.fetchTotalTeenMenVihSurveys();


    // this.vihStatisticsService.filterByAgeFrom(15);
    // this.vihStatisticsService.filterByAgeUpTo(17);
    //this.vihStatisticsService.filterByGender('Femenino');
    //this.vihStatisticsService.filterByAnswer1Family(true);
    //this.vihStatisticsService.filterByAnswer1School(true);

    this.vihSurveysFilteredSubscription = this.vihStatisticsService.surveys$
      .subscribe((surveys) => {
        this.vihSurveysFiltered = surveys;
        console.log('encuestas filtradas: ', this.vihSurveysFiltered.length);
      });
    
  }

  ngOnDestroy() {
    this.totalVihSurveysSubscription.unsubscribe();
    this.vihSurveysFilteredSubscription.unsubscribe();
    // this.surveysMan1517Answer1FamilySubscription.unsubscribe();
    // this.surveysMan1517Answer1SchoolSubscription.unsubscribe();
    this.answer1FamilyMan1517SurveyNumberSubscription.unsubscribe();
    this.answer1SchoolMan1517SurveyNumberSubscription.unsubscribe();
  }
  

}
