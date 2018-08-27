import { Component, OnInit, OnDestroy } from '@angular/core';
import * as CanvasJS from '../../../assets/js/canvasjs.min';
import { VihStatisticsService } from '../../statistics/vih-statistics/vih-statistics.service';
import { Answer1 } from '../../statistics/vih-statistics/answer1.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-answer1-pie',
  templateUrl: './answer1-pie.component.html',
  styleUrls: ['./answer1-pie.component.css']
})
export class Answer1PieComponent implements OnInit, OnDestroy {

  constructor(private vihStatisticsService: VihStatisticsService) { }

  answer1Man1517Statistics: Answer1[];
  answer1Man1517Subscription: Subscription;

  ngOnInit() {

    this.vihStatisticsService.fetchMan1517Answer1Statistic();

    this.answer1Man1517Subscription = this.vihStatisticsService.answer1StatisticsChanged
      .subscribe((availableAnswer1Statistics) => {
        this.answer1Man1517Statistics = availableAnswer1Statistics;

        let chartMan1517 = new CanvasJS.Chart("chartContainer", {
          theme: "light2",
          animationEnabled: true,
          exportEnabled: true,
          title:{
            text: "Hombres 15-17 años"
          },
          data: [{
            type: "pie",
            showInLegend: true,
            toolTipContent: "<b>{name}</b>: ${y} (#percent%)",
            indexLabel: "{name} - #percent%",
            dataPoints: this.answer1Man1517Statistics
            // dataPoints: [
            //   { y: 1, name: "Familia" },
            //   { y: 1, name: "Escuela" },
            //   { y: 0, name: "Traveling" },
            //   { y: 0, name: "Housing" },
            //   { y: 0, name: "Education" },
            //   { y: 0, name: "Shopping"},
            //   { y: 0, name: "Others" }
            // ]
          }]
        });

        chartMan1517.render();

      });

    

    let chartMan1821 = new CanvasJS.Chart("chartContainer2", {
      theme: "light2",
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
      
    
    chartMan1821.render();

    let chartMan2230 = new CanvasJS.Chart("chartContainer3", {
      theme: "light2",
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
      
    
    chartMan2230.render();
  }

  ngOnDestroy() {
    this.answer1Man1517Subscription.unsubscribe();
  }
}
