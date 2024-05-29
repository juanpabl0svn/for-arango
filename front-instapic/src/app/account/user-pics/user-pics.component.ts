import { Component, Input } from '@angular/core';
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
  constructor(private matDialog: MatDialog) {}

  @Input() posts: any[] = [];

  openModal(id_post: number): void {
    this.matDialog.open(CommentModalComponent, { data: { id_post } });
  }
}
