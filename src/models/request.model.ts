import RequestInforQuery from "@/query/requestInfor.query";


class RequestModel {
    _id: string;
    type: string;
    title: string;
    content: string;
    status: 'pending' | 'success' | 'fail';
    receiverId: string[];

    constructor() {

    }

    create(type: string, title: string, content: string, receiverId: string[]) {
        this.type = type;
        this.title = title;
        this.content = content;
        this.status = 'pending';
        this.receiverId = receiverId;
    }

    async success() {
        this.status = 'success';
        const requestInforQuery: RequestInforQuery = new RequestInforQuery();

        const updateStatus = await requestInforQuery.updateData(this._id, this)
    }

    async fail() {
        this.status = 'fail';
        const requestInforQuery: RequestInforQuery = new RequestInforQuery();

        const updateStatus = await requestInforQuery.updateData(this._id, this)
    }

}

export default RequestModel;