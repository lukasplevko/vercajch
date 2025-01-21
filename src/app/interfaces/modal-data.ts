import {Task} from "./task";

export interface ModalData {
  title: string;
  value: unknown;
  inputType: string;
  propertyKey: keyof Task;
  taskId?: number;
}
