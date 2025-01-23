import {Component, HostListener, inject, input, OnInit, signal, viewChild} from '@angular/core';
import {Task} from "../../interfaces/task";
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgIf, NgOptimizedImage} from "@angular/common";
import {EditableInputComponent} from "../editable-input/editable-input.component";
import {FormModalComponent} from "../shared/form-modal/form-modal.component";
import {ModalData} from "../../interfaces/modal-data";
import {TasksService} from "../../services/tasks.service";
import {TaskForm} from "../../interfaces/task-form";


@Component({
  selector: 'app-task',
  imports: [
    FormsModule,
    NgOptimizedImage,
    NgIf,
    EditableInputComponent,
    ReactiveFormsModule
  ],
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss'
})
export class TaskComponent implements OnInit {
  task = input.required<Task>();
  formModal = viewChild<FormModalComponent>(FormModalComponent);
  taskService = inject(TasksService);
  editTaskForm: FormGroup;
  taskEditing = signal(false);

  constructor(private fb: FormBuilder) {
    //
  }

  ngOnInit() {
    //TODO: Rework
    this.editTaskForm = this.fb.group<TaskForm>({
      text: new FormControl({value: this.task().text, disabled: true}),
      due: new FormControl({value: this.task().due, disabled: false}),
      duration: new FormControl({value: this.task().duration, disabled: true}),
      rate: new FormControl({value: this.task().rate, disabled: false}),
      tags: new FormControl({value: this.task().tags, disabled: false}),
      status: new FormControl({value: this.task().status, disabled: false}),
    })
  }


  @HostListener('window:keyup.esc', ['$event'])
  onEsc(event: MouseEvent) {
    if (this.taskEditing() != false) {
      this.onToggleTaskEditing();
    }
  }

  onSubmit(id: number) {
    this.editTaskForm.getRawValue()
    this.taskService.update(this.task().id, this.editTaskForm.getRawValue())
    this.onToggleTaskEditing();
  }

  getTaskPrice(rate: number, duration: number) {
    return (rate * duration).toFixed(2);

  }

  onToggleTaskEditing() {
    const state = this.taskEditing();
    this.taskEditing.set(!state);
    if (this.taskEditing()) {
      this.editTaskForm.get('text').enable();
      this.editTaskForm.get('status').disable();
      return
    }
    this.editTaskForm.get('text').disable();
    this.editTaskForm.get('status').enable();
  }

  editProperty(task: Task, property: keyof Task) {
    const propertyData: ModalData = {
      title: `Edit ${property}`,
      value: task[property],
      inputType: this.getInputType(property),
      propertyKey: property,
      taskId: task.id, // Optional: If needed for identifying the task
    }

    this.formModal().open(propertyData)

    // Subscribe to the save event
    const saveSubscription = this.formModal().save.subscribe((data: ModalData) => {
      this.onPropertyUpdate(data);

      // Optionally, clean up the subscription to avoid memory leaks
      saveSubscription.unsubscribe();
    });

  }

  private getInputType(key: string): string {
    const inputTypeMapping: { [key: string]: string } = {
      id: 'number',
      text: 'text',
      due: 'date',
      duration: 'number',
      rate: 'number',
    };

    return inputTypeMapping[key] || 'text';
  }


  private onPropertyUpdate(data: ModalData) {
    this.taskService.tasks.forEach((task) => {
      if (task.id === data.taskId) {
        // @ts-ignore
        //Provizórne riešenie kód sa zmení keď sa pripraví backend
        task[data.propertyKey] = data.value
      }
    })
  }
}
