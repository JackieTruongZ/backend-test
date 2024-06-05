import { RequestInforSystemWithoutId } from "@/interfaces/request.interface";
import RequestModel from "./request.model";
import RequestInforQuery from "@/query/requestInfor.query";

class RequestSystemModel extends RequestModel {

    source: string;

    constructor() {
        super();
    }

    createSys(source: string, type: string, title: string, content: string, receiverId: string[]) {
        super.create(type, title, content, receiverId);
        this.source = source;

    }

    async saveRequest() {
        const query: RequestInforQuery = new RequestInforQuery();

        const req: any = await query.saveData(this);

        this._id = req._id;
    }

}

export default RequestSystemModel;