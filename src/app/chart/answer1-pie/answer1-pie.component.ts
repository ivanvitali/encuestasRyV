import { Component, OnInit, OnDestroy } from '@angular/core';
import * as CanvasJS from '../../../assets/js/canvasjs.min';
import { AmChartsService, AmChart } from '@amcharts/amcharts3-angular';
import { Subscription } from 'rxjs';
import { PieData } from './pie-data.model';
import { Answer1PieService } from './answer1-pie.service';

@Component({
  selector: 'app-answer1-pie',
  templateUrl: './answer1-pie.component.html',
  styleUrls: ['./answer1-pie.component.css']
})
export class Answer1PieComponent implements OnInit, OnDestroy {

  private chart: AmChart;

  constructor(private answer1PieService: Answer1PieService, private AmCharts: AmChartsService) { }

  answer1Man1517Statistics: PieData[];
  answer1Man1517StatisticsSubscription: Subscription;

  answer1Man1821Statistics: PieData[];
  answer1Man1821StatisticsSubscription: Subscription;

  private vihCollectionOptions = [
    {
      sourceCollection: '/vih-survey-filter/man/15-17',
      destinyCollection: '/vih-statistics/man15-17/answer1'
    },
    {
      sourceCollection: '/vih-survey-filter/man/18-21',
      destinyCollection: '/vih-statistics/man18-21/answer1'
    }
    // ,
    // {
    //   sourceCollection: '/vih-survey-filter/man/22-30',
    //   destinyCollection: '/vih-statistics/man22-30/answer1'
    // }
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

  ngOnInit() {

    this.answer1PieService.getAndUpdateVihStatisticAnswer1(this.answer1Options, this.vihCollectionOptions);

    this.answer1PieService.fetchAnswer1Man1517Statistic();
    this.answer1PieService.fetchAnswer1Man1821Statistic();

    this.answer1Man1517StatisticsSubscription = this.answer1PieService.answer1Man1517StatisticsChanged
      .subscribe((availableAnswer1Statistics) => {
        this.answer1Man1517Statistics = availableAnswer1Statistics;

        this.chart = this.AmCharts.makeChart("chart-man-15-17", {
          "outlineThickness": 0,
          "autoResize": true,
          "alpha": 0.5,
          "labelsEnabled": true,
          "autoMargins": false,
          "marginTop": 0,
          "marginBottom": 0,
          "marginLeft": 0,
          "marginRight": 0,
          "pullOutRadius": 10,
          "type": "pie",
          "theme": "light",
          "outlineColor": "",
          "dataProvider": this.answer1Man1517Statistics,
          "valueField": "y",
          "titleField": "name",
          "balloon": {
            "fixedPosition": true
          }
        });

        this.chart = this.AmCharts.makeChart("chartdiv2", {
          "outlineThickness": 0,
          "autoResize": true,
          "alpha": 0.6,
          "labelsEnabled": true,
          "autoMargins": false,
          "marginTop": 0,
          "marginBottom": 0,
          "marginLeft": 0,
          "marginRight": 0,
          "pullOutRadius": 10,
          "type": "pie",
          "theme": "light",
          "outlineColor": "",
          "dataProvider": this.answer1Man1517Statistics,
          "valueField": "y",
          "titleField": "name",
          "balloon": {
            "fixedPosition": true
          }
        });

        this.chart = this.AmCharts.makeChart("chartdiv3", {
          "outlineThickness": 0,
          "autoResize": true,
          "alpha": 0.6,
          "labelsEnabled": true,
          "autoMargins": false,
          "marginTop": 0,
          "marginBottom": 0,
          "marginLeft": 0,
          "marginRight": 0,
          "pullOutRadius": 10,
          "type": "pie",
          "theme": "light",
          "outlineColor": "",
          "dataProvider": this.answer1Man1517Statistics,
          "valueField": "y",
          "titleField": "name",
          "balloon": {
            "fixedPosition": true
          }
        });
      });
      
    this.answer1Man1821StatisticsSubscription = this.answer1PieService.answer1Man1821StatisticsChanged
      .subscribe((availableAnswer1Statistics) => {
        this.answer1Man1821Statistics = availableAnswer1Statistics;

        this.chart = this.AmCharts.makeChart("chart-man-18-21", {
          "outlineThickness": 0,
          "autoResize": true,
          "alpha": 0.6,
          "labelsEnabled": true,
          "autoMargins": false,
          "marginTop": 0,
          "marginBottom": 0,
          "marginLeft": 0,
          "marginRight": 0,
          "pullOutRadius": 10,
          "type": "pie",
          "theme": "light",
          "outlineColor": "",
          "dataProvider": this.answer1Man1821Statistics,
          "valueField": "y",
          "titleField": "name",
          "balloon": {
            "fixedPosition": true
          }
        });
      });

    

  

    
  }

  ngOnDestroy() {
    this.answer1Man1517StatisticsSubscription.unsubscribe();
    if (this.chart) {
      this.AmCharts.destroyChart(this.chart);
    }
  }
}
