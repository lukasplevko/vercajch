import {Component, Inject, OnInit, PLATFORM_ID} from '@angular/core';
import {CalendarComponent} from "../../calendar/calendar.component";
import {TasksWidgetComponent} from "../../tasks-widget/tasks-widget.component";
import {BaseChartDirective} from "ng2-charts";
import {ChartType} from "chart.js";
import {isPlatformBrowser, NgIf} from "@angular/common";


@Component({
  selector: 'app-home',
  imports: [
    CalendarComponent,
    TasksWidgetComponent,
    BaseChartDirective,
    NgIf,

  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  isBrowser: boolean;
  barChartType: ChartType = 'bar';
  barChartData = {
    type: this.barChartType,
    data: {
      datasets: [{
        data: [20, 10],
      }],
      labels: ['a', 'b']
    },
    options: {
      responsive: true,  // Optional chart options
      scales: {
        y: {
          beginAtZero: true,  // Make sure the Y-axis starts at zero
        }
      }
    }
  }
  currentDate = Date.now()

  constructor(@Inject(PLATFORM_ID) private platformId: unknown) {
    //
  }

  ngOnInit() {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

}
