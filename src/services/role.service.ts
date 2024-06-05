import BaseService from "@/base/base.service";
import RoleQuery from "@/query/role.query";

class RoleService extends BaseService<any, any, any> {

    protected query: RoleQuery;
    protected nameBase: string = 'Role';
    protected attributeBase: string = '';

    constructor() {
        super();
        this.query = new RoleQuery();
    }


}

export default RoleService