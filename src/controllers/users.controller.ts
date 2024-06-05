import { CreateUserDto, UpdateUserDto } from '@dtos/users.dto';
import { User, UserInfor } from '@interfaces/users.interface';
import UserService from '@services/users.service';
import baseController from '@/base/base.controller';
import { NextFunction, Request, Response } from 'express';
import { RequestWithUser } from '@/interfaces/auth.interface';
import { transformUserData } from '@/utils/transformUserData';
import { RoleUpdateData } from '@/interfaces/role.interface';

class UsersController extends baseController<UserInfor, CreateUserDto, UpdateUserDto> {
  protected service: UserService;

  constructor() {
    super();
    this.service = new UserService();
  }

  public getInforById = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const Id: string = req.params.id;

      const findOneData = await this.service.findById(Id);

      // const findOneData: any = await this.service.findById(Id);


      if (req.user && req.user._id == Id) {
        return res.status(200).json({ data: findOneData, message: 'findOne' });
      }
      const transformedData = transformUserData(findOneData, findOneData.accessable);

      res.status(200).json({ data: transformedData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  }

  public async updateRoleById(req: Request, res: Response, next: NextFunction) {

    try {
      const Id = req.params.id;
      const roleUpdate: RoleUpdateData = req.body;

      const update = await this.service.updateRoleById(Id, roleUpdate);

    } catch (error) {
      next(error)
    }
  }


}

export default UsersController;
