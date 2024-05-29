import { Component } from '@angular/core';
import { MenuComponent } from '../../shared/menu/menu.component';
import { RouterLink } from '@angular/router';
import { UserPicsComponent } from '../user-pics/user-pics.component';
import ContextService from '../../services/context.service';
import { GET } from '../../../constants';

@Component({
  selector: 'account',
  standalone: true,
  imports: [MenuComponent, UserPicsComponent, RouterLink],
  templateUrl: './account-page.component.html',
  styleUrl: './account-page.component.css',
})
export class AccountPageComponent {
  postCount: number = 0;
  pendingFollowsCount: number = 0;
  followersCount: number = 0;
  posts: any[] = [];

  constructor(public context: ContextService) {}

  async ngOnInit() {
    const profileData = await GET(
      `/user/nickname/${this.context.user?.nickname}`
    );

    if (!profileData) {
      return;
    }

    this.followersCount = profileData.followersCount;
    this.posts = profileData.posts;
    this.pendingFollowsCount = profileData.pendingFollowsCount;

    this.postCount = profileData.posts.length;
  }
}
