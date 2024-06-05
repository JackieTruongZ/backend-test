import { IsDate, IsString } from "class-validator";

export class ItemCreateSchedule {
    @IsString()
    type: string;
    @IsString()
    description: string;
    @IsString()
    date: string;
    @IsString()
    inDay: string;
}

