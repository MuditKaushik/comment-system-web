import { PipeTransform, Pipe } from '@angular/core';
import { IUser } from '../core/model/user';
import { isNullOrUndefined } from 'util';

@Pipe({
    name: 'name',
    pure: true
})
export class NamePipe implements PipeTransform {
    transform(user: IUser, showFull: boolean = true): string {
        let username: string = '';
        if (!isNullOrUndefined(user)) {
            switch (showFull) {
                case true:
                    username = `${user.firstName} ${user.middleName || ''} ${user.lastName} (${user.username})`;
                    break;
                case false:
                    username = user.username;
                    break;
            }
        }
        return username;
    }
}
