import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Answer2Service } from './answer2.service';

@Component({
  selector: 'app-answer2',
  templateUrl: './answer2.component.html',
  styleUrls: ['./answer2.component.css']
})
export class Answer2Component implements OnInit, OnDestroy {

  answer2Man1517StatisticsSubscription: Subscription;
  answer2Man1821StatisticsSubscription: Subscription;
  answer2Man2230StatisticsSubscription: Subscription;
  answer2Woman1517StatisticsSubscription: Subscription;
  answer2Woman1821StatisticsSubscription: Subscription;
  answer2Woman2230StatisticsSubscription: Subscription;

  private statistics = {
    answer2 : {
      man1517 : {
        title: "Vih == Sida?",
        subTitle: "Hombre 15-17",
        tagId: "chart-man-15-17-answer2",
        data: [{}]
      },
      man1821 : {
        title: "Vih == Sida?",
        subTitle: "Hombre 18-21",
        tagId: "chart-man-18-21-answer2",
        data: [{}]
      },
      man2230 : {
        title: "Vih == Sida?",
        subTitle: "Hombre 22-30",
        tagId: "chart-man-22-30-answer2",
        data: [{}]
      },
      woman1517 : {
        title: "Vih == Sida?",
        subTitle: "Mujer 15-17",
        tagId: "chart-woman-15-17-answer2",
        data: [{}]
      },
      woman1821 : {
        title: "Vih == Sida?",
        subTitle: "Mujer 18-21",
        tagId: "chart-woman-18-21-answer2",
        data: [{}]
      },
      woman2230 : {
        title: "Vih == Sida?",
        subTitle: "Mujer 22-30",
        tagId: "chart-woman-22-30-answer2",
        data: [{}]
      }
    }
  }

  private vihCollectionOptions = [
    {
      sourceCollection: '/vih-survey-filter/man/15-17',
      destinyCollection: '/vih-statistics/man15-17/answer2'
    },
    {
      sourceCollection: '/vih-survey-filter/man/15-17',
      destinyCollection: '/vih-statistics/man15-17/answer2'
    },
    {
      sourceCollection: '/vih-survey-filter/man/18-21',
      destinyCollection: '/vih-statistics/man18-21/answer2'
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
      sourceCollection: '/vih-survey-filter/man/22-30',
      destinyCollection: '/vih-statistics/man22-30/answer2'
    },
    {
      sourceCollection: '/vih-survey-filter/woman/15-17',
      destinyCollection: '/vih-statistics/woman15-17/answer2'
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
      sourceCollection: '/vih-survey-filter/woman/18-21',
      destinyCollection: '/vih-statistics/woman18-21/answer2'
    },
    {
      sourceCollection: '/vih-survey-filter/woman/22-30',
      destinyCollection: '/vih-statistics/woman22-30/answer2'
    },
    {
      sourceCollection: '/vih-survey-filter/woman/22-30',
      destinyCollection: '/vih-statistics/woman22-30/answer2'
    }
  ];

  private answer2Options = [
    {
      docId: 'positive',
      position: 'answer2.value',
      value: 'Si'
    },
    {
      docId: 'negative',
      position: 'answer2.value',
      value: 'No'
    }
  ];

  constructor(private answer2Service: Answer2Service) { }

  ngOnInit() {
    // Update answer2 statistics
    this.answer2Service.getAndUpdateVihStatisticAnswer2(this.answer2Options, this.vihCollectionOptions);
    // Fetch statistic for gender and years
    this.answer2Service.fetchAnswer2Man1517Statistic();
    this.answer2Service.fetchAnswer2Man1821Statistic();
    this.answer2Service.fetchAnswer2Man2230Statistic();
    this.answer2Service.fetchAnswer2Woman1517Statistic();
    this.answer2Service.fetchAnswer2Woman1821Statistic();
    this.answer2Service.fetchAnswer2Woman2230Statistic();

    this.answer2Man1517StatisticsSubscription = this.answer2Service.answer2Man1517StatisticsChanged
      .subscribe((availableAnswer2Statistics) => {
        this.statistics.answer2.man1517.data = availableAnswer2Statistics;
        //console.log('data refresh: ', this.statistics.answer2.man1517.data);
      });
    this.answer2Man1821StatisticsSubscription = this.answer2Service.answer2Man1821StatisticsChanged
      .subscribe((availableAnswer1Statistics) => {
        this.statistics.answer2.man1821.data = availableAnswer1Statistics;
      });

    this.answer2Man2230StatisticsSubscription = this.answer2Service.answer2Man2230StatisticsChanged
      .subscribe((availableAnswer1Statistics) => {
        this.statistics.answer2.man2230.data = availableAnswer1Statistics;
      });

    this.answer2Woman1517StatisticsSubscription = this.answer2Service.answer2Woman1517StatisticsChanged
      .subscribe((availableAnswer1Statistics) => {
        this.statistics.answer2.woman1517.data = availableAnswer1Statistics;
      });

    this.answer2Woman1821StatisticsSubscription = this.answer2Service.answer2Woman1821StatisticsChanged
      .subscribe((availableAnswer1Statistics) => {
        this.statistics.answer2.woman1821.data = availableAnswer1Statistics;
      });
    
    this.answer2Woman2230StatisticsSubscription = this.answer2Service.answer2Woman2230StatisticsChanged
      .subscribe((availableAnswer1Statistics) => {
        this.statistics.answer2.woman2230.data = availableAnswer1Statistics;
      });
  }

  ngOnDestroy() {
    this.answer2Man1517StatisticsSubscription.unsubscribe();
    this.answer2Man1821StatisticsSubscription.unsubscribe();
    this.answer2Man2230StatisticsSubscription.unsubscribe();
    this.answer2Woman1517StatisticsSubscription.unsubscribe();
    this.answer2Woman1821StatisticsSubscription.unsubscribe();
    this.answer2Woman2230StatisticsSubscription.unsubscribe();
  }

}
