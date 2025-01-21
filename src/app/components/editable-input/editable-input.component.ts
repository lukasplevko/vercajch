import {Component, ElementRef, input, signal, viewChild} from '@angular/core';
import {NgClass, NgIf, NgOptimizedImage} from "@angular/common";

@Component({
  selector: 'app-editable-input',
  standalone: true,
  imports: [
    NgClass,
    NgOptimizedImage,
    NgIf
  ],
  templateUrl: './editable-input.component.html',
  styleUrl: './editable-input.component.scss'
})
export class EditableInputComponent {

  isEditable = signal<boolean | string>(false)
  text = signal<string>('');
  withToggle = input.required<boolean>();
  defaultText = input.required<string>();
  status = input<boolean>();
  inputElement = viewChild<ElementRef>('editInput');

  onToggleTaskEditing() {
    if (this.isEditable() === false) {
      this.isEditable.set('plaintext-only')
      this.onAutoFocus();
    } else {
      console.log("Closing it...")
      this.isEditable.set(false);
    }
    this.text.set(this.defaultText());
    console.log(this.isEditable(), "THIS IS RETURNED");
    return this.isEditable();
  }

  onGetNewText() {
    return this.inputElement()?.nativeElement.innerText.trim();
  }

  private onAutoFocus() {
    if (this.inputElement() != undefined) {
      setTimeout(() => {
        this.setCaretPositionToEnd()
      }, 10)
    }
  }

  private setCaretPositionToEnd() {
    const range = document.createRange();
    const sel = window.getSelection();
    const caretPos = this.defaultText().length + 1;
    range.setStart(this.inputElement()?.nativeElement.childNodes[0], caretPos)
    range.collapse(true)
    if (sel != null) {
      sel.removeAllRanges()
      sel.addRange(range)
    }
  }

}
