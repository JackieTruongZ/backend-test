import BaseService from "@/base/base.service";
import { IParamSearch } from "@/interfaces/base.interface";
import { Schedule, ScheduleWithoutId } from "@/interfaces/schedule.interface";
import ScheduleQuery from "@/query/schedule.query";
import CalendarService from "./calendar.service";

class ScheduleService extends BaseService<any, any, any> {

    protected query: ScheduleQuery;
    protected nameBase: string = 'Schedule';
    protected attributeBase: string = 'date';

    constructor() {
        super();
        this.query = new ScheduleQuery();
    }

    public async takeLeave(userId: string, dateData: string[]) {
        try {

            const dateArray: Date[] = dateData.map(dateString => new Date(dateString));
            const updateType: any = {
                type: 'take-leave'
            };
            const param: IParamSearch = {
                skip: 0,
                limit: 5,
                sort: "name, 1",
                keyword: "",
                tags: [
                    {
                        name: 'date',
                        field: dateArray
                    },
                    {
                        name: 'userId',
                        field: [userId]
                    }
                ]
            }

            const schedule = await this.query.findAllByParam(param);

            console.log("schedule : ", schedule);
          
            let createDate;

            if (schedule.totalItems > 0) {

                const dateUpdate: Schedule[] = schedule.results;

                createDate = dateArray.filter(dateA => !dateUpdate.some(scheduleB => dateA.toDateString() === scheduleB.date.toDateString()));


                dateUpdate.forEach(async (date) => {

                    const updateTakeLeaveSchedule = await this.query.updateData(date._id, updateType);

                })

            }

            const calendarService = new CalendarService();

            createDate.forEach(async (date) => {

                const calendarInforId = await calendarService.findByAttribute('owner', userId);

                const createData: ScheduleWithoutId = {
                    type: "take-leave",
                    userId: userId,
                    calendarId: calendarInforId,
                    description: "",
                    inDay: "",
                    date: date,
                    startTime: date,
                    endTime: date,
                    month: date.getMonth(),
                    year: date.getFullYear()
                }
                const createTakeLeaveSchedule = await this.create(createData);

                return createData;
            })


        } catch (error) {
            console.log("error : ", error);

        }


    }


}

export default ScheduleService