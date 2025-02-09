import {computed, Injectable, signal} from '@angular/core';
import {Task} from "../../interfaces/task";
import {TaskForm} from "../../interfaces/task-form";
import {FormGroup} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  tasks = signal<Task[]>(
    [
      {
        id: 1,
        text: 'Upraviť linky vo footri',
        due: '2025-07-22',
        duration: 110,
        rate: 5.5,
        created_at: new Date(Date.now()),
        finished_at: '2025-07-22',
        tags: ['Code'],
        status: false
      },
      {
        id: 2,
        text: 'Pripraviť dizajn pre e-shop vo figme',
        due: '2025-07-22',
        duration: 35,
        rate: 13,
        created_at: new Date(Date.now()),
        finished_at: '2025-07-22',
        tags: ['Design'],
        status: false
      }
    ]
  )

  constructor() {
    //
  }

  all() {
    return computed(() => this.tasks())
  }

  find(id: number) {
    return this.tasks().find(task => task.id === id);
  }

  store(formValues: FormGroup<TaskForm>) {
    const task: Task = {
      id: Math.random(),
      created_at: new Date(Date.now()),
      ...formValues.getRawValue(),
    }
    const tasks = [...this.tasks(), task]

    this.tasks.update(() => tasks);
  }

  update(id: number, formValues: FormGroup<TaskForm>) {
    const tasks = this.tasks().map((task) => {
      if (task.id === id) {
        Object.assign(task, formValues.getRawValue());
      }
      return task;
    });
    this.tasks.update(() => tasks)
  }

  tags() {
    const uniqueTasks = computed(() => Array.from(new Set(this.tasks().flatMap((task) => {
      return task.tags;
    }))))

    return computed(() => ['All', 'Finished', ...uniqueTasks()])
  }

  categories() {
    //
  }

}
