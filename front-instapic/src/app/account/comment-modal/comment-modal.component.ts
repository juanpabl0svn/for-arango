import { CommonModule } from '@angular/common';
import { Component, Inject, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { OnInit } from '@angular/core';

import { IComment } from '../../interfaces/comment.interface';
import { GET, POST } from '../../../constants';
import ContextService from '../../services/context.service';

interface CommentModalData {
  id_post: number;
}

@Component({
  selector: 'app-comment-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './comment-modal.component.html',
  styleUrl: './comment-modal.component.css',
})
export class CommentModalComponent {
  constructor(
    public matDialogRef: MatDialogRef<CommentModalComponent>,
    @Inject(MAT_DIALOG_DATA) private data: CommentModalData,
    public context: ContextService
  ) {}

  comments: any[] = [];

  inputComment: string = '';

  async ngOnInit() {
    this.comments = await GET(`/comment/${this.data.id_post}`);
    console.log(this.comments);
  }

  async publishComment(comment: string) {
    if (this.inputComment.trim() === '') {
      return;
    }

    const commentData = {
      comment,
      id_post: this.data.id_post,
      id_user: this.context.user.id_user,
      nickname: this.context.user.nickname,
    };

    console.log(commentData);

    const newComment = await POST('/comment', commentData);

    if (!newComment)
      return alert(
        'No se pudo publicar el comentario, no sigues a esta persona'
      );

    console.log(newComment);

    this.comments.push(newComment);

    this.inputComment = '';
  }
}
