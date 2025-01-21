import {Component, Input} from '@angular/core';
import {TaskComponent} from "../task/task.component";
import {Task} from "../../interfaces/task";

@Component({
  selector: 'app-tasks-list',
  standalone: true,
  imports: [
    TaskComponent
  ],
  templateUrl: './tasks-list.component.html',
  styleUrl: './tasks-list.component.scss'
})
export class TasksListComponent {

  @Input() tasks!: Task[];
}
