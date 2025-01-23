import {Component} from '@angular/core';
import {DatePipe} from "@angular/common";
import {WidgetComponent} from "../shared/widget/widget.component";

@Component({
    selector: 'app-calendar',
    imports: [
        DatePipe,
        WidgetComponent
    ],
    templateUrl: './calendar.component.html',
    styleUrl: './calendar.component.scss'
})
export class CalendarComponent {

  currentDate: Date = new Date(Date.now());
}
