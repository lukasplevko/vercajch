import {Component, input, OnInit} from '@angular/core';
import {Task} from "../../../../../interfaces/task";
import {ModalService} from "../../../../../services/modal/modal.service";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {TaskForm} from "../../../../../interfaces/task-form";
import {TaskFormComponent} from "../task-form/task-form.component";
import {TasksService} from "../../../../../services/tasks/tasks.service";
import {TaskActionsComponent} from "./task-actions/task-actions.component";
import {animate, animation, style, transition, trigger, useAnimation} from "@angular/animations";

const fadeAnimation = animation([
    style({opacity: '{{ start }}'}),
    animate('{{ time }}',
      style({opacity: '{{ end }}'}))
  ],
  {params: {time: '200ms', start: 0, end: 1}});


@Component({
  selector: 'app-tasks-list',
  imports: [
    TaskActionsComponent
  ],
  templateUrl: './tasks-list.component.html',
  styleUrl: './tasks-list.component.scss',
  animations: [
    trigger('fade', [
      transition(':enter', [
        useAnimation(fadeAnimation),

      ]),
      transition(':leave', [
        useAnimation(fadeAnimation, {params: {time: '200ms', start: 1, end: 0}})
      ])
    ])
  ]
})
export class TasksListComponent implements OnInit {

  tasks = input.required<Task[]>()
  taskForm: FormGroup;


  constructor(private modalService: ModalService, private fb: FormBuilder, private taskService: TasksService) {
    //
  }

  ngOnInit() {
    this.taskForm = this.fb.group<TaskForm>({
      text: new FormControl(),
      due: new FormControl(),
      duration: new FormControl(),
      rate: new FormControl(),
      tags: new FormControl(),
      finished_at: new FormControl(),
      status: new FormControl(),
    })
  }

  onStatusChange(task: Task) {
    const date = new Date(Date.now())
    const year = date.getUTCFullYear();
    const month = (date.getUTCMonth() + 1).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping: false})
    const day = date.getUTCDate()
    const formatedDate = `${year}-${month}-${day}`
    task.status = !task.status;
    task.finished_at = formatedDate;
    this.taskForm.patchValue(task);
    this.taskService.update(task.id, this.taskForm)
  }

  getTaskPrice(task: Task) {
    return (task.rate * task.duration).toFixed(2);

  }

  onEditTask(task: Task) {
    this.taskForm.patchValue(task);
    this.modalService.open(TaskFormComponent, task);
  }

  onCreateTask($event: Event) {
    console.log($event);
    $event.preventDefault();
    this.modalService.open(TaskFormComponent);
  }
}
