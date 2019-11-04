import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppPipeModule } from '../pipes/pipes-module';
import { CommentRoutes } from './comment-routes';
import { FormsModule } from '@angular/forms';
import { CommentComponent } from './comment-component';
import { AddCommentComponent } from './add/add-comment-component';
import { ViewCommentComponent } from './view/view-comment-component';
import { UserCommentComponent } from './view/view-user-comment-component';
import { UserCommentReplyComponent } from './view/view-user-comment-reply-component';
@NgModule({
    imports: [CommonModule, FormsModule, CommentRoutes, AppPipeModule],
    declarations: [
        CommentComponent,
        AddCommentComponent,
        ViewCommentComponent,
        UserCommentComponent,
        UserCommentReplyComponent
    ]
})
export class CommentModule { }