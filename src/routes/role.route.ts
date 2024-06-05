import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import RoleController from '@/controllers/role.controller';
import validationMiddleware from '@/middlewares/validation.middleware';
import { CreateRoleDto } from '@/dtos/role.dto';

class RoleRoute implements Routes {
    public path = '/role';
    public router = Router();
    public roleController = new RoleController();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {

        this.router.get(`${this.path}`, this.roleController.get);
        this.router.get(`${this.path}/:id`, this.roleController.getById);
        this.router.post(`${this.path}`, validationMiddleware(CreateRoleDto, 'body'), this.roleController.create);
        this.router.put(`${this.path}/:id`, validationMiddleware(CreateRoleDto, 'body', true), this.roleController.update);
        this.router.delete(`${this.path}/:id`, this.roleController.delete);
    }
}

export default RoleRoute;
