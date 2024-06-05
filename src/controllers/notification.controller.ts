import BaseController from "@/base/base.controller";
import NotificationService from "@/services/notification.service";
import { Request, Response } from "express";


class NotificationController extends BaseController<any, any, any> {

    protected service: NotificationService;

    constructor() {
        super();
        this.service = new NotificationService();
    }

    public async seen(req: Request, res: Response) {
        throw new Error('Method not implemented.');
    }


}

export default NotificationController;