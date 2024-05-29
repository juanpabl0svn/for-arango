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
      const userData = await GET(`/user/nickname/${param['nickname']}`);

      if (!userData) {
        return this.router.navigate(['/']);
      }

      return (this.currentUser = userData);
    });
  }
}
