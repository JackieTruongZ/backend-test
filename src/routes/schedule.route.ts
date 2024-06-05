import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@/middlewares/validation.middleware';
import ScheduleController from '@/controllers/schedule.controller';

class ScheduleRoute implements Routes {
    public path = '/schedule';
    public router = Router();
    public scheduleController = new ScheduleController();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {

        this.router.get(`${this.path}`, this.scheduleController.get);
        this.router.get(`${this.path}/:id`, this.scheduleController.getById);

        this.router.post(`${this.path}`,
            // validationMiddleware(CreateCalendarDto, 'body'),
            this.scheduleController.create);

        this.router.put(`${this.path}/:id`,
            //  validationMiddleware(CreateCalendarDto, 'body', true),
            this.scheduleController.update);

        this.router.delete(`${this.path}/:id`, this.scheduleController.delete);


        this.router.post(`${this.path}/find-filter`, this.scheduleController.findAllByParam);


    }
}

export default ScheduleRoute;
