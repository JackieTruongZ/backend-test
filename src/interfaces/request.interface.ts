

export interface RequestInforBase {
    _id: string;
    type: string;
    title: string;
    content: string;
    receiverId: string[];
}

export interface RequestInforSystem extends RequestInforBase {
    source: string;
}

export interface RequestInforUser extends RequestInforBase {
    userId: string;
}

export interface RequestInforBaseWithoutId {
    type: string;
    title: string;
    content: string;
    receiverId: string[];
}

export interface RequestInforSystemWithoutId extends RequestInforBaseWithoutId {
    source: string;
}

export interface RequestInforUserWithoutId extends RequestInforBaseWithoutId {
    userId: string;
}

export interface RequestInfor {
    _id: string;
    userId: string;
    source: string;
    type: string;
    title: string;
    content: string;
    status: string;
    receiverId: string[];

    success();
    fail();
}

