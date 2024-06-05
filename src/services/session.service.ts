import BaseService from "@/base/base.service"
import { Session, SessionWithId } from "@/interfaces/session.interface";
import SessionQuery from "@/query/session.query";



class SessionService extends BaseService<Session, Session, Session> {
    protected nameInfor: string;
    protected collectionName: string = 'session';
    protected nameBase: string = 'Session';
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

    protected query: SessionQuery;

    constructor() {
        super();
        this.query = new SessionQuery();
    }


    public createSession = async (sessionData: Session): Promise<any> => {
        const findData: SessionWithId = await this.query.findByAttributeBase(sessionData.userId);
        if (findData) {

            const saveData = await this.query.updateData(findData._id, sessionData);
            const result = await this.query.findById(findData._id);

            return result;

        } else {

            const saveData = await this.query.saveData(sessionData);
            const result = await this.query.findById(saveData.insertedId);

            return result;

        }
    }

}

export default SessionService;

