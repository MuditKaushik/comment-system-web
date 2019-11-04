export type IMessageType = 'success' | 'error' | 'info' | 'warning';

export interface IBaseMessage {
    type: IMessageType;
    message: string;
    isAutoDispose: boolean;
}

export interface IToastMessage extends IBaseMessage {
    id?: string;
    time?: Date;
}

export interface IBannerMessage extends IBaseMessage {
    icon: string;
}
