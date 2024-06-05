import BaseController from "@/base/base.controller";
import ScheduleService from "@/services/schedule.service";
import UserService from "@/services/users.service";


class ScheduleController extends BaseController<any, any, any>{

    protected service: ScheduleService;
    protected userService: UserService;

    constructor() {
        super();
        this.service = new ScheduleService();
    }

}
export default ScheduleController