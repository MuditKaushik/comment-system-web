import { Component } from '@angular/core';
import { AppCommonService } from './core/services/common-service';
import { CommentService } from './core/http-service/comment-http-service';
import { Router, NavigationEnd } from '@angular/router';
import { IUser } from './core/model/user';
@Component({
    selector: 'app-comment',
    templateUrl: 'app/app-template.html'
})
export class AppComponent {
    users: Array<IUser> = [];
    constructor(private router: Router, private commentservice: CommentService, private appCommonservice: AppCommonService) {
        this.router.events.subscribe((event) => {
            if (event instanceof NavigationEnd) {
                // this.commonService.resetCommonBehaviorVariables();
            }
        });
        this.commentservice.getUsers().subscribe((users) => {
            this.users = users;
            this.appCommonservice.addToastMessageObservable.next({
                isAutoDispose: true,
                message: 'User added successfully.',
                type: 'success'
            });
        }, (err) => {
            this.appCommonservice.addToastMessageObservable.next({
                isAutoDispose: true,
                message: 'Unable to fetch users',
                type: 'error'
            });
        });
    }
    selectedUser(userId: string): void {
        if (!userId) {
            this.appCommonservice.seletedUserObservable.next(undefined);
           
            return;
        }
        for (let user of this.users) {
            if (user.userid === userId) {
                this.appCommonservice.seletedUserObservable.next(user);
            }
        }
    }
}
