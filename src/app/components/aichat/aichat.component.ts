import {Component, inject, signal} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AIService} from "../../services/AI/ai.service";
import {TasksService} from "../../services/tasks/tasks.service";
import {TaskForm} from "../../interfaces/task-form";
import {AITask} from "../../interfaces/aitask";
import {BtnComponent} from "../shared/btn/btn.component";
import {ChatLoaderComponent} from "./chat-loader/chat-loader.component";
import {ModalService} from "../../services/modal/modal.service";

@Component({
  selector: 'app-aichat',
  imports: [
    ReactiveFormsModule,
    FormsModule,
    BtnComponent,
    ChatLoaderComponent
  ],
  templateUrl: './aichat.component.html',
  styleUrl: './aichat.component.scss'
})
export class AIChatComponent {

  taskService = inject(TasksService);
  modalService = inject(ModalService);
  prompt = new FormControl('I need to create a simple website for my client Sedlo Čertovica which is a region in Slovakia. They provided me with the texts and I now need to give them my estimation. I have to do these tasks: Design the website, setup a wordpress hosting, and then create a custom template from the design.');
  AIService = inject(AIService);
  answer = signal('');
  data = signal<AITask[] | null>(null);
  isLoading = signal<boolean>(false);


  async onSubmit() {
    this.answer.update(() => null);
    this.data.update(() => null)
    this.isLoading.update(() => true)
    const response = await this.AIService.chat(this.prompt.getRawValue());
    let responseBuffer = '';
    for await (const part of response) {
      responseBuffer += part.message.content
    }
    try {
      this.data.set(JSON.parse(responseBuffer));
    } catch (error) {
      console.log(responseBuffer);
      console.error("Error parsing task data:", error);
    }
    this.answer.set('These are my recommended tasks: ');

    this.isLoading.update(() => false)
  }

  price(duration: number, rate: number) {
    return Math.round(duration * rate)
  }

  onCreateTasks() {
    const form = new FormGroup<TaskForm>({
      text: new FormControl(''),
      due: new FormControl(''),
      finished_at: new FormControl(''),
      duration: new FormControl(0),
      rate: new FormControl(0),
      tags: new FormControl([]),
      status: new FormControl(false),
    })
    for (const task of this.data()) {
      for (const [key, item] of Object.entries(task)) {
        form.get(key).setValue(item);
      }
      this.taskService.store(form)
    }

    this.modalService.close()
  }
}
