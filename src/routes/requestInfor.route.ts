import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import ResquestInforController from '@/controllers/requestInfor.controller';
import validationMiddleware from '@/middlewares/validation.middleware';
import { CreateRequestTakeLeave } from '@/dtos/request.dto';

class RequestInforRoute implements Routes {
    public path = '/request';
    public router = Router();
    public requestController = new ResquestInforController();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(`${this.path}`, this.requestController.get);
        this.router.get(`${this.path}/:id`, this.requestController.getById);
        this.router.post(`${this.path}`, this.requestController.create);
        this.router.put(`${this.path}/:id`, this.requestController.update);
        this.router.delete(`${this.path}/:id`, this.requestController.delete);
        this.router.post(`${this.path}/create/take-leave`, validationMiddleware(CreateRequestTakeLeave, 'body'), this.requestController.createTakeLeave)
    }
}

export default RequestInforRoute;
