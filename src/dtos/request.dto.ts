

import { IsArray, IsString } from "class-validator";

export class CreateRequest {
    @IsString()
    userId: string;
    @IsString()
    type: string;
    @IsString()
    title: string;
    @IsString()
    content: string;
    @IsArray()
    receiverId: string[];
}

export class CreateRequestTakeLeave extends CreateRequest {
    @IsArray()
    date: string[];
}