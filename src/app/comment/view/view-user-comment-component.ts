import { Component, Input, OnInit } from '@angular/core';
import { IUserComments, ICommentModel, IReplyComment } from 'src/app/core/model';
import { CommentService } from '../../core/http-service/comment-http-service';
import { AppCommonService } from '../../core/services/common-service';
@Component({
    selector: 'view-user-comment',
    templateUrl: 'app/comment/view/view-user-comment-template.html'
})
export class UserCommentComponent implements OnInit {
    @Input('comments') comments: Array<IUserComments>;
    constructor(private commentService: CommentService, private commonService: AppCommonService) { }
    ngOnInit(): void { }
    edit(comment: IUserComments): void {
        if (this.isValidComment(comment)) {
            let editComment: ICommentModel = comment;
            editComment.comment = comment.editcomment;
            this.commentService.editComment(editComment).subscribe((updatedComment) => {
                comment.comment = comment.editcomment;
                comment.isedit = false;
                this.commonService.addToastMessageObservable.next({
                    message: 'Comment updated successfully.',
                    isAutoDispose: true,
                    type: 'success'
                });
            }, (err) => {
                this.commonService.addToastMessageObservable.next({
                    message: 'Error occured while updating your comment.',
                    isAutoDispose: true,
                    type: 'error'
                });
            });
        }
    }
    reply(comment: IUserComments): void {
        let replyComment: IReplyComment = {
            comment: comment.editcomment,
            parentid: comment.commentid,
            userid: this.commonService.getSelectedUser.userid
        };
        if (this.isValidReply(replyComment)) {
            this.commentService.saveReply(replyComment).subscribe((replyComment) => {
                comment.comment = comment.comment;
                comment.editcomment = ''
                comment.isreply = false;
                this.commonService.addToastMessageObservable.next({
                    message: 'Reply comment sent successfully.',
                    isAutoDispose: true,
                    type: 'success'
                });
            }, (err) => {
                this.commonService.addToastMessageObservable.next({
                    message: 'Error occured while sending your reply.',
                    isAutoDispose: true,
                    type: 'error'
                });
            });
        }
    }
    canEditComment(userId: string): boolean {
        if (this.commonService.getSelectedUser.userid) {
            return (userId === this.commonService.getSelectedUser.userid);
        } else {
            return false;
        }
    }
    get canShowCommentMenu(): boolean {
        return (this.commonService.getSelectedUser.userid) ? true : false;
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