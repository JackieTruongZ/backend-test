
export interface Schedule {
    _id: string;
    type: string;
    userId: string;
    calendarId: string;
    description: string;
    inDay: string;
    date: Date;
    startTime: Date;
    endTime: Date;
    month: number;
    year: number;
}

export interface ScheduleWithoutId {
    type: string;
    userId: string;
    calendarId: string;
    description: string;
    inDay: string;
    date: Date;
    startTime: Date;
    endTime: Date;
    month: number;
    year: number;
}