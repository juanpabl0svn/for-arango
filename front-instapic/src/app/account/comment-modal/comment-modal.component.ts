import { CommonModule } from '@angular/common';
import { Component, Inject, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommentsService } from '../../services/comments.service';
import { OnInit } from '@angular/core';

interface CommentModalData {
  pictureId: number;
}

interface Comment {
  commentId: number;
  comment: string;
  publicationId: number;
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
    private commentService: CommentsService){}

  ngOnInit(): void {
    this.commentsArray = this.commentService.getComments(this.data.pictureId)
  }
  inputComment: string = '';
  commentsArray: Comment[] = []
  publishComment(comment: string) {
    if (this.inputComment === '') {
      return;
    }
    this.commentService.addNewComment(comment, this.data.pictureId);
    this.commentsArray = this.commentService.getComments(this.data.pictureId);
    this.inputComment = '';
  }
  deleteComment(cId: number,indice:number) {
    this.commentService.deleteComment(cId,indice);
  }
}
