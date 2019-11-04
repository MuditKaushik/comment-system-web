import { Component, OnInit } from '@angular/core';
import { CommentService } from '../../core/http-service/comment-http-service';
import { AppCommonService } from '../../core/services/common-service';
import { IUserComments } from 'src/app/core/model';
@Component({
    selector: 'app-view-comments',
    templateUrl: 'app/comment/view/view-comment-template.html'
})
export class ViewCommentComponent implements OnInit {
    comments: Array<IUserComments> = new Array<IUserComments>();
    constructor(private commentService: CommentService, private commonservice: AppCommonService) { }
    ngOnInit(): void {
        this.commonservice.refreshComments.subscribe(() => {
            this.getComments();
        });
    }
    getComments(): void {
        this.commentService.getAllUserComments().subscribe((allcomments) => {
            this.comments = allcomments;
        }, (err) => {
            this.commonservice.addToastMessageObservable.next({
                type: 'error',
                message: 'Unable to fetch comments.',
                isAutoDispose: true
            });
        });
    }
}
