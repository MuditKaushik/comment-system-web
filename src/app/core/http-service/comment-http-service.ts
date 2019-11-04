import { Injectable } from '@angular/core';
import { CommentHttp } from '../http/comment-http';
import { Observable } from 'rxjs';
import { ICommentModel, IUserComments, IReplyComment } from '../model';
import { map } from 'rxjs/operators';
import { IUser } from '../model/user';

@Injectable()
export class CommentService {
    constructor(private commentHttp: CommentHttp) { }
    saveComment(comment: { comment: string, userid: string }): Observable<ICommentModel> {
        return this.commentHttp.saveComment(comment).pipe(map((savedComment) => {
            return savedComment;
        }));
    }
    saveReply(reply: IReplyComment): Observable<ICommentModel> {
        return this.commentHttp.saveReply(reply).pipe(map((savedReply) => {
            return savedReply;
        }));
    }
    editComment(comment: any): Observable<ICommentModel> {
        return this.commentHttp.editComment(comment).pipe(map((editComment) => {
            return editComment;
        }));
    }
    getUserComment(userId: string): Observable<IUserComments> {
        return this.commentHttp.getUserComment(userId).pipe(map((usercomments) => {
            return usercomments;
        }));
    }
    getReplies(commentId: string): Observable<Array<ICommentModel>> {
        return this.commentHttp.getReplies(commentId).pipe(map((comments) => {
            return comments;
        }));
    }
    getAllUserComments(): Observable<Array<IUserComments>> {
        return this.commentHttp.getAllUserComment().pipe(map((comments) => {
            return comments;
        }));
    }
    getUsers(): Observable<Array<IUser>> {
        return this.commentHttp.getUsers().pipe(map((users) => {
            return users;
        }));
    }
}
