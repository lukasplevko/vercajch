import {Component, ElementRef, HostListener, viewChild} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {ModalService} from "../../../services/modal/modal.service";

@Component({
  selector: 'modal',
  imports: [
    FormsModule
  ],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent {

  modal = viewChild<ElementRef<HTMLDivElement>>('modal');
  backdrop = viewChild<ElementRef<HTMLDivElement>>('backdrop');

  constructor(private modalService: ModalService, private element: ElementRef) {

  }

  @HostListener("window:keyup.escape", ["$event"])
  onEsc() {
    this.onClose()
  }

  onClose() {
    this.modalService.close();
  }

  open() {
    //Create form modal in DOM
  }

  close() {
    //remove form modal from dom
    this.modal().nativeElement.remove();
    this.backdrop().nativeElement.remove();
  }

  onStoreChanges() {
  }

}
