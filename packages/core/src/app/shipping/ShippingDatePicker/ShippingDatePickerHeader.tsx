import React from 'react';
import { format } from 'date-fns';

// Props are all derived directly from datepicker itself
interface ShippingDatePickerProps {
    date: Date;
    decreaseMonth(): void;
    increaseMonth(): void;
    prevMonthButtonDisabled: boolean;
    nextMonthButtonDisabled: boolean;
}

function ShippingDatePickerHeader({
    date,
    decreaseMonth,
    increaseMonth,
    prevMonthButtonDisabled,
    nextMonthButtonDisabled,
}: ShippingDatePickerProps) {
    return (
        <div className="react-datepicker__header-content">
            <button
                aria-label="Prev Month"
                className="react-datepicker__header-arrow react-datepicker__header-arrow--prev"
                disabled={prevMonthButtonDisabled}
                type="button"
                onClick={decreaseMonth}
            >
                <svg
                    aria-hidden="true"
                    viewBox="0 0 6.86 12"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path d="M.25 11.75a.86.86 0 0 1 0-1.21L4.79 6 .25 1.46a.86.86 0 0 1 0-1.21.86.86 0 0 1 1.21 0l5.15 5.14a.88.88 0 0 1 0 1.22l-5.15 5.14a.86.86 0 0 1-1.21 0Z" />
                </svg>
            </button>
            <div className="react-datepicker__current-month">
                {format(date, 'MMMM yyyy')}
            </div>
            <button
                aria-label="Next Month"
                className="react-datepicker__header-arrow react-datepicker__header-arrow--next"
                disabled={nextMonthButtonDisabled}
                type="button"
                onClick={increaseMonth}
            >
                <svg
                    aria-hidden="true"
                    viewBox="0 0 6.86 12"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path d="M.25 11.75a.86.86 0 0 1 0-1.21L4.79 6 .25 1.46a.86.86 0 0 1 0-1.21.86.86 0 0 1 1.21 0l5.15 5.14a.88.88 0 0 1 0 1.22l-5.15 5.14a.86.86 0 0 1-1.21 0Z" />
                </svg>
            </button>
        </div>
    );
}

export default ShippingDatePickerHeader;
