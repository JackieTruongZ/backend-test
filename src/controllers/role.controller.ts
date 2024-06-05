import BaseController from "@/base/base.controller";
import { CreateRoleDto } from "@/dtos/role.dto";
import { Role } from "@/interfaces/role.interface";
import RoleService from "@/services/role.service";
import UserService from "@/services/users.service";


class RoleController extends BaseController<Role, CreateRoleDto, CreateRoleDto>{

    protected service: RoleService;
    protected userService: UserService;

    constructor() {
        super();
        this.service = new RoleService();
    }

}
export default RoleController