import BaseQuery from "@/base/base.query";


class TeamQuery extends BaseQuery<any, any, any> {
    protected listFieldFilter: string[];
    protected collectionName: string = 'team';
    protected attributeBase: string = 'teamName';
    protected listAttribute: string[] = [
        "teamName",
    ];
}

export default TeamQuery; 