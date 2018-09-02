import { Component, OnInit, Input } from '@angular/core';
import { PieData } from './shared/pie-data.model';
import { AmChartsService, AmChart } from '@amcharts/amcharts3-angular';
import { BehaviorSubject, Subscription, Observable } from 'rxjs';

@Component({
  selector: 'app-amchart',
  templateUrl: './amchart.component.html',
  styleUrls: ['./amchart.component.css']
})
export class AmchartComponent implements OnInit {

  private _dataChart = new BehaviorSubject<PieData[]>([]);
  private chart: AmChart;

  @Input() private title: string;
  @Input() private subTitle: string;
  @Input() private tagId: string;
  @Input() set dataChart(docArray: PieData[]) {
    this._dataChart.next(docArray);
  };

  get dataChart() {
    return this._dataChart.getValue();
  }

  constructor(private AmCharts: AmChartsService) {}

  ngOnInit() {

    this._dataChart.subscribe(data => {
      // Draw a pie with data
      this.chart = this.AmCharts.makeChart(this.tagId, {
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
        "dataProvider": data,
        "valueField": "y",
        "titleField": "name",
        "balloon": {
          "fixedPosition": true
        }
      });
    });
  }

}
