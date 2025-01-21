import {Component, input} from '@angular/core';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss'
})
export class InputComponent {


  id = input.required<string>()
  name = input.required<string>()
  type = input.required<string>()
  placeholder = input<string>();
  label = input<string>();
}
