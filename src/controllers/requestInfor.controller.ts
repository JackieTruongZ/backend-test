import BaseController from "@/base/base.controller";
import { CreateRequestTakeLeave } from "@/dtos/request.dto";
import RequestInforService from "@/services/requestInfor.service";
import ScheduleService from "@/services/schedule.service";
import { NextFunction, Request, Response } from "express";


class ResquestInforController extends BaseController<any, any, any>{

    protected service: RequestInforService;

    constructor() {
        super();
        this.service = new RequestInforService();
    }


    public async createTakeLeave(req: Request, res: Response, next: NextFunction) {


        try {
            const requestData: CreateRequestTakeLeave = req.body;

            const scheduleService = new ScheduleService();

            try {
                await scheduleService.takeLeave(requestData.userId, requestData.date);
            } catch (error) {
                console.log("error : ", error);
            }

            try {
                const service: RequestInforService = new RequestInforService();
                await service.createRequest('system', 'take-leave', requestData);
                await service.createRequest('user', 'take-leave', requestData);


            } catch (error) {
                console.log("error : ", error);

            }


            res.status(200).json({ data: null, message: 'take-leave' });

        } catch (error) {
            next(error)
        }

    }

}
export default ResquestInforController