import {Component, inject, Signal} from '@angular/core';
import {CalendarComponent} from "../../calendar/calendar.component";
import {TasksWidgetComponent} from "../tasks/partials/tasks-widget/tasks-widget.component";
import {ChartComponent} from "../../chart/chart.component";
import {ChartUsage} from "../../../enums/chart-usage";
import {Task} from "../../../interfaces/task";
import {TasksService} from "../../../services/tasks/tasks.service";


@Component({
  selector: 'app-home',
  imports: [
    CalendarComponent,
    TasksWidgetComponent,
    ChartComponent,

  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  //


  tasks: Signal<Task[]> = inject(TasksService).tasks;
  protected readonly ChartUsage = ChartUsage;
}
