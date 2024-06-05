import { RequestInforUserWithoutId } from "@/interfaces/request.interface";
import RequestModel from "./request.model";
import RequestInforQuery from "@/query/requestInfor.query";

class RequestUserModel extends RequestModel {

    userId: string;

    constructor() {
        super();
    }

    createUs(userId: string, type: string, title: string, content: string, receiverId: string[]) {
        super.create(type, title, content, receiverId);
        this.userId = userId;
    }

    async saveRequest() {
        const query: RequestInforQuery = new RequestInforQuery();

        const req: any = await query.saveData(this);

        this._id = req._id;
    }
}

export default RequestUserModel;