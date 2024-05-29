import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GET, POST } from '../../constants';
import ContextService from '../services/context.service';

import { MenuComponent } from '../shared/menu/menu.component';

@Component({
  selector: 'app-user-info',
  standalone: true,
  imports: [MenuComponent],
  templateUrl: './user-info.component.html',
  styleUrl: './user-info.component.css',
})
export class UserInfoComponent {
  currentUser: any = {};

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public context: ContextService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(async (param) => {
      const userData = await POST(`/user/search`, {
        nickname: param['nickname'],
        id_user: this.context.user?.id_user,
      });

      if (!userData) {
        return this.router.navigate(['/']);
      }

      return (this.currentUser = userData);
    });
  }

  async follow() {
    const isFollowing = await POST('/follow', {
      id_user_follower: this.context.user?.id_user,
      id_user: this.currentUser.id_user,
    });

    if (!isFollowing) {
      return alert('No se pudo seguir a esta persona');
    }

    this.currentUser.state = 'pending';
  }

  // unfollow() {}
}
