import { UserInfor, UserInforAccess } from "@/interfaces/users.interface";

export const transformUserData = (userData: UserInfor, accessable: UserInforAccess): any => {
    const transformedData: any = {};

    Object.keys(accessable).forEach((key) => {
        if (accessable[key]) {
            transformedData[key] = userData[key];
        }
    });

    return transformedData;
};