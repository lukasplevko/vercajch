import {Component} from '@angular/core';
import {RouterLink, RouterLinkActive} from "@angular/router";
import {routes} from "../../app.routes";

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss'
})
export class NavigationComponent {


  links = routes.filter((route) => route.path != '' && route.data?.['mainMenu']);
  protected readonly routes = routes;

}
