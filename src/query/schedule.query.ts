import BaseQuery from "@/base/base.query";


class ScheduleQuery extends BaseQuery<any, any, any> {
    protected listFieldFilter: string[];
    protected collectionName: string = `schedule`;
    protected attributeBase: string = 'date';
    protected listAttribute: string[] = [
        "type",
        "date",
        "month",
        "year",
        "inDay",
        "userId",
        "calendarId"
    ];
}

export default ScheduleQuery; 