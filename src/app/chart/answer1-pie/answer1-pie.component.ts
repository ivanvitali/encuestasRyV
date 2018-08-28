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

  private vihSurveyMan1517 = {
    name: 'Familia',
    value: 'family',
    sourceCollection: '/vih-survey-filter/man/15-17',
    destinyCollection: '/vih-statistics/man15-17/answer1'
  };

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

    this.answer1PieService.getAndUpdateVihStatisticAnswer1(this.answer1Options, this.vihSurveyMan1517);

    this.answer1PieService.fetchAnswer1Man1517Statistic();

    this.answer1Man1517StatisticsSubscription = this.answer1PieService.answer1Man1517StatisticsChanged
      .subscribe((availableAnswer1Statistics) => {
        this.answer1Man1517Statistics = availableAnswer1Statistics;

        //let chartMan1517 = new CanvasJS.Chart("chartContainer", {
          //theme: "dark2", // "light2", "light1", "dark1", "dark2"
          //animationEnabled: true,
          //exportEnabled: true,
         // title:{
          //  text: "Hombres 15-17 años"
         // },
          //data: [{
          //  type: "pie",
          //  showInLegend: true,
          //  toolTipContent: "<b>{name}</b>: ${y} (#percent%)",
         //   indexLabel: "{name} - #percent%",
          //  dataPoints: this.answer1Man1517Statistics
            // dataPoints: [
            //   { y: 1, name: "Familia" },
            //   { y: 1, name: "Escuela" },
            //   { y: 0, name: "Traveling" },
            //   { y: 0, name: "Housing" },
            //   { y: 0, name: "Education" },
            //   { y: 0, name: "Shopping"},
            //   { y: 0, name: "Others" }
            // ]
         // }]
       // });

        //chartMan1517.render();

        this.chart = this.AmCharts.makeChart("chartdiv", {
          "labelsEnabled": true,
          "autoMargins": false,
          "marginTop": 0,
          "marginBottom": 0,
          "marginLeft": 0,
          "marginRight": 0,
          "pullOutRadius": 0,
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

        this.chart = this.AmCharts.makeChart("chartdiv1", {
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
      
    

    let chartMan1821 = new CanvasJS.Chart("chartContainer2", {
      theme: "dark2",
      animationEnabled: true,
      exportEnabled: true,
      title:{
        text: "Hombres 18-21 años"
      },
      data: [{
        type: "pie",
        showInLegend: true,
        toolTipContent: "<b>{name}</b>: ${y} (#percent%)",
        indexLabel: "{name} - #percent%",
        dataPoints: [
          { y: 450, name: "Food" },
          { y: 120, name: "Insurance" },
          { y: 300, name: "Traveling" },
          { y: 800, name: "Housing" },
          { y: 150, name: "Education" },
          { y: 150, name: "Shopping"},
          { y: 250, name: "Others" }
        ]
      }]
    });
      
    
    //chartMan1821.render();

    let chartMan2230 = new CanvasJS.Chart("chartContainer3", {
      theme: "dark2",
      animationEnabled: true,
      exportEnabled: true,
      title:{
        text: "Hombres 22-30 años"
      },
      data: [{
        type: "pie",
        showInLegend: true,
        toolTipContent: "<b>{name}</b>: ${y} (#percent%)",
        indexLabel: "{name} - #percent%",
        dataPoints: [
          { y: 450, name: "Food" },
          { y: 120, name: "Insurance" },
          { y: 300, name: "Traveling" },
          { y: 800, name: "Housing" },
          { y: 150, name: "Education" },
          { y: 150, name: "Shopping"},
          { y: 250, name: "Others" }
        ]
      }]
    });
      
    
    //chartMan2230.render();

    
  }

  ngOnDestroy() {
    this.answer1Man1517StatisticsSubscription.unsubscribe();
    if (this.chart) {
      this.AmCharts.destroyChart(this.chart);
    }
  }
}
