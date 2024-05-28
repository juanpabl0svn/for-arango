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
  friendRequests = [
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Jane Smith' },
    { id: 3, name: 'Alice Johnson' }
  ];

  acceptRequest(request: any) {
    // Implementar la lógica para aceptar la solicitud
    console.log(`Solicitud de amistad aceptada: ${request.name}`);
    this.friendRequests = this.friendRequests.filter(r => r.id !== request.id);
  }

  rejectRequest(request: any) {
    // Implementar la lógica para rechazar la solicitud
    console.log(`Solicitud de amistad rechazada: ${request.name}`);
    this.friendRequests = this.friendRequests.filter(r => r.id !== request.id);
  }

}
