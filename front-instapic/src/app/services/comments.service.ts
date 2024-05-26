import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Comment } from '../interfaces/comment.interface';


@Injectable({
  providedIn: 'root'
})

export class CommentsService {

  
  private commentsContainer: Comment[] = [];
  constructor() {}

  getFromLS(){
    const comments = localStorage.getItem('comments');
    if (comments) {
      return JSON.parse(comments);
    } else {
      return [];
    }
    
  }
   
  getComments(publicationId: number): Comment[] {

    const comments:Comment[] = this.getFromLS()
    const commentsPublication = comments.filter(c => c.publicationId === publicationId)
    return commentsPublication
  }
  addNewComment(comment:string, publicationId:number) {
    const timestamp = Date.now();
    this.commentsContainer = this.getFromLS()
    let commentContainer = { comment: comment, commentId: timestamp, publicationId: publicationId };

    this.commentsContainer.push(commentContainer);

    localStorage.setItem('comments', JSON.stringify(this.commentsContainer));
    
  }

  deleteComment(cId: number,indice: number) {
    const comments:Comment[] = this.getFromLS(); 
    const filteredComments = comments.filter(comment => comment.commentId !== cId);

    this.commentsContainer = filteredComments;
    localStorage.setItem('comments', JSON.stringify(filteredComments));

  }
}
