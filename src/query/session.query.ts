import BaseQuery from "@/base/base.query";
import { UpdateUserDto } from "@/dtos/users.dto";
import { Session } from "@/interfaces/session.interface";


class SessionQuery extends BaseQuery<Session, Session, Session> {
    protected listFieldFilter: string[];
    protected collectionName: string = 'session';
    protected attributeBase: string = 'userId';
    protected listAttribute: string[] = [
        "sessionId",
        "userId",
        "startTime",
        "expirationTime",
        "ipAddress",
        "userAgent",
        "deviceInfo",
    ];

}

export default SessionQuery; 