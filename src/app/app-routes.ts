import { NgModule } from '@angular/core';
import { Routes, Route, RouterModule } from '@angular/router';
import { env } from '../server/server.config.json';
import { CommentModule } from './comment/comment-module';
let routeTracing = (env === 'DEV') ? true : false;
let lazyRoutes: Routes = new Array<Route>(
    {
        path: 'comment',
        loadChildren: () => CommentModule
    },
    {
        path: '',
        redirectTo: 'comment',
        pathMatch: 'full'
    }
);

@NgModule({
    imports: [RouterModule.forRoot(lazyRoutes, { enableTracing: routeTracing })],
    exports: [RouterModule]
})
export class AppRouteModule { }
