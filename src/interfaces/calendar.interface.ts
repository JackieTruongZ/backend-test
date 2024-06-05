import { Schedule } from "./schedule.interface";

export interface Calendar {
    _id: string;
    status: string;
    type: string;
    owner: string;
}

export interface CalendarRes {
    _id: string;
    status: string;
    type: string;
    owner: string;
    schedule: Schedule;
}