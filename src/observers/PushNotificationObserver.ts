import RequestModel from "@/models/request.model";
import { RequestObserver } from "./requestObserver.interface";
import NotificationModel from "@/models/notification.model";
import { NotificationInforSystemWithoutId, NotificationInforUserWithoutId } from "@/interfaces/notification.interface";
import NotificationService from "@/services/notification.service";
import { RequestInfor } from "@/interfaces/request.interface";

class PushNotificationObserver implements RequestObserver {

    protected notificationService: NotificationService;
    constructor() {
        this.notificationService = new NotificationService();
    }

    async update(req: RequestInfor) {
        
        try {
            if (req.source) {
                console.log("req: ", req);

                req.receiverId.forEach(async (receiverId) => {
                    const notidata: NotificationInforSystemWithoutId = {
                        source: req.source,
                        requestId: req._id,
                        type: req.type,
                        status: false,
                        title: req.title,
                        content: req.content,
                        receiveId: receiverId
                    }
                    const notiData = await this.notificationService.create(notidata);
                    req.success();
            
                });
            }
            if (req.userId) {
                req.receiverId.forEach(async (receiverId) => {
                    const notidata: NotificationInforUserWithoutId = {
                        senderId: req.userId,
                        requestId: req._id,
                        type: req.type,
                        status: false,
                        title: req.title,
                        content: req.content,
                        receiveId: receiverId
                    }
                    const notiData = await this.notificationService.create(notidata);

                    req.success();
                   
                });
            }

        } catch (error) {
            console.log("error : ", error);
            req.fail();
        }

    }
}

export default PushNotificationObserver;