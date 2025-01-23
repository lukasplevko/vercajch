import {Component, ElementRef, forwardRef, input, Renderer2, signal, viewChild} from '@angular/core';
import {NgClass, NgIf, NgOptimizedImage} from "@angular/common";
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";

@Component({
  selector: 'app-editable-input',
  imports: [
    NgClass,
    NgOptimizedImage,
    NgIf
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => EditableInputComponent),
      multi: true,
    }
  ],
  templateUrl: './editable-input.component.html',
  styleUrl: './editable-input.component.scss'
})
export class EditableInputComponent implements ControlValueAccessor {


  contentEditable = signal<boolean | string>(false)
  text = signal<string>('');
  withToggle = input.required<boolean>();
  status = input<boolean>();
  inputElement = viewChild<ElementRef<HTMLDivElement>>('editInput');
  value: string;

  constructor(private el: ElementRef, private renderer: Renderer2) {
    //
  }

  writeValue(value: string) {
    this.text.set(value);
    this.renderer.setProperty(this.inputElement().nativeElement, 'innerText', value);
  }

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean) {
    this.contentEditable.set(isDisabled);
    if (this.contentEditable() === false) {
      this.contentEditable.set('plaintext-only')
      this.onAutoFocus();
    } else {
      this.contentEditable.set(false);
    }
    return this.contentEditable();
  }

  onInput() {
    const value = this.inputElement().nativeElement.innerText;
    this.text.set(value)
  }

  private onTouched = () => {
  };

  private onChange = () => {
  };


  private onAutoFocus() {
    if (this.inputElement() != undefined && this.text) {
      setTimeout(() => {
        this.setCaretPositionToEnd()
      }, 10)
    }
  }

  private setCaretPositionToEnd() {
    const range = document.createRange();
    const sel = window.getSelection();
    const caretPos = this.text().length;
    range.setStart(this.inputElement()?.nativeElement.childNodes[0], caretPos)
    range.collapse(true)
    if (sel != null) {
      sel.removeAllRanges()
      sel.addRange(range)
    }
  }

}
