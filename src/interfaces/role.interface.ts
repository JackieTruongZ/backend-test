
export interface Role {
    _id: string;
    name: string;
    description: string;
}

export interface RoleWithOutid {
    name: string;
    description: string;
}

export interface RoleUpdateData {
    role: string[];
}