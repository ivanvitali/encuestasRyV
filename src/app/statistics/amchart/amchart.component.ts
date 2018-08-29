import { Component, OnInit, Input } from '@angular/core';
import { PieData } from '../pie-data.model';
import { AmChartsService, AmChart } from '@amcharts/amcharts3-angular';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-amchart',
  templateUrl: './amchart.component.html',
  styleUrls: ['./amchart.component.css']
})
export class AmchartComponent implements OnInit {

  @Input() private title: string;
  @Input() private subTitle: string;
  @Input() private tagId: string;
  @Input() private data: PieData[];

  private _datasource = new BehaviorSubject<PieData[]>([]);
  private chart: AmChart;

  @Input()
  set datasource(value) {
      // set the latest value for _data BehaviorSubject
      this._datasource.next(value);
  };

  get datasource() {
    // get the latest value from _data BehaviorSubject
    return this._datasource.getValue();
  }
  constructor(private AmCharts: AmChartsService) { }

  ngOnInit() {
    console.log(this.title,' ',this.subTitle, ' ', this.tagId, ' ', this.data);

    this._datasource
      .subscribe((data) => {
        console.log('data: ', this.data);
      });

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
      "dataProvider": this.data,
      "valueField": "y",
      "titleField": "name",
      "balloon": {
        "fixedPosition": true
      }
    });

  }

}
