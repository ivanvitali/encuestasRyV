import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Answer2Service } from './answer2.service';

@Component({
  selector: 'app-answer2',
  templateUrl: './answer2.component.html',
  styleUrls: ['./answer2.component.css']
})
export class Answer2Component implements OnInit {

  answer2Man1517StatisticsSubscription: Subscription;

  private vihCollectionOptions = [
    {
      sourceCollection: '/vih-survey-filter/man/15-17',
      destinyCollection: '/vih-statistics/man15-17/answer2'
    },
    {
      sourceCollection: '/vih-survey-filter/man/18-21',
      destinyCollection: '/vih-statistics/man18-21/answer2'
    },
    {
      sourceCollection: '/vih-survey-filter/man/22-30',
      destinyCollection: '/vih-statistics/man22-30/answer2'
    },
    {
      sourceCollection: '/vih-survey-filter/woman/15-17',
      destinyCollection: '/vih-statistics/woman15-17/answer2'
    },
    {
      sourceCollection: '/vih-survey-filter/woman/18-21',
      destinyCollection: '/vih-statistics/woman18-21/answer2'
    },
    {
      sourceCollection: '/vih-survey-filter/woman/22-30',
      destinyCollection: '/vih-statistics/woman22-30/answer2'
    }
  ];

  private answer2Options = [
    {
      docId: 'positive',
      position: 'answer2.positive'
    },
    {
      docId: 'negative',
      position: 'answer2.negative'
    }
  ];

  constructor(private answer1Service: Answer2Service) { }

  ngOnInit() {
    // Fetch statistic for gender and years
    this.answer1Service.fetchAnswer2Man1517Statistic();
  }

}
