import dayjs from "dayjs";
import utc from 'dayjs/plugin/utc';

import {IDateProvider} from "@shared/container/providers/date/IDateProvider";

dayjs.extend(utc);

export class DayjsDateProvider implements IDateProvider {
    compareInHours(startDate: Date, endDate: Date): number {
        return dayjs(this.convertToUTC(endDate))
            .diff(
                this.convertToUTC(startDate),
                'hours'
            );
    }

    compareInDays(startDate: Date, endDate: Date): number {
        return dayjs(this.convertToUTC(endDate))
            .diff(
                this.convertToUTC(startDate),
                'days'
            );
    }

    convertToUTC(date: Date): string {
        return dayjs(date).utc().local().format();
    }

    now(): Date {
        return dayjs().toDate();
    }

    addDays(days: number): Date {
        return dayjs().add(days, "days").toDate();
    }

    addHours(hours: number): Date {
        return dayjs().add(hours, "hours").toDate();
    }
}
