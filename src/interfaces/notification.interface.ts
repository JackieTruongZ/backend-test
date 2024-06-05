

export interface NotificationInforBase {
    _id: string;
    requestId: string;
    type: string;
    status: boolean;
    title: string;
    content: string;
    receiveId: string;
}

export interface NotificationInforSystem extends NotificationInforBase {
    source: string;
}

export interface NotificationInforUser extends NotificationInforBase {
    senderId: string;
}


export interface NotificationInforBaseWithoutId {
    requestId: string;
    type: string;
    status: boolean;
    title: string;
    content: string;
    receiveId: string;
}

export interface NotificationInforSystemWithoutId extends NotificationInforBaseWithoutId {
    source: string;
}

export interface NotificationInforUserWithoutId extends NotificationInforBaseWithoutId {
    senderId: string;
}