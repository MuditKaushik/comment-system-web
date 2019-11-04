import { ICommentModel } from './comment';

export interface IUserComments extends ICommentModel {
    email: string;
    name: string;
    userid: string;
    username: string;
}