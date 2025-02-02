import {Component, inject} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {Task} from "../../../../../interfaces/task";
import {TasksService} from "../../../../../services/tasks/tasks.service";
import {TaskForm} from "../../../../../interfaces/task-form";
import {ModalService} from "../../../../../services/modal/modal.service";
import {ModalForm} from "../../../../../interfaces/modal-form";

@Component({
  selector: 'app-task-form',
  imports: [
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.scss'
})
export class TaskFormComponent implements ModalForm<TaskForm, Task> {

  taskService = inject(TasksService);
  modalService = inject(ModalService);
  form = new FormGroup<TaskForm>({
    text: new FormControl<string>(''),
    due: new FormControl<string>(''),
    duration: new FormControl<number>(0),
    rate: new FormControl<number>(0),
    tags: new FormControl<string[]>([]),
    finished_at: new FormControl<string>(''),
    status: new FormControl<boolean>(false),
  })
  hasExistingTask: boolean = false;
  taskId: number | null = null;

  populateForm(data: Task) {
    this.form.patchValue(data);
    this.taskId = data.id;
    this.hasExistingTask = true;
  }

  onHandleSubmit() {
    if (this.hasExistingTask) {
      this.taskService.update(this.taskId, this.form);
    } else {
      this.taskService.store(this.form)
    }
    this.modalService.close();
  }

}
