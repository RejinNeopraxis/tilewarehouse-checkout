import React from 'react';
import { format } from 'date-fns';

interface ShippingDatePickerDescriptionProps {
    totalWeight: number;
    selectedDate: Date;
}

function ShippingDatePickerDescription({
    totalWeight,
    selectedDate,
}: ShippingDatePickerDescriptionProps) {
    const cutOffWeight = (window as any).cutOffWeight ?? 20;

    return (
        <div className="shippingDatePicker-delivery-description">
            <i className="icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                    <path
                        fill="#98B2F7"
                        d="M8 1.6A6.4 6.4 0 1 0 14.4 8 6.41 6.41 0 0 0 8 1.6ZM0 8a8 8 0 1 1 8 8 8 8 0 0 1-8-8Z"
                    />
                    <path
                        fill="#98B2F7"
                        d="M8 6.4a.8.8 0 0 1 .8.8V12a.8.8 0 0 1-1.6 0V7.2a.8.8 0 0 1 .8-.8ZM9.2 4.4A1.2 1.2 0 1 1 8 3.2a1.2 1.2 0 0 1 1.2 1.2Z"
                    />
                </svg>
            </i>

            <p>
                Your order will be delivered on <strong>{format(selectedDate, 'd MMMM')}</strong>{' '}
                between <strong>8am-6pm</strong> as{' '}
                <strong>1 delivery by {totalWeight > cutOffWeight ? 'pallet' : 'parcel'}</strong>.
                Your total order weight is <strong>{Math.round(totalWeight * 100) / 100}kg.</strong>{' '}
                {totalWeight > cutOffWeight ? (
                    <React.Fragment>
                        <br />
                        <span>This order is a kerbside delivery.</span>
                    </React.Fragment>
                ) : null}
            </p>
        </div>
    );
}

export default ShippingDatePickerDescription;
