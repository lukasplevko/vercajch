import {Component, HostListener, inject, input, signal, viewChild} from '@angular/core';
import {Task} from "../../interfaces/task";
import {FormsModule} from "@angular/forms";
import {NgIf, NgOptimizedImage} from "@angular/common";
import {EditableInputComponent} from "../editable-input/editable-input.component";
import {InputModalComponent} from "../shared/input-modal/input-modal.component";
import {ModalData} from "../../interfaces/modal-data";
import {TasksService} from "../../services/tasks.service";


@Component({
  selector: 'app-task',
  standalone: true,
  imports: [
    FormsModule,
    NgOptimizedImage,
    NgIf,
    EditableInputComponent,
    InputModalComponent
  ],
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss'
})
export class TaskComponent {
  task = input.required<Task>();
  editingState = signal<false | 'plaintext-only'>(false);
  editableInput = viewChild<EditableInputComponent>(EditableInputComponent)
  inputModal = viewChild<InputModalComponent>(InputModalComponent);
  taskService = inject(TasksService);

  constructor() {
    //
  }


  @HostListener('window:keyup.esc', ['$event'])
  onEsc(event: MouseEvent) {
    if (this.editingState() != false) {
      this.onToggleTaskEditing();
    }
  }

  onUpdateTask() {
    //PALO - ViewChild vracia EditableInputComponent alebo undefined. Rovnako ako všetky ostatné viewChild.
    //Rieši sa to takto alebo je nejaká alternatíva?
    //If statement kde overujem či nie je undefined nefunguje, môžeš skúsiť.
    this.task().text = this.editableInput()?.onGetNewText() ?? '';
    console.log("THIS IS NEW TEXT", this.task().text);
    this.onToggleTaskEditing();
  }

  getTaskPrice(rate: number, duration: number) {
    return (rate * duration).toFixed(2);

  }

  onToggleTaskEditing() {
    this.editingState.set(this.editableInput()?.onToggleTaskEditing() ? 'plaintext-only' : false);
  }

  editProperty(task: Task, property: keyof Task) {
    const propertyData: ModalData = {
      title: `Edit ${property}`,
      value: task[property],
      inputType: this.getInputType(property),
      propertyKey: property,
      taskId: task.id, // Optional: If needed for identifying the task
    }

    this.inputModal().open(propertyData)

    // Subscribe to the save event
    const saveSubscription = this.inputModal().save.subscribe((data: ModalData) => {
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
