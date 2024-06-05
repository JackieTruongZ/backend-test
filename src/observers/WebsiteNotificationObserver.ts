import RequestModel from "@/models/request.model";
import { RequestObserver } from "./requestObserver.interface";
import NotificationModel from "@/models/notification.model";

class WebsiteNotificationObserver implements RequestObserver {
    update(request: RequestModel): void {
        const notification = new NotificationModel(
            `${request._id}-website`,
            `Request ${request.status}`,
            `The request "${request.title}" has been ${request.status}.`
        );
        console.log('Displaying notification on website:', notification);
        // Implement website display logic
    }
}

export default WebsiteNotificationObserver;