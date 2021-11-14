export interface IDateProvider {
    compareInHours(date1: Date, date2: Date): number;

    compareInDays(date1: Date, date2: Date): number;

    convertToUTC(date: Date): string;

    now(): Date
}
