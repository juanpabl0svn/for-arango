import { Component } from '@angular/core';
import { ProfilePicturesService } from '../../services/profile-pictures.service';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { CommentModalComponent } from '../comment-modal/comment-modal.component';

@Component({
  selector: 'user-pics',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-pics.component.html',
  styleUrl: './user-pics.component.css',
})
export class UserPicsComponent {
  constructor(
    private profileService: ProfilePicturesService,
    private matDialog: MatDialog
  ) {}

  pictures = this.profileService.loadPictures();
  userPictures = this.profileService.loadUsersPictures();
  openModal(Id: number): void {
    this.matDialog.open(CommentModalComponent, { data: {pictureId: Id} });
  }
}
