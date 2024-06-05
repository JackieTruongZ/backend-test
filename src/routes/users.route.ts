import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';
import UsersController from '@controllers/users.controller';
import { CreateUserDto, UpdatePositionUserDto, UpdateUserbaseDto } from '@dtos/users.dto';


class UsersRoute implements Routes {
  public path = '/users';
  public router = Router();
  public usersController = new UsersController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.usersController.get);
    this.router.get(`${this.path}/:id`, this.usersController.getById);
    this.router.post(`${this.path}`, validationMiddleware(CreateUserDto, 'body'), this.usersController.create);
    this.router.put(`${this.path}/:id`, validationMiddleware(UpdateUserbaseDto, 'body', true), this.usersController.update);
    this.router.delete(`${this.path}/:id`, this.usersController.delete);
    this.router.get(`${this.path}/infor/:id`, this.usersController.getInforById);
    this.router.put(`${this.path}/position/:id`, validationMiddleware(UpdatePositionUserDto, 'body', true), this.usersController.update);
    this.router.get(`${this.path}/find-filter`, this.usersController.findAllByParam);
  }
}

export default UsersRoute;
