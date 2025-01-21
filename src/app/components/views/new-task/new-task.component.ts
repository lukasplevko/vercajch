import {Component, inject} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {Task} from "../../../interfaces/task";
import {TasksService} from "../../../services/tasks.service";
import {TaskForm} from "../../../interfaces/task-form";
import {Router} from "@angular/router";

@Component({
  selector: 'app-new-task',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './new-task.component.html',
  styleUrl: './new-task.component.scss'
})
export class NewTaskComponent {

  taskService = inject(TasksService);
  router: Router = new Router();
  taskForm = new FormGroup<TaskForm>({
    text: new FormControl<string>(''),
    due: new FormControl<string>(''),
    duration: new FormControl<number>(0),
    rate: new FormControl<number>(0),
    tags: new FormControl<string[]>([]),
    status: new FormControl<boolean>(false),
  })


  onHandleSubmit() {
    const formValue = this.taskForm.getRawValue()
    const task: Task = {
      id: Math.random(),
      created_at: new Date(Date.now()),
      ...formValue,
    }
    this.taskService.store(task);
    this.router.navigate(['/']);

  }
}
