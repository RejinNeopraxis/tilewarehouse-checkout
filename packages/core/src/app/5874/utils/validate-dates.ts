import { Consignment } from '@bigcommerce/checkout-sdk';
import {
    addDays,
    differenceInBusinessDays,
    eachDayOfInterval,
    isAfter,
    isBefore,
    isMonday,
    isSameDay,
    isSunday,
    isToday,
    isTomorrow,
    isWeekend,
    parse,
    startOfDay
} from 'date-fns/esm';
import { HolidayDay } from '../hooks/use-custom-global-state';

export const CUTOFF_TIME = 12;

const isHolidayDay = (date: Date, holidayDays: HolidayDay[]) => {
    return Boolean(
        holidayDays?.find((day) => isSameDay(parse(day.date, 'yyyy-MM-dd', new Date(date)), date))
    );
};

export const calculateTrueMinimumDate = ({
    minDate,
    holidayDays,
    consignment,
    potentialLeadTime = 0
}: {
    minDate: Date;
    holidayDays: HolidayDay[];
    consignment: Consignment;
    potentialLeadTime?: number;
}) => {
    const shippingMethods = new Map(
        consignment.availableShippingOptions?.map((method) => [method.description, method])
    );

    // If the date is today, it means the product is immediately available, otherwise
    // add one day lead since the availability date is the day that stock arrives and
    // they likely won't ship till the next business day
    const date =
        isToday(minDate) || isBefore(minDate, startOfDay(new Date()))
            ? startOfDay(new Date())
            : addDays(minDate, 1);

    const isDateValid = (d: any | Date) => {
        return date instanceof Date && !isNaN(d);
    }

    const days = eachDayOfInterval({
        start: isDateValid(date) ? date : startOfDay(new Date()),
        end: addDays(startOfDay(new Date()), 365),
    });

    const LEAD_TIME: number = potentialLeadTime;

    // Find the first day that they would be able to ship the product out
    const nextWorkingDay = (isToday(date) && new Date().getHours() < CUTOFF_TIME) ? date : days.find(
        (day) =>
            !isToday(day) &&
            !isHolidayDay(day, holidayDays) &&
            !isWeekend(day)
    )!;

    // Find the day that the product would actually be delivered if it were shipped on the
    // previous date
    const deliveryDay = days.filter((day) => isAfter(day, nextWorkingDay)).find((day) => {
        if (
            isTomorrow(day) &&
            shippingMethods.has('Next Working Day') &&
            new Date().getHours() < CUTOFF_TIME &&
            (isSunday(date) && !isMonday(day)) &&
            !isHolidayDay(day, holidayDays) &&
            !isWeekend(day) &&
            LEAD_TIME === 0
        ) {
            return true;
        }

        return (
            !isHolidayDay(day, holidayDays) &&
            !isWeekend(day) &&
            differenceInBusinessDays(day, nextWorkingDay) > LEAD_TIME
        );
    });

    return deliveryDay;
};

export const isDateAllowed = ({
    date,
    minDate,
    holidayDays,
    consignment,
    allowToday = false,
}: {
    date: Date;
    minDate: Date;
    holidayDays: HolidayDay[];
    consignment: Consignment;
    allowToday?: boolean;
}) => {
    const shippingMethods = new Map(
        consignment.availableShippingOptions?.map((method) => [method.description, method])
    );
    const today = isToday(date);
    const nextDay = isTomorrow(date);
    const weekend = isWeekend(date);
    const holiday = isHolidayDay(date, holidayDays);
    return Boolean(
        minDate &&
            !isBefore(date, minDate) &&
            (allowToday || !today) &&
            !weekend &&
            !holiday &&
            date.getTime() >= minDate.getTime() &&
            ((nextDay &&
                new Date().getHours() < CUTOFF_TIME &&
                shippingMethods.has('Next Working Day')) ||
                !nextDay)
    );
};
