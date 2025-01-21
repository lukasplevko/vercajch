import {Routes} from '@angular/router';
import {HomeComponent} from "./components/views/home/home.component";
import {NotesComponent} from "./components/views/notes/notes.component";
import {RemindersComponent} from "./components/views/reminders/reminders.component";
import {TasksComponent} from "./components/views/tasks/tasks.component";
import {NewTaskComponent} from "./components/views/new-task/new-task.component";


const routes: Routes = [
  {path: 'home', title: 'Domov', component: HomeComponent, data: {mainMenu: true}},
  {path: 'notes', title: 'Poznámky', component: NotesComponent, data: {mainMenu: true}},
  {path: 'reminders', title: 'Pripomienky', component: RemindersComponent, data: {mainMenu: true}},
  {path: 'tasks', title: 'Úlohy', component: TasksComponent, data: {mainMenu: true}},
  {path: 'tasks/new', title: 'Nový task', component: NewTaskComponent, data: {mainMenu: false}},

  {path: '', redirectTo: '/home', pathMatch: 'full', data: {mainMenu: false}},
]


export {routes};

