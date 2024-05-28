import { Component } from '@angular/core';
import { MenuComponent } from '../shared/menu/menu.component';


@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [MenuComponent],
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.css'
})
export class NotificationsComponent {

}
