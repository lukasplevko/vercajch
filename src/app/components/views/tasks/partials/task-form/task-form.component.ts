import {Component, inject} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {Task} from "../../../../../interfaces/task";
import {TasksService} from "../../../../../services/tasks/tasks.service";
import {TaskForm} from "../../../../../interfaces/task-form";
import {ModalService} from "../../../../../services/modal/modal.service";
import {ModalForm} from "../../../../../interfaces/modal-form";
import {BtnComponent} from "../../../../shared/btn/btn.component";

@Component({
  selector: 'app-task-form',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BtnComponent,
  ],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.scss'
})
export class TaskFormComponent implements ModalForm<TaskForm, Task> {

  tasksService = inject(TasksService);
  modalService = inject(ModalService);
  tags = this.tasksService.tags();

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
  btnText: string = 'Create task';

  populateForm(data: Task) {
    console.log("Populate", data);
    this.form.patchValue(data);
    this.taskId = data.id;
    this.hasExistingTask = true;
    this.btnText = 'Update task';
  }

  onHandleSubmit() {
    if (this.hasExistingTask) {
      this.tasksService.update(this.taskId, this.form);
    } else {
      this.tasksService.store(this.form)
    }
    this.modalService.close();
  }


}
