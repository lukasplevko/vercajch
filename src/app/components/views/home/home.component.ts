import {Component} from '@angular/core';
import {CalendarComponent} from "../../calendar/calendar.component";
import {TasksWidgetComponent} from "../../tasks-widget/tasks-widget.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CalendarComponent,
    TasksWidgetComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  currentDate = Date.now()

}
