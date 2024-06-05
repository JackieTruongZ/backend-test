import BaseQuery from "@/base/base.query";

class NotificationQuery extends BaseQuery<any, any, any> {
    protected collectionName: string = 'notification';
    protected attributeBase: string = '';
    protected listFieldFilter: string[] = [];

}

export default NotificationQuery