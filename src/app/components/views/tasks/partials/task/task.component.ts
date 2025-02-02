import {Component, inject, input, OnInit} from '@angular/core';
import {Task} from "../../../../../interfaces/task";
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgClass, NgOptimizedImage} from "@angular/common";
import {TasksService} from "../../../../../services/tasks/tasks.service";
import {TaskForm} from "../../../../../interfaces/task-form";
import {ModalService} from "../../../../../services/modal/modal.service";
import {TaskFormComponent} from "../task-form/task-form.component";


@Component({
  selector: 'app-task',
  imports: [
    FormsModule,
    NgOptimizedImage,
    ReactiveFormsModule,
    NgClass
  ],
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss'
})
export class TaskComponent implements OnInit {
  task = input.required<Task>();
  taskService = inject(TasksService);
  editTaskForm: FormGroup;

  constructor(private fb: FormBuilder, private modalService: ModalService) {
    //
  }

  ngOnInit() {
    this.editTaskForm = this.fb.group<TaskForm>({
      text: new FormControl({value: this.task().text, disabled: true}),
      due: new FormControl({value: this.task().due, disabled: false}),
      duration: new FormControl({value: this.task().duration, disabled: true}),
      rate: new FormControl({value: this.task().rate, disabled: false}),
      tags: new FormControl({value: this.task().tags, disabled: false}),
      finished_at: new FormControl({value: this.task().finished_at, disabled: false}),
      status: new FormControl({value: this.task().status, disabled: false}),
    })
  }

  onStatusChange() {
    const date = new Date(Date.now())
    const year = date.getUTCFullYear();
    const month = (date.getUTCMonth() + 1).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping: false})
    const day = date.getUTCDate()
    const formatedDate = `${year}-${month}-${day}`
    this.editTaskForm.patchValue({status: !this.task().status, finished_at: formatedDate});

    this.taskService.update(this.task().id, this.editTaskForm)
  }

  getTaskPrice(rate: number, duration: number) {
    return (rate * duration).toFixed(2);

  }

  editTask() {
    this.modalService.open(TaskFormComponent, this.task());
  }


}
