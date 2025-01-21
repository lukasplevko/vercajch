import {FormControl} from "@angular/forms";

export interface TaskForm {
  text: FormControl<string>,
  due: FormControl<string>,
  duration: FormControl<number>,
  rate: FormControl<number>,
  tags: FormControl<string[]>,
  status: FormControl<boolean>,
}
