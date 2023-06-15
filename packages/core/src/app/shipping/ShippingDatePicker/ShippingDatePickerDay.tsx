import { ShippingOption } from '@bigcommerce/checkout-sdk';
import React, { memo } from 'react';
import { format, isToday, isSameDay } from 'date-fns';
import { CUTOFF_TIME } from '../../5874/utils/validate-dates';

interface ShippingDatePickerDayProps {
    day: number;
    date: Date;
    minDate: Date | null;
    minDeliveryDate: Date | null;
    shippingMethods: Map<string, ShippingOption>;
    allowed: Boolean;
}

function ShippingDatePickerDay({
    allowed,
    day,
    minDate,
    minDeliveryDate,
    date,
    shippingMethods,
}: ShippingDatePickerDayProps) {
    const isNextBusinessDay =
        minDate &&
        minDeliveryDate &&
        isToday(minDate) &&
        isSameDay(date, minDeliveryDate) &&
        new Date().getHours() < CUTOFF_TIME;
    let method;
    if (isNextBusinessDay && shippingMethods.has('Next Working Day')) {
        method = shippingMethods.get('Next Working Day')!;
    } else {
        if (shippingMethods.has('Free Delivery')) {
            method = shippingMethods.get('Free Delivery')!;
        } else if (shippingMethods.has('Free Shipping')) {
            method = shippingMethods.get('Free Shipping')!;
        } else if (shippingMethods.has('Standard')) {
            method = shippingMethods.get('Standard')!;
        } else {
            method = shippingMethods.values().next().value;
        }
    }

    const title = `${format(date, 'EEEE do MMMM yyyy')} - ${
        allowed ? 'Available' : 'Unavailable'
    }`;

    // If price is an integer don't add decimals, else round to two decimal places
    const formattedCost =
        Math.round(method.cost) === method.cost
            ? `£${method.cost}`
            : `£${method.cost.toFixed(2)}`;

    return (
        <div className="shippingDatePicker-day" title={title}>
            <span>{day}</span>
            {allowed ? (
                <React.Fragment>
                    <br />
                    <span className="shippingDatePicker-price">
                        {method.cost
                            ? formattedCost
                            : 'Free'}
                    </span>
                </React.Fragment>
            ) : null}
        </div>
    );
}

export default memo(ShippingDatePickerDay);
