import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@/middlewares/validation.middleware';
import { CreateCalendarDto, UpdateCalendarDto } from '@/dtos/calendar.dto';
import CalendarController from '@/controllers/calendar.controller';

class CalendarRoute implements Routes {
    public path = '/calendar';
    public router = Router();
    public calendarController = new CalendarController();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {

        this.router.get(`${this.path}`, this.calendarController.get);
        this.router.get(`${this.path}/:id`, this.calendarController.getById);
        this.router.post(`${this.path}`, validationMiddleware(CreateCalendarDto, 'body'), this.calendarController.create);
        this.router.put(`${this.path}/:id`, validationMiddleware(CreateCalendarDto, 'body', true), this.calendarController.update);
        this.router.delete(`${this.path}/:id`, this.calendarController.delete);


        this.router.get(`${this.path}/find-filter`, this.calendarController.findAllByParam);
        this.router.post(`${this.path}/update`, validationMiddleware(UpdateCalendarDto, 'body'), this.calendarController.updateCalendar);


    }
}

export default CalendarRoute;
