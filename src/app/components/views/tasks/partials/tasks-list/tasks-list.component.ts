import {Component, input} from '@angular/core';
import {TaskComponent} from "../task/task.component";
import {Task} from "../../../../../interfaces/task";

@Component({
  selector: 'app-tasks-list',
  imports: [
    TaskComponent
  ],
  templateUrl: './tasks-list.component.html',
  styleUrl: './tasks-list.component.scss'
})
export class TasksListComponent {

  tasks = input.required<Task[]>()
}
