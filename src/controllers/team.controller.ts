import BaseController from "@/base/base.controller";
import { CreateTeamDto, UpdateTeamDto } from "@/dtos/team.dto";
import { Team } from "@/interfaces/team.interface";
import TeamService from "@/services/team.service";
import UserService from "@/services/users.service";
import { NextFunction, Request, Response } from "express";

class TeamController extends BaseController<Team, CreateTeamDto, UpdateTeamDto>{

    protected service: TeamService;


    constructor() {
        super();
        this.service = new TeamService();

    }

    public async updateTeamate(req: Request, res: Response, next: NextFunction) {
        try {
            const teamId = req.params.id;
            const dataUpdate = { teamId: teamId }
            const userIds: string[] = req.body;
            const userService = new UserService();


            userIds.forEach(async (userId: string) => {
                try {
                    const updateUser = await userService.updateTeamId(userId, dataUpdate)
                    return updateUser;
                } catch (error) {
                    console.log("error : ", error);

                }
            })

            res.status(200).json({ data: null, message: 'update Team Id' });
        } catch (error) {
            next(error)
        }

    }
}
export default TeamController