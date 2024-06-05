import BaseQuery from "@/base/base.query";

class RequestInforQuery extends BaseQuery<any, any, any> {
    protected collectionName: string = 'request';
    protected attributeBase: string = '';
    protected listFieldFilter: string[] = [];

}

export default RequestInforQuery