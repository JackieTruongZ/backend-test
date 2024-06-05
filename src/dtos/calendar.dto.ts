import { IsArray, IsString } from "class-validator";
import { ItemCreateSchedule } from "./schedule.dto";

export class CreateCalendarDto {
    @IsString()
    type: string;
    @IsString()
    owner: string;
}

export class UpdateCalendarDto {
    @IsString()
    userId: string; 
    @IsString()
    calendarId: string;
    @IsArray()
    schedule: ItemCreateSchedule[];
}