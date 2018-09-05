import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Subscription, Observable, Subject } from 'rxjs';
import { Answer1Service } from './shared/answer1.service';
import { UIService } from '../../shared/ui.service';

@Component({
  selector: 'app-answer1',
  templateUrl: './answer1.component.html',
  styleUrls: ['./answer1.component.css']
})
export class Answer1Component implements OnInit, OnDestroy {

  answer1Man1517StatisticsSubscription: Subscription;
  answer1Man1821StatisticsSubscription: Subscription;
  answer1Man2230StatisticsSubscription: Subscription;
  answer1Woman1517StatisticsSubscription: Subscription;
  answer1Woman1821StatisticsSubscription: Subscription;
  answer1Woman2230StatisticsSubscription: Subscription;

  private statistics = {
    answer1 : {
      man1517 : {
        title: "Vias de informacion",
        subTitle: "Hombre 15-17",
        tagId: "chart-man-15-17",
        data: [{}]
      },
      man1821 : {
        title: "Vias de informacion",
        subTitle: "Hombre 18-21",
        tagId: "chart-man-18-21",
        data: [{}]
      },
      man2230 : {
        title: "Vias de informacion",
        subTitle: "Hombre 22-30",
        tagId: "chart-man-22-30",
        data: [{}]
      },
      woman1517 : {
        title: "Vias de informacion",
        subTitle: "Mujer 15-17",
        tagId: "chart-woman-15-17",
        data: [{}]
      },
      woman1821 : {
        title: "Vias de informacion",
        subTitle: "Mujer 18-21",
        tagId: "chart-woman-18-21",
        data: [{}]
      },
      woman2230 : {
        title: "Vias de informacion",
        subTitle: "Mujer 22-30",
        tagId: "chart-woman-22-30",
        data: [{}]
      }
    }
  }

  private vihCollectionOptions = [
    {
      sourceCollection: '/vih-survey-filter/man/15-17',
      destinyCollection: '/vih-statistics/man15-17/answer1'
    },
    {
      sourceCollection: '/vih-survey-filter/man/18-21',
      destinyCollection: '/vih-statistics/man18-21/answer1'
    },
    {
      sourceCollection: '/vih-survey-filter/man/22-30',
      destinyCollection: '/vih-statistics/man22-30/answer1'
    },
    {
      sourceCollection: '/vih-survey-filter/woman/15-17',
      destinyCollection: '/vih-statistics/woman15-17/answer1'
    },
    {
      sourceCollection: '/vih-survey-filter/woman/18-21',
      destinyCollection: '/vih-statistics/woman18-21/answer1'
    },
    {
      sourceCollection: '/vih-survey-filter/woman/22-30',
      destinyCollection: '/vih-statistics/woman22-30/answer1'
    }
  ];

  private answer1Options = [
    {
      docId: 'book',
      position: 'answer1.book'
    },
    {
      docId: 'brochure',
      position: 'answer1.brochure'
    },
    {
      docId: 'family',
      position: 'answer1.family'
    },
    {
      docId: 'friend',
      position: 'answer1.friend'
    },
    {
      docId: 'hospital',
      position: 'answer1.hospital'
    },
    {
      docId: 'institution',
      position: 'answer1.institution'
    },
    {
      docId: 'internet',
      position: 'answer1.internet'
    },
    {
      docId: 'magazine',
      position: 'answer1.magazine'
    },
    {
      docId: 'newspaper',
      position: 'answer1.newspaper'
    },
    {
      docId: 'other',
      position: 'answer1.other'
    },
    {
      docId: 'personalResearch',
      position: 'answer1.personalResearch'
    },
    {
      docId: 'publicRoad',
      position: 'answer1.publicRoad'
    },
    {
      docId: 'radio',
      position: 'answer1.radio'
    },
    {
      docId: 'school',
      position: 'answer1.school'
    },
    {
      docId: 'tv',
      position: 'answer1.tv'
    },
    {
      docId: 'university',
      position: 'answer1.university'
    }
  ];

  constructor(private answer1Service: Answer1Service) { }

  ngOnInit() {
    // Update statistic
    this.answer1Service.getAndUpdateVihStatisticAnswer1(this.answer1Options, this.vihCollectionOptions);

    // Fetch statistic for gender and years
    this.answer1Service.fetchAnswer1Man1517Statistic();
    this.answer1Service.fetchAnswer1Man1821Statistic();
    this.answer1Service.fetchAnswer1Man2230Statistic();
    this.answer1Service.fetchAnswer1Woman1517Statistic();
    this.answer1Service.fetchAnswer1Woman1821Statistic();
    this.answer1Service.fetchAnswer1Woman2230Statistic();

    this.answer1Man1517StatisticsSubscription = this.answer1Service.answer1Man1517StatisticsChanged
      .subscribe((availableAnswer1Statistics) => {
        this.statistics.answer1.man1517.data = availableAnswer1Statistics;
      });

    this.answer1Man1821StatisticsSubscription = this.answer1Service.answer1Man1821StatisticsChanged
      .subscribe((availableAnswer1Statistics) => {
        this.statistics.answer1.man1821.data = availableAnswer1Statistics;
      });

    this.answer1Man2230StatisticsSubscription = this.answer1Service.answer1Man2230StatisticsChanged
      .subscribe((availableAnswer1Statistics) => {
        this.statistics.answer1.man2230.data = availableAnswer1Statistics;
      });

    this.answer1Woman1517StatisticsSubscription = this.answer1Service.answer1Woman1517StatisticsChanged
      .subscribe((availableAnswer1Statistics) => {
        this.statistics.answer1.woman1517.data = availableAnswer1Statistics;
      });

    this.answer1Woman1821StatisticsSubscription = this.answer1Service.answer1Woman1821StatisticsChanged
      .subscribe((availableAnswer1Statistics) => {
        this.statistics.answer1.woman1821.data = availableAnswer1Statistics;
      });
    
    this.answer1Woman2230StatisticsSubscription = this.answer1Service.answer1Woman2230StatisticsChanged
      .subscribe((availableAnswer1Statistics) => {
        this.statistics.answer1.woman2230.data = availableAnswer1Statistics;
      });
  }

  
  ngOnDestroy() {
    this.answer1Man1517StatisticsSubscription.unsubscribe();
    this.answer1Man1821StatisticsSubscription.unsubscribe();
    this.answer1Man2230StatisticsSubscription.unsubscribe();
    this.answer1Woman1517StatisticsSubscription.unsubscribe();
    this.answer1Woman1821StatisticsSubscription.unsubscribe();
    this.answer1Woman2230StatisticsSubscription.unsubscribe();
  }
}
