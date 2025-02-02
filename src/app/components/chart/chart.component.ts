import {Component, effect, Inject, input, OnInit, PLATFORM_ID, signal} from '@angular/core';
import {ChartType} from "chart.js";
import {isPlatformBrowser, NgIf} from "@angular/common";
import {BaseChartDirective} from "ng2-charts";
import {ChartUsage} from "../../enums/chart-usage";
import {Task} from "../../interfaces/task";

@Component({
  selector: 'app-chart',
  imports: [BaseChartDirective, NgIf],
  templateUrl: './chart.component.html',
  styleUrl: './chart.component.scss'
})
export class ChartComponent implements OnInit {

  usage = input.required<ChartUsage>()
  data = input.required<Task[]>();

  isBrowser: boolean;
  barChartType: ChartType = 'bar';
  MONTHS = [
    {
      name: 'Január',
      index: "01"
    },
    {
      name: 'Február',
      index: "02"
    },
    {
      name: 'Marec',
      index: "03"
    },
    {
      name: 'Apríl',
      index: "04"
    },
    {
      name: 'Máj',
      index: "05"
    },
    {
      name: 'Jún',
      index: "06"
    },
    {
      name: 'Júl',
      index: "07"
    },
    {
      name: 'August',
      index: "08"
    },
    {
      name: 'September',
      index: "09"
    },
    {
      name: 'Október',
      index: "10"
    },
    {
      name: 'November',
      index: "11"
    },
    {
      name: 'December',
      index: "12"
    },
  ];
  fullYearIncome: number[] = this.MONTHS.map(() => 0);
  income = signal({
    datasets: [{
      label: 'Income per month',
      data: this.fullYearIncome,
    }],
    labels: this.MONTHS.map((item) => item.name)
  })
  barChart = {
    type: this.barChartType,
    options: {
      responsive: true,  // Optional chart options
      scales: {
        y: {
          beginAtZero: true,  // Make sure the Y-axis starts at zero
        }
      }
    }
  }

  constructor(@Inject(PLATFORM_ID) private platformId: unknown) {
    //
    effect(() => {
      if (this.usage() === ChartUsage.INCOME) {
        this.parseIncomeData();
      }
    });
  }

  ngOnInit() {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  parseIncomeData() {
    if (!this.data()) return
    //reset
    this.fullYearIncome.fill(0, 0, 12);

    const completedTasks = this.data().filter((task) => task.status);
    const groupedTasksByDate = Object.groupBy(completedTasks, ({finished_at}) => {
      return finished_at.split('-')[1]
    });

    Object.entries(groupedTasksByDate).forEach((task) => {
      const month = task[0];
      const income = task[1].reduce((result, task) => {
        return result + (task.duration * task.rate)
      }, 0)
      const monthIndex = Number(month) - 1;
      this.fullYearIncome[monthIndex] = Number(income);
    })

    this.income.set({
      datasets: [{
        label: 'Income per month',
        data: this.fullYearIncome,
      }],
      labels: this.MONTHS.map((item) => item.name)
    })

  }


}
