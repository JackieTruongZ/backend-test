
import BaseService from "@/base/base.service";
import TeamQuery from "@/query/team.query";

class TeamService extends BaseService<any, any, any> {

    protected query: TeamQuery;
    protected nameBase: string = 'Team';
    protected attributeBase: string = '';

    constructor() {
        super();
        this.query = new TeamQuery();
    }


}

export default TeamService