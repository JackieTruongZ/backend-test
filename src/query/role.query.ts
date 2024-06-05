import BaseQuery from "@/base/base.query";


class RoleQuery extends BaseQuery<any, any, any> {
    protected listFieldFilter: string[];
    protected collectionName: string = 'role';
    protected attributeBase: string = 'name';
    protected listAttribute: string[] = [
        "name",
        "description"
    ];

}

export default RoleQuery; 