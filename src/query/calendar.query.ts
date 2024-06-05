import BaseQuery from "@/base/base.query";


class CalendarQuery extends BaseQuery<any, any, any> {
    protected listFieldFilter: string[];
    protected collectionName: string = 'calendar';
    protected attributeBase: string = '';
    protected listAttribute: string[] = [
        "status",
        "type",
        "owner"
    ];
}

export default CalendarQuery; 