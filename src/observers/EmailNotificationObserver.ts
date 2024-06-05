import NotificationModel from "@/models/notification.model";
import RequestModel from "@/models/request.model";
import { RequestObserver } from "./requestObserver.interface";

class EmailNotificationObserver implements RequestObserver {
    update(request: RequestModel): void {
        const notification = new NotificationModel(
            `${request._id}-email`,
            `Request ${request.status}`,
            `The request "${request.title}" has been ${request.status}.`
        );
        console.log('Sending email notification:', notification);
        // Implement email sending logic
    }
}

export default EmailNotificationObserver;