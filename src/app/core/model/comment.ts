export interface IEditComment {
    isedit: boolean;
    isreply: boolean;
    editcomment: string;
}
export interface ICommentModel extends IEditComment {
    comment: string;
    commentid: string;
    datetime: string;
    parentid?: string
}

export interface IReplyComment {
    userid: string;
    comment: string;
    parentid: string;
}