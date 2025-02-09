import {Component, inject, Signal, viewChild} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {Task} from "../../../../../interfaces/task";
import {TasksListComponent} from "../tasks-list/tasks-list.component";
import {WidgetComponent} from "../../../../shared/widget/widget.component";
import {TasksService} from "../../../../../services/tasks/tasks.service";
import {ModalService} from "../../../../../services/modal/modal.service";
import {TaskFormComponent} from "../task-form/task-form.component";
import {AIChatComponent} from "../../../../aichat/aichat.component";
import {BtnComponent} from "../../../../shared/btn/btn.component";
import {PillsComponent} from "../../../../shared/pills/pills.component";

@Component({
  selector: 'app-tasks-widget',
  imports: [
    FormsModule,
    TasksListComponent,
    WidgetComponent,
    BtnComponent,
    PillsComponent
  ],
  templateUrl: './tasks-widget.component.html',
  styleUrl: './tasks-widget.component.scss'
})
export class TasksWidgetComponent {

  tasksService = inject(TasksService);
  tasks: Signal<Task[]> = this.tasksService.all();
  tags = this.tasksService.tags();
  pill = viewChild<PillsComponent>('tagPill');

  //categories = this.tasksService.categories();

  constructor(private modalService: ModalService) {

  }


  filteredTasks() {
    return this.tasks().filter((task) => {
      if (this.pill().selected() === 'All') return !task.status;
      if (this.pill().selected() === 'Finished') return task.status;
      return task.tags.includes(this.pill().selected()) && !task.status;
    })
  }

  createTask() {
    this.modalService.open(TaskFormComponent);
  }

  generateTask() {
    this.modalService.open(AIChatComponent)
  }
}
