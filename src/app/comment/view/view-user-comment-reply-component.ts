import { Component, Input, OnInit } from '@angular/core';
import { CommentService } from '../../core/http-service/comment-http-service';
import { AppCommonService } from '../../core/services/common-service';
import { IUserComments, IReplyComment, ICommentModel } from 'src/app/core/model';
@Component({
    selector: 'app-user-comment-reply',
    templateUrl: 'app/comment/view/view-user-comment-reply-template.html'
})
export class UserCommentReplyComponent implements OnInit {
    @Input('commentId') commentId: string;
    replies: Array<IUserComments> = new Array<IUserComments>();
    constructor(private commentService: CommentService, private appService: AppCommonService) { }
    ngOnInit(): void {
        this.fetchCommentReplies(this.commentId);
    }
    fetchCommentReplies(commentId: string): void {
        if (this.commentId) {
            this.commentService.getReplies(commentId).subscribe((replies) => {
                this.setCommentReplyies = replies;
            }, (err) => {
                this.appService.addToastMessageObservable.next({
                    isAutoDispose: true,
                    message: 'Unable to fetch comment replies.',
                    type: 'error'
                });
            });
        }
    }
    replyEdit(comment: IUserComments): void {
        if (this.isValidComment(comment)) {
            let editComment: ICommentModel = comment;
            editComment.comment = comment.editcomment;
            this.commentService.editComment(editComment).subscribe((updatedComment) => {
                comment.comment = comment.editcomment;
                comment.isedit = false;
                this.appService.addToastMessageObservable.next({
                    message: 'Comment updated successfully.',
                    isAutoDispose: true,
                    type: 'success'
                });
            }, (err) => {
                this.appService.addToastMessageObservable.next({
                    message: 'Error occured while updating your comment.',
                    isAutoDispose: true,
                    type: 'error'
                });
            });
        }
    }
    commentReply(comment: IUserComments): void {
        let replyComment: IReplyComment = {
            comment: comment.editcomment,
            parentid: this.commentId,
            userid: this.appService.getSelectedUser.userid
        };
        if (this.isValidReply(replyComment)) {
            this.commentService.saveReply(replyComment).subscribe((replyComment) => {
                comment.comment = comment.comment;
                comment.editcomment = ''
                comment.isreply = false;
                this.fetchCommentReplies(this.commentId);
                this.appService.addToastMessageObservable.next({
                    message: 'Reply comment sent successfully.',
                    isAutoDispose: true,
                    type: 'success'
                });
            }, (err) => {
                this.appService.addToastMessageObservable.next({
                    message: 'Error occured while sending your reply.',
                    isAutoDispose: true,
                    type: 'error'
                });
            });
        }
    }
    canEditComment(userId: string): boolean {
        if (this.appService.getSelectedUser.userid) {
            return (userId === this.appService.getSelectedUser.userid);
        } else {
            return false;
        }
    }
    get canShowCommentMenu(): boolean {
        return (this.appService.getSelectedUser.userid) ? true : false;
    }
    private set setCommentReplyies(replies: Array<IUserComments>) {
        for (let reply of replies) {
            this.replies.push({
                comment: reply.comment,
                commentid: reply.commentid,
                datetime: reply.datetime,
                editcomment: '',
                email: reply.email,
                isedit: false,
                isreply: false,
                name: reply.name,
                parentid: reply.parentid,
                userid: reply.userid,
                username: reply.username
            });
        }
    }
    private isValidComment(comment: IUserComments): boolean {
        if (comment.editcomment && comment.editcomment.trim().length) {
            if (comment.editcomment === comment.comment) {
                return false;
            } else {
                return true;
            }
        } else {
            return false;
        }
    }
    private isValidReply(reply: IReplyComment): boolean {
        if (reply.comment && reply.comment.trim().length && reply.userid && reply.parentid) {
            return true;
        } else {
            return false;
        }
    }
}