import BaseService from "@/base/base.service";
import { UpdateCalendarDto } from "@/dtos/calendar.dto";
import CalendarQuery from "@/query/calendar.query";
import ScheduleService from "./schedule.service";
import { ScheduleWithoutId } from "@/interfaces/schedule.interface";
import { ItemCreateSchedule } from "@/dtos/schedule.dto";
import UserService from "./users.service";
import RequestInforService from "./requestInfor.service";

class CalendarService extends BaseService<any, any, any> {

    protected query: CalendarQuery;
    protected nameBase: string = 'Calendar';
    protected attributeBase: string;

    protected scheduleService: ScheduleService;
    protected userService: UserService;
    protected requestInfoService: RequestInforService;

    constructor() {
        super();
        this.query = new CalendarQuery();
        this.scheduleService = new ScheduleService();
        this.userService = new UserService();
        this.requestInfoService = new RequestInforService();
    }


    public async updateCalendar(data: UpdateCalendarDto) {

        const { userId, calendarId, schedule } = data;

        // Sử dụng Promise.all() để lưu các schedule
        schedule.forEach(async (item: ItemCreateSchedule) => {

            const dateItem = new Date(item.date);

            const createData: ScheduleWithoutId = {
                type: item.type,
                userId: userId,
                calendarId: calendarId,
                description: item.description,
                inDay: item.inDay,
                date: dateItem,
                startTime: dateItem,
                endTime: dateItem,
                month: dateItem.getMonth(),
                year: dateItem.getFullYear()
            }


            const saveData = await this.scheduleService.create(createData);
            return saveData;

            // const saveData = await this.scheduleService.create(createData);
            // return saveData;
        });

        try {
            const managerInfor = await this.userService.getManagerInfor(userId);

            const requestData: any = {
                userId: userId,
                type: 'update-calendar',
                title: 'update-calendar',
                content: 'update-calendar',
                receiverId: [managerInfor ? managerInfor._id.toString() : ""],
            }
            console.log("requestData : ", requestData);


            await this.requestInfoService.createRequest('system', 'update-calendar', requestData);
            await this.requestInfoService.createRequest('user', 'update-calendar', requestData);

        } catch (error) {
            console.log("errror :: ", error);

        }

    }


}

export default CalendarService