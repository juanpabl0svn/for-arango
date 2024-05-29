import { Component } from '@angular/core';
import { MenuComponent } from '../shared/menu/menu.component';
import { GET, POST } from '../../constants';
import ContextService from '../services/context.service';

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [MenuComponent],
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.css',
})
export class NotificationsComponent {
  constructor(private context: ContextService) {}

  friendRequests: any[] = [];

  async ngOnInit() {
    this.friendRequests = await GET(`/follow/${this.context.user?.id_user}`);
    console.log(this.friendRequests)
  }

  async acceptRequest(id_follow: number) {
    await POST('/follow/accept', {
      id_follow,
    });

    const index = this.friendRequests.findIndex(
      (r) => r.id_follow === id_follow
    );

    this.friendRequests[index].state = 'ACCEPTED';
  }

  async rejectRequest(id_follow: number) {
    await POST('/follow/reject', {
      id_follow,
    });

    const index = this.friendRequests.findIndex(
      (r) => r.id_follow === id_follow
    );

    this.friendRequests[index].state = 'REJECTED';
  }
}
