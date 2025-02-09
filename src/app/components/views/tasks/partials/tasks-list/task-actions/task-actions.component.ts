import {Component, input, output} from '@angular/core';
import {BtnComponent} from "../../../../../shared/btn/btn.component";
import {Task} from "../../../../../../interfaces/task";

@Component({
  selector: 'app-task-actions',
  imports: [
    BtnComponent
  ],
  templateUrl: './task-actions.component.html',
  styleUrl: './task-actions.component.scss'
})
export class TaskActionsComponent {

  task = input<Task>();
  onEditTask = output<Task>();
  onStatusChange = output<Task>();


  changeStatus() {
    this.onStatusChange.emit(this.task());
  }

  editTask() {
    this.onEditTask.emit(this.task());
  }
}
