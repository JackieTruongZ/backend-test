import BaseQuery from "@/base/base.query";
import { db } from "@/databases/db";
import { CreateUserDto, UpdateUserDto } from "@/dtos/users.dto";
import { RoleUpdateData } from "@/interfaces/role.interface";
import { User } from "@/interfaces/users.interface";
import { hash } from "bcrypt";
import { Filter } from "mongodb";

class UserQuery extends BaseQuery<User, CreateUserDto, any> {

    protected collectionName: string = 'users';
    protected attributeBase: string = 'email';
    protected listAttribute: string[] = ['email', 'password'];
    protected listFieldFilter: string[] = ['name', 'email'];


    public findByGoogleId = async (googleId: string) => {

        const query: Filter<User> = { googleId: googleId } as Filter<User>;
        const findData: User = await db.collection<User>(this.collectionName).findOne(query);

        return findData;
    }

}


export default UserQuery; 