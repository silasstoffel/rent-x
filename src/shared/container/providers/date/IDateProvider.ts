export interface IDateProvider {
    compareInHours(date1: Date, date2: Date): number;

    compareInDays(date1: Date, date2: Date): number;

    convertToUTC(date: Date): string;

    now(): Date;

    addDays(days: number): Date;

    addHours(hours: number): Date;

    compareIfBefore(startDate, endDate): boolean;
}
