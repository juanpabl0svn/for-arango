import { Component } from '@angular/core';
import { MenuComponent } from '../shared/menu/menu.component';
import { POST } from '../../constants';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [MenuComponent],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css',
})
export class SearchComponent {
  searchQuery: string = '';
  users: any[] = [];

  async search(e: Event) {
    const username = (e.target as HTMLInputElement).value;

    if (!username) return (this.users = []);
    const usersAPI = await POST('/user/users', { username });

    console.log(usersAPI);

    this.users = usersAPI;

    return;
  }

  toggleFollow(user: any) {
    user.following = !user.following;
  }
}
