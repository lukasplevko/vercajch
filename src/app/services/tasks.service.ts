import {Injectable} from '@angular/core';
import {Task} from "../interfaces/task";

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  tasks: Task[] = [
    {
      id: 1,
      text: 'Upraviť linky vo footri',
      due: '2025-09-31',
      duration: 110,
      rate: 5.5,
      created_at: new Date(Date.now()),
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
      tags: ['figma', 'Sedlo Čertovica'],
      status: false
    }
  ];

  constructor() {
    //
  }

  all() {
    return this.tasks;
  }

  find(id: number) {
    return this.tasks.find(task => task.id === id);
  }

  store(task: Task) {
    this.tasks.push(task);
  }


}
