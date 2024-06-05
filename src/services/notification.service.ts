import BaseService from "@/base/base.service";
import NotificationQuery from "@/query/notification.query";

class NotificationService extends BaseService<any, any, any> {
    protected query: NotificationQuery;
    protected nameBase: string = 'Notification';
    protected attributeBase: string = '';

    constructor() {
        super();
        this.query = new NotificationQuery();
    }

}

export default NotificationService