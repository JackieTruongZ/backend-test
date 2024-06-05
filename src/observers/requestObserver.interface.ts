import RequestModel from "@/models/request.model";

export interface RequestObserver {
    update(request: any);
}