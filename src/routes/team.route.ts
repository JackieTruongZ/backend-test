import TeamController from '@/controllers/team.controller';
import { CreateTeamDto, UpdateTeamDto } from '@/dtos/team.dto';
import { Routes } from '@/interfaces/routes.interface';
import validationMiddleware from '@/middlewares/validation.middleware';
import { Router } from 'express';

class TeamRoute implements Routes {
    public path = '/team';
    public router = Router();
    public teamController = new TeamController();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {

        this.router.get(`${this.path}`, this.teamController.get);
        this.router.get(`${this.path}/:id`, this.teamController.getById);
        this.router.post(`${this.path}`, validationMiddleware(CreateTeamDto, 'body'), this.teamController.create);
        this.router.put(`${this.path}/:id`, validationMiddleware(UpdateTeamDto, 'body', true), this.teamController.update);
        this.router.delete(`${this.path}/:id`, this.teamController.delete);

        this.router.put(`${this.path}/update-teamate/:id`, this.teamController.updateTeamate)
    }
}

export default TeamRoute;
