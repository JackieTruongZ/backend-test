import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import NotificationController from '@/controllers/notification.controller';

class NotificationRoute implements Routes {
    public path = '/request';
    public router = Router();
    public notificationController = new NotificationController();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(`${this.path}`, this.notificationController.get);
        this.router.get(`${this.path}/:id`, this.notificationController.getById);
        this.router.post(`${this.path}`, this.notificationController.create);
        this.router.put(`${this.path}/:id`, this.notificationController.update);
        this.router.delete(`${this.path}/:id`, this.notificationController.delete);
        this.router.get(`${this.path}/seen/:id`, this.notificationController.seen)
    }
}

export default NotificationRoute;
