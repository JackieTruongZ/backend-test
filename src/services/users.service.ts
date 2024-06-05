import { CreateUserDto, UpdateUserDto } from '@dtos/users.dto';
import { UserInfor } from '@interfaces/users.interface';
import BaseService from '@/base/base.service';
import UserQuery from '@/query/users.query';
import RequestInforService from './requestInfor.service';
import { RequestInforSystemWithoutId } from '@/interfaces/request.interface';
import { RoleUpdateData } from '@/interfaces/role.interface';
import { isEmpty } from 'class-validator';
import { HttpException } from '@/exceptions/HttpException';
import TeamService from './team.service';
import { Team } from '@/interfaces/team.interface';
import RequestSystemModel from '@/models/requestSystem.model';

class UserService extends BaseService<UserInfor, CreateUserDto, any> {

  protected collectionName: string = 'users';
  protected nameBase: string = 'User';
  protected nameInfor: string = 'userInfor';
  protected attributeBase: string = 'email';
  protected listAttribute: string[] = ['email', 'password'];

  protected teamService: TeamService;

  protected query: UserQuery;
  private requestInfoService: RequestInforService;

  constructor() {
    super();
    this.query = new UserQuery();
    this.requestInfoService = new RequestInforService();
    this.teamService = new TeamService();
  }

  public findAndUpdateUser = async (profile: any) => {
    const findUser = await this.query.findByGoogleId(profile.id);
    if (findUser) {
      return findUser;
    }
    else {
      const createUser: CreateUserDto = {
        teamId: '',
        googleId: profile.id || ' ',
        email: profile.email || ' ',
        name: profile.name || ' ',
        givenName: profile.given_name || ' ',
        familyName: profile.family_name || ' ',
        verified_email: profile.verified_email || ' ',
        avatar: profile.picture || ' ',
        locale: profile.locale || ' ',
        role: [],
        gender: '',
        date: undefined,
        numberPhone: '',
        address: '',
        citizenIdentityCard: '',
        bankInfor: {
          name: '',
          bankName: '',
          bankId: '',
          bankNumber: ''
        },
        accessable: {
          _id: true,
          teamId: true,
          name: true,
          email: true,
          givenName: true,
          familyName: true,
          verified_email: false,
          avatar: true,
          locale: true,
          role: true,
          gender: true,
          date: true,
          numberPhone: true,
          address: true,
          googleId: false,
          citizenIdentityCard: false,
          bankInfor: false,
        }
      }

      const saveUser = await this.query.saveData(createUser);

      const findUser = await this.query.findByGoogleId(profile.id);

      return findUser;
    }
  }

  public update = async (dataId: string, updateData: UpdateUserDto): Promise<any> => {


    const updatedData = await super.update(dataId, updateData);

    const requestData: any = {
      type: 'update-info',
      title: 'update-info',
      content: 'update-info',
      receiverId: [dataId],
    }

    await this.requestInfoService.createRequest('system', 'update-info', requestData);

    return updatedData;

  };

  public async updateTeamId(dataId: string, updateData: { teamId: string }) {

    const updatedData = await this.query.updateAddAttribute(dataId, updateData);

    const data = await this.query.findById(dataId);


    const requestData: any = {
      type: 'update-info',
      title: 'update-teamId',
      content: 'update-teamId',
      receiverId: [dataId],
    }

    await this.requestInfoService.createRequest('system', 'update-info', requestData);

    return data;
  }

  public async updateRoleById(Id: string, roleUpdate: RoleUpdateData) {

    // Check data empty
    if (isEmpty(roleUpdate)) throw new HttpException(400, `${this.nameBase} Data is empty`);


    // query
    const findData: any = await this.query.findById(Id);

    let updatedData: any;

    if (findData) {

      const updatedUser = { ...findData };

      // create Updated data
      updatedData = { ...updatedUser, ...roleUpdate.role };

      // Update handle  ==================== 

      await this.query.updateData(Id, updatedData);
      //====================

    } else {

      // Exception handle
      throw new HttpException(409, `${this.nameBase} doesn't exist`);

    }
    //======================

    return updatedData;
  }

  public async getManagerInfor(userId: string) {

    const findUser: UserInfor = await this.query.findById(userId);
    if (findUser) {

      if (findUser.teamId) {
        const teamInfor: Team = await this.teamService.findById(findUser.teamId);
        if (teamInfor) {
          const findUser: UserInfor = await this.query.findById(teamInfor.managerId);
          return findUser;
        }
      }
      else {
        return null;
      }
    } else {

      // Exception handle
      throw new HttpException(409, `${this.nameBase} doesn't exist`);

    }
  }

}

export default UserService;
