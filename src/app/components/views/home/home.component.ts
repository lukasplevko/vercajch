import {Component, inject, Signal} from '@angular/core';
import {CalendarComponent} from "../../calendar/calendar.component";
import {TasksWidgetComponent} from "../tasks/partials/tasks-widget/tasks-widget.component";
import {ChartComponent} from "../../chart/chart.component";
import {ChartUsage} from "../../../enums/chart-usage";
import {Task} from "../../../interfaces/task";
import {TasksService} from "../../../services/tasks/tasks.service";
import {ModalService} from "../../../services/modal/modal.service";
import {InvoiceComponent} from "../../invoice/invoice.component";


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
  modalService = inject(ModalService);
  protected readonly ChartUsage = ChartUsage;


  onOpenInvoiceModal() {
    console.log("Bitch work")
    this.modalService.open(InvoiceComponent);
  }
}
