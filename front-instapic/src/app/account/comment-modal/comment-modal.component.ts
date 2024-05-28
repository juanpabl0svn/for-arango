import { CommonModule } from '@angular/common';
import { Component, Inject, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommentsService } from '../../services/comments.service';
import { OnInit } from '@angular/core';

import { IComment } from '../../interfaces/comment.interface';

interface CommentModalData {
  pictureId: number;
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
    public commentService: CommentsService
  ) {}

  inputComment: string = '';

  ngOnInit() {
    this.commentService.getComments(this.data.pictureId);
  }

  ngOnDestroy() {
    this.commentService.comments = [];
  }

  publishComment(comment: string) {
    if (this.inputComment.trim() === '') {
      return;
    }
    console.log(this.data.pictureId);
    this.commentService.addNewComment(comment, this.data.pictureId);
    this.inputComment = '';
  }
  deleteComment(cId: number) {
    this.commentService.deleteComment(cId);
  }
}
