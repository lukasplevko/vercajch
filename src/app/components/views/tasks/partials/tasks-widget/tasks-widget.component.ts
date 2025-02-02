import {Component, inject, Signal} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {Task} from "../../../../../interfaces/task";
import {TasksListComponent} from "../tasks-list/tasks-list.component";
import {WidgetComponent} from "../../../../shared/widget/widget.component";
import {TasksService} from "../../../../../services/tasks/tasks.service";
import {ModalService} from "../../../../../services/modal/modal.service";
import {TaskFormComponent} from "../task-form/task-form.component";

@Component({
  selector: 'app-tasks-widget',
  imports: [
    FormsModule,
    TasksListComponent,
    WidgetComponent
  ],
  templateUrl: './tasks-widget.component.html',
  styleUrl: './tasks-widget.component.scss'
})
export class TasksWidgetComponent {

  tasks: Signal<Task[]> = inject(TasksService).tasks;

  constructor(private modalService: ModalService) {
    //
  }


  createTask() {
    this.modalService.open(TaskFormComponent);
  }
}
