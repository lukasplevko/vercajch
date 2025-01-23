import {Component, inject, OnInit} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {Task} from "../../interfaces/task";
import {TasksListComponent} from "../tasks-list/tasks-list.component";
import {WidgetComponent} from "../shared/widget/widget.component";
import {TasksService} from "../../services/tasks.service";

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
export class TasksWidgetComponent implements OnInit {

  tasks: Task[] = []
  tasksService: TasksService = inject(TasksService)

  ngOnInit() {
    this.tasks = this.tasksService.all();
  }


}
