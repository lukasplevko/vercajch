import {FormControl, FormGroup} from "@angular/forms";


export interface ModalForm<T extends { [K in keyof T]: FormControl<any> }, J> {
  form: FormGroup<T>,

  populateForm(data: J): void
}
