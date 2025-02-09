import {ApplicationRef, ComponentRef, createComponent, EnvironmentInjector, Injectable, Type} from '@angular/core';
import {ModalComponent} from "../../components/shared/modal/modal.component";
import {Task} from "../../interfaces/task";

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  newModal: ComponentRef<ModalComponent>

  constructor(
    private appRef: ApplicationRef,
    private injector: EnvironmentInjector
  ) {
  }

  open(component: Type<unknown>, data: Task | null = null) {
    const newComponent = createComponent(component, {
      environmentInjector: this.injector
    })
    this.newModal = createComponent(ModalComponent, {
      environmentInjector: this.injector,
      projectableNodes: [[newComponent.location.nativeElement]]
    })

    if (this.isModalForm(newComponent.instance) && data) {
      (newComponent.instance as any).populateForm(data);
    }
    document.body.appendChild(this.newModal.location.nativeElement);
    this.appRef.attachView(newComponent.hostView);
    this.appRef.attachView(this.newModal.hostView);
  }

  close() {
    this.newModal.instance.close();
  }


  // Type Guard Function
  private isModalForm(componentInstance: any): componentInstance is { populateForm: Function } {
    return 'populateForm' in componentInstance;
  }
}
