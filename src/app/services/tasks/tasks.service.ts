import {Injectable, signal} from '@angular/core';
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
        tags: ['code', 'Sedlo Čertovica'],
        status: true
      },
      {
        id: 2,
        text: 'Pripraviť dizajn pre e-shop vo figme',
        due: '2025-07-22',
        duration: 35,
        rate: 13,
        created_at: new Date(Date.now()),
        finished_at: '2025-07-22',
        tags: ['figma', 'Sedlo Čertovica'],
        status: false
      }
    ]
  )

  constructor() {
    //
  }

  all() {
    return this.tasks();
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
    this.tasks().push(task);
  }

  update(id: number, formValues: FormGroup<TaskForm>) {
    const tasks = this.tasks().map((task) => {
      if (task.id === id) {
        Object.assign(task, formValues.getRawValue());
      }
      return task;
    });
    this.tasks.set(tasks);
    console.log("tasks", this.tasks())
  }


}
