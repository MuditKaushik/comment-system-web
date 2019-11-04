import { Injectable } from '@angular/core';
import { IToastMessage } from '../model';
import { BehaviorSubject } from 'rxjs';
import { IUser } from '../model/user';

@Injectable()
export class AppCommonService {
    private readonly defaultToastMessage: IToastMessage = {} as IToastMessage;
    private defaultUser: IUser = {} as IUser;
    addToastMessageObservable: BehaviorSubject<IToastMessage> = new BehaviorSubject<IToastMessage>(this.defaultToastMessage);
    showLoaderObservable: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    seletedUserObservable: BehaviorSubject<IUser | undefined> = new BehaviorSubject<IUser | undefined>(undefined);
    refreshComments: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
    constructor() { }

    get getSelectedUser(): IUser {
        return this.defaultUser;
    }

    set setSelectedUser(user: IUser) {
        this.defaultUser = user;
    }
}
