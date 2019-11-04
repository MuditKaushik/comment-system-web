import { Component } from '@angular/core';
import { AppCommonService } from '../../core/services/common-service';
import { IUser } from 'src/app/core/model/user';
import { CommentService } from '../../core/http-service/comment-http-service';
@Component({
    selector: 'app-add-comment',
    templateUrl: 'app/comment/add/add-comment-template.html'
})
export class AddCommentComponent {
    comment: string;
    isPostDisable: boolean = true;
    constructor(private appservice: AppCommonService, private commentService: CommentService) {
        this.appservice.seletedUserObservable.subscribe((user) => {
            if (user) {
                this.appservice.setSelectedUser = user;
                this.appservice.refreshComments.next(true);
                this.isPostDisable = false;
            } else {
                this.appservice.setSelectedUser = {} as IUser;
                this.isPostDisable = true;
            }
        });
    }
    get selectedUser(): IUser {
        return this.appservice.getSelectedUser;
    }
    post(): void {
        if (this.comment && this.selectedUser.userid) {
            this.commentService.saveComment({ comment: this.comment, userid: this.selectedUser.userid })
                .subscribe((comment) => {
                    this.appservice.refreshComments.next(true);
                    this.comment = '';
                    this.appservice.addToastMessageObservable.next({
                        isAutoDispose: true,
                        message: 'Comment Posted successfully.',
                        type: 'success'
                    });
                }, (err) => {
                    this.appservice.addToastMessageObservable.next({
                        isAutoDispose: false,
                        message: 'Unable to post comment. Please try again!!!!',
                        type: 'error'
                    });
                });
        } else {
            this.appservice.addToastMessageObservable.next({
                isAutoDispose: false,
                message: 'Please add comment before posting.',
                type: 'info'
            });
        }
    }
}
