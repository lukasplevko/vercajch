import {Component} from '@angular/core';
import {NavigationComponent} from "../navigation/navigation.component";

@Component({
    selector: 'app-sidebar',
    imports: [
        NavigationComponent
    ],
    templateUrl: './sidebar.component.html',
    styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {

}
