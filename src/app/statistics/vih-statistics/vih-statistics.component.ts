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

  vihSurveysFiltered: any[];
  vihSurveysFilteredSubscription: Subscription;


  constructor(private vihStatisticsService: VihStatisticsService) { }

  ngOnInit() {

    this.totalVihSurveysSubscription = this.vihStatisticsService.totalVihSurveysChanged
      .subscribe((totalVihSurveys) => {
        this.totalVihSurveys = totalVihSurveys;
        console.log('cantidad total de encuestas: ', this.totalVihSurveys);
      });
    

    this.vihStatisticsService.fetchTotalNumberVihSurveys();
    this.vihStatisticsService.fetchTotalMenVihSurveys();
    this.vihStatisticsService.fetchTotalTeenMenVihSurveys();


    // this.vihStatisticsService.filterByAgeFrom(15);
    // this.vihStatisticsService.filterByAgeUpTo(17);
    this.vihStatisticsService.filterByGender('Femenino');
    this.vihStatisticsService.filterByAgeFrom(15);
    this.vihStatisticsService.filterByAgeUpTo(17);
    //this.vihStatisticsService.filterByAnswer1Family(true);
    this.vihStatisticsService.filterByAnswer1School(true);

    this.vihSurveysFilteredSubscription = this.vihStatisticsService.surveys$
      .subscribe((surveys) => {
        this.vihSurveysFiltered = surveys;
        console.log('encuestas filtradas: ', this.vihSurveysFiltered.length);
      });
    
  }

  ngOnDestroy() {
    this.totalVihSurveysSubscription.unsubscribe();
    this.vihSurveysFilteredSubscription.unsubscribe();
  }
  

}
