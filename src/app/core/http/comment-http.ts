import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ICommentModel, IUserComments } from '../model';
import { IUser } from '../model/user';

@Injectable()
export class CommentHttp {
    constructor(private http: HttpClient) { }
    saveComment(comment: any): Observable<ICommentModel> {
        return this.http.post<ICommentModel>('api/comment/add', comment, { observe: 'response' }).pipe(map((response) => {
            return (response.status === 200 && response.body != null) ? <ICommentModel>response.body : {} as ICommentModel;
        }));
    }
    saveReply(reply: any): Observable<ICommentModel> {
        return this.http.post<ICommentModel>('api/comment/reply', reply, { observe: 'response' }).pipe(map((response) => {
            return (response.status === 200 && response.body != null) ? <ICommentModel>response.body : {} as ICommentModel;
        }));
    }
    editComment(comment: any): Observable<ICommentModel> {
        return this.http.put<ICommentModel>('api/comment/edit', comment, { observe: 'response' }).pipe(map((response) => {
            return (response.status === 200 && response.body != null) ? <ICommentModel>response.body : {} as ICommentModel;
        }));
    }
    getUserComment(userId: string): Observable<IUserComments> {
        return this.http.get(`api/comment/${userId}`, { observe: 'response' }).pipe(map((response) => {
            return (response.status === 200 && response.body != null) ? <IUserComments>response.body : {} as IUserComments;
        }));
    }
    getReplies(commentId: string): Observable<Array<IUserComments>> {
        return this.http.get(`api/comment/reply/${commentId}`, { observe: 'response' }).pipe(map((response) => {
            return (response.status === 200 && response.body != null) ? <Array<IUserComments>>response.body : [];
        }));
    }
    getAllUserComment(): Observable<Array<IUserComments>> {
        return this.http.get('api/comment', { observe: 'response' }).pipe(map((response) => {
            return (response.status === 200 && response.body != null) ? <Array<IUserComments>>response.body : [];
        }));
    }
    getUsers(): Observable<Array<IUser>> {
        return this.http.get('api/comment/users', { observe: 'response' }).pipe(map((response) => {
            return (response.status === 200 && response.body) ? <Array<IUser>>response.body : [];
        }));
    }
}