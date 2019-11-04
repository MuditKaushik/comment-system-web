import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { IToastMessage } from '../../model';
import { delay } from 'rxjs/operators';
import { AppCommonService } from '../../services/common-service';

@Component({
    selector: 'app-toast-message',
    templateUrl: 'app/core/common/message/app-toast-message-template.html'
})
export class AppToastMessageComponent implements OnInit {
    toastMessages: Array<IToastMessage> = new Array<IToastMessage>();
    private disposableToastMessages: Subject<IToastMessage> = new Subject<IToastMessage>();
    private readonly defaultDisposeTime: number = 5000; // in milliseconds.
    constructor(private appCommonService: AppCommonService) { }
    ngOnInit(): void {
        this.appCommonService.addToastMessageObservable.subscribe((toastMessage) => {
            if (Object.keys(toastMessage).length > 0) {
                let createdToastMessage = this.createToastMessageWithId(toastMessage);
                if (toastMessage.isAutoDispose) {
                    this.disposableToastMessages.next(createdToastMessage);
                }
                this.toastMessages.push(createdToastMessage);
            }
        });
        this.disposableToastMessages.pipe(delay(this.defaultDisposeTime)).subscribe((disposableMessage) => {
            if (disposableMessage.id) {
                this.removeToastMessage(disposableMessage.id);
            }
        });
    }
    removeToastMessage(messageId: string): void {
        for (let index in this.toastMessages) {
            if (this.toastMessages[index].id === messageId) {
                this.removeToastMessageByIndex(index);
            }
        }
    }
    private removeToastMessageByIndex(index: string): void {
        let numberIndex: number = parseInt(index);
        if (!isNaN(numberIndex)) {
            this.toastMessages.splice(numberIndex, 1);
        }
    }
    private createToastMessageWithId(toastMessage: IToastMessage): IToastMessage {
        return {
            id: new Date().getMilliseconds().toString(5),
            isAutoDispose: toastMessage.isAutoDispose,
            message: toastMessage.message,
            type: toastMessage.type,
            time: toastMessage.time
        };
    }
}
