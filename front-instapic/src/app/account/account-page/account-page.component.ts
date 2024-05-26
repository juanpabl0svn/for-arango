import { Component } from '@angular/core';
import { MenuComponent } from '../../shared/menu/menu.component';
import { RouterLink } from '@angular/router';
import { UserPicsComponent } from '../user-pics/user-pics.component';
import { ProfilePicturesService } from '../../services/profile-pictures.service';

@Component({
  selector: 'account',
  standalone: true,
  imports: [MenuComponent,UserPicsComponent,RouterLink],
  templateUrl: './account-page.component.html',
  styleUrl: './account-page.component.css'
})
export class AccountPageComponent {
  constructor(private profileService: ProfilePicturesService){}

  publicationsNumber = this.profileService.publicationsCount()

}
