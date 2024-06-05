import BaseController from "@/base/base.controller";
import { UpdateCalendarDto } from "@/dtos/calendar.dto";
import CalendarService from "@/services/calendar.service";
import UserService from "@/services/users.service";
import { NextFunction, Request, Response } from "express";


class CalendarController extends BaseController<any, any, any>{

    protected service: CalendarService;
    protected userService: UserService;

    constructor() {
        super();
        this.service = new CalendarService();
    }

    public updateCalendar = async (req: Request, res: Response, next: NextFunction) => {
        try {
           
            
            const Data: UpdateCalendarDto = req.body;

            const updateData: any = await this.service.updateCalendar(Data);

            res.status(200).json({ data: updateData, message: 'updated' });
        } catch (error) {
            next(error);
        }
    }

}
export default CalendarController