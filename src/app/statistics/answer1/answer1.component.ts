import { Component, OnInit, Input } from '@angular/core';
import { PieData } from '../pie-data.model';
import { Subscription } from 'rxjs';
import { Answer1Service } from './answer1.service';

@Component({
  selector: 'app-answer1',
  templateUrl: './answer1.component.html',
  styleUrls: ['./answer1.component.css']
})
export class Answer1Component implements OnInit {

  answer1Man1517Statistics: PieData[];
  answer1Man1517StatisticsSubscription: Subscription;

  answer1Man1821Statistics: PieData[];
  answer1Man1821StatisticsSubscription: Subscription;

  answer1Man2230Statistics: PieData[];
  answer1Man2230StatisticsSubscription: Subscription;

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

    this.answer1Service.fetchAnswer1Man1517Statistic();
    this.answer1Service.fetchAnswer1Man1821Statistic();
    this.answer1Service.fetchAnswer1Man2230Statistic();

    this.answer1Man1517StatisticsSubscription = this.answer1Service.answer1Man1517StatisticsChanged
      .subscribe((availableAnswer1Statistics) => {
        this.answer1Man1517Statistics = availableAnswer1Statistics;
        this.statistics.answer1.man1517.data = this.answer1Man1517Statistics;
//        this.chart = this.AmCharts.makeChart("chart-man-15-17", {
//          "outlineThickness": 0,
//          "autoResize": true,
//          "alpha": 0.5,
//          "labelsEnabled": true,
//          "autoMargins": false,
//          "marginTop": 0,
//          "marginBottom": 0,
//          "marginLeft": 0,
//          "marginRight": 0,
//          "pullOutRadius": 10,
//          "type": "pie",
//          "theme": "light",
//          "outlineColor": "",
//          "dataProvider": this.answer1Man1517Statistics,
//          "valueField": "y",
//          "titleField": "name",
//          "balloon": {
//            "fixedPosition": true
        //  }
        //});
      });

    this.answer1Man1821StatisticsSubscription = this.answer1Service.answer1Man1821StatisticsChanged
      .subscribe((availableAnswer1Statistics) => {
        this.answer1Man1821Statistics = availableAnswer1Statistics;
        this.statistics.answer1.man1821.data = this.answer1Man1821Statistics;
      });

    this.answer1Man2230StatisticsSubscription = this.answer1Service.answer1Man2230StatisticsChanged
      .subscribe((availableAnswer1Statistics) => {
        this.answer1Man2230Statistics = availableAnswer1Statistics;
        this.statistics.answer1.man2230.data = this.answer1Man2230Statistics;
      });
  }

  

}
