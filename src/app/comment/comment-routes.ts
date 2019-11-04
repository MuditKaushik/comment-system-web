import { NgModule } from '@angular/core';
import { Routes, RouterModule, Route } from '@angular/router';
import { CommentComponent } from './comment-component';

let lazyCommentRoutes: Routes = new Array<Route>({
    path: '',
    component: CommentComponent
});

@NgModule({
    imports: [RouterModule.forChild(lazyCommentRoutes)],
    exports: [RouterModule]
})
export class CommentRoutes { }