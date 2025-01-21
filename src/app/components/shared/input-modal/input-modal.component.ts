import {Component, ElementRef, output, signal, viewChild} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {ModalData} from "../../../interfaces/modal-data";

@Component({
  selector: 'app-input-modal',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './input-modal.component.html',
  styleUrl: './input-modal.component.scss'
})
export class InputModalComponent {

  inputModal = viewChild<ElementRef<HTMLDivElement>>('inputModal');
  backdrop = viewChild<ElementRef<HTMLDivElement>>('backdrop');
  data = signal<ModalData | null>(null);

  save = output<ModalData>();

  open(data: ModalData) {

    this.data.set(data);
    //TODO: Refactor ked bude cas.
    const cls = ['visible', 'pointer-events-all', 'scale-1']
    this.inputModal().nativeElement.classList.replace("invisible", "visible")
    this.inputModal().nativeElement.classList.replace("pointer-events-none", "pointer-events-all")
    this.inputModal().nativeElement.classList.replace("scale-75", "scale-1")
    this.backdrop().nativeElement.classList.replace("hidden", "block");
    this.backdrop().nativeElement.classList.replace("invisible", "visible");
  }

  close() {
    this.data.set(null);
    this.inputModal().nativeElement.classList.replace("visible", "invisible")
    this.inputModal().nativeElement.classList.replace("pointer-events-all", "pointer-events-none")
    this.inputModal().nativeElement.classList.replace("scale-1", "scale-75")
    this.backdrop().nativeElement.classList.replace("block", "hidden");
    this.backdrop().nativeElement.classList.replace("visible", "invisible");
  }

  onStoreChanges() {
    this.save.emit(this.data());
    this.close();
  }

}
