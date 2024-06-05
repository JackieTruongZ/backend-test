import BaseService from "@/base/base.service";
import RequestInforQuery from "@/query/requestInfor.query";
import NotificationService from "./notification.service";
import EmailNotificationObserver from "@/observers/EmailNotificationObserver";
import PushNotificationObserver from "@/observers/PushNotificationObserver";
import { RequestObserver } from "@/observers/requestObserver.interface";
import RequestSystemModel from "@/models/requestSystem.model";
import RequestUserModel from "@/models/requestUser.model";

class RequestInforService extends BaseService<any, any, any> {
    protected nameBase: string = 'Request';
    protected attributeBase: string = '';

    protected query: RequestInforQuery;

    protected notificationService: NotificationService;

    constructor() {
        super();
        this.query = new RequestInforQuery();
        this.notificationService = new NotificationService();
    }

    private observers: RequestObserver[] = [];

    attach(observer: RequestObserver): void {
        this.observers.push(observer);
    }

    notifyObservers(request: any): void {
        for (const observer of this.observers) {
            observer.update(request);
        }
    }

    submitRequest(request: any): void {
        console.log('New request submitted:', request);
        this.notifyObservers(request);
        this.observers = [];
    }

    public async createRequest(create: string, type: string, request: any) {

        if (create == 'system') {

            await this.sytemBase(create, type, request);

        }

        if (create == 'user') {
            if (type == 'update-calendar') {
                await this.userBase(create, type, request);
            }
            if (type == 'take-leave') {
                await this.userBase(create, type, request);
            }
        }
    };


    public async sytemBase(create: string, type: string, data: any) {

        const pushObserver = new PushNotificationObserver();

        this.attach(pushObserver);
    
        const request: RequestSystemModel = new RequestSystemModel();

        request.createSys(
            create,
            type,
            data.title,
            data.content,
            [data.userId]);


        await request.saveRequest();

        await this.submitRequest(request);


        return request;
    }


    public async userBase(create: string, type: string, data: any) {

        const pushObserver = new PushNotificationObserver();
        const emailObserver = new EmailNotificationObserver();

        this.attach(pushObserver);
        this.attach(emailObserver)
        const request: RequestUserModel = new RequestUserModel();

        request.createUs(
            data.userId,
            type,
            data.title,
            data.content,
            data.receiverId);

        await request.saveRequest();

        await this.submitRequest(request);


        return request;
    }

}

export default RequestInforService;

