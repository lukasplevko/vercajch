import {Component, inject} from '@angular/core';
import {FormControl, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AIService} from "../../services/AI/ai.service";

@Component({
  selector: 'app-aichat',
  imports: [
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './aichat.component.html',
  styleUrl: './aichat.component.scss'
})
export class AIChatComponent {

  prompt = new FormControl('');
  AIService = inject(AIService);

  onSubmit() {
    this.AIService.chat(this.prompt.getRawValue());
  }
}
