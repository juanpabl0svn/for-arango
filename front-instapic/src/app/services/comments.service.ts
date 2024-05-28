import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import ContextService from './context.service';
import { IComment } from '../interfaces/comment.interface';

@Injectable({
  providedIn: 'root',
})
export class CommentsService {
  comments: IComment[] = [];

  constructor(private context: ContextService) {}

  getComments(publicationId: number): IComment[] {
    const publicationComments: IComment[] = [];
    return (this.comments = publicationComments);
  }

  addNewComment(comment: string, publicationId: number) {
    const timestamp = Date.now();
    const date = new Date(timestamp).toISOString().split('T')[0];
    const { nickname, id_user } = this.context.user;

    let commentContainer = {
      comment: comment,
      commentId: crypto.randomUUID(),
      publicationId: publicationId,
      id_user,
      nickname,
      date,
    };
    this.comments.push(commentContainer as any);
    return commentContainer;
  }

  deleteComment(cId: number) {
    const filteredComments = this.comments.filter(
      (comment: IComment) => comment.commentId !== cId
    );

    return (this.comments = filteredComments);
  }
}
