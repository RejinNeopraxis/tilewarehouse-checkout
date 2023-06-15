/* eslint-disable @typescript-eslint/tslint/config */
import {
    Cart,
    CheckoutRequestBody,
    CheckoutSelectors,
    Consignment
} from '@bigcommerce/checkout-sdk';
import { addWeeks, eachDayOfInterval, isToday, isSameDay } from 'date-fns';
import enGB from 'date-fns/locale/en-GB';
import React, { FunctionComponent, memo, useEffect, useState } from 'react';
import ReactDatePicker, { registerLocale } from 'react-datepicker';
import { StateSelector } from 'zustand';
import { Product, Site } from '../../../../types/graphql';
import getProductsByIdQuery from '../../5874/graphql/get-products-by-id';
import useCustomGlobalState, {
    CustomGlobalState,
    customGlobalState
} from '../../5874/hooks/use-custom-global-state';
import formatComments from '../../5874/utils/format-comment';
import { calculateTrueMinimumDate, isDateAllowed, CUTOFF_TIME } from '../../5874/utils/validate-dates';
import client from '../../client';
import './ShippingDatePicker.scss';
import ShippingDatePickerDay from './ShippingDatePickerDay';
import ShippingDatePickerDescription from './ShippingDatePickerDescription';
import ShippingDatePickerHeader from './ShippingDatePickerHeader';

// This exposes date-fns en-GB locale to the datepicker, this is required to
// make the datepicker start from Monday rather than Sunday
registerLocale('en-GB', enGB);

const selector: StateSelector<CustomGlobalState, Partial<CustomGlobalState>> = (state) => ({
    earliestAvailableDeliveryDate: state.earliestAvailableDeliveryDate,
    graphqlProductData: state.graphqlProductData,
    holidayDays: state.holidayDays,
    holidayDayStatus: state.holidayDayStatus,
    selectedDeliveryDate: state.selectedDeliveryDate,
});

interface ShippingDatePickerProps {
    consignment: Consignment;
    cart: Cart;
    handleSelect(value: string): void;
    updateCheckout(payload: CheckoutRequestBody): Promise<CheckoutSelectors>;
}

const ShippingDatePicker: FunctionComponent<ShippingDatePickerProps> = ({
    consignment,
    cart,
    handleSelect,
    updateCheckout,
}) => {
    const [minDeliveryDate, setMinDeliveryDate] = useState<Date | null>(null);
    const {
        narrowRoad,
        earliestAvailableDeliveryDate: minAvailabilityDate,
        graphqlProductData,
        holidayDays,
        selectedDeliveryDate: selectedDate,
    } = useCustomGlobalState(selector) as CustomGlobalState;

    // Call these directly so that we don't get re-renders because they're functions
    // and function equality can be odd
    const {
        getAvailabilityDates,
        getHolidayDays,
        setSelectedDeliveryDate: setSelectedDate,
        setGraphqlProductData,
    } = customGlobalState.getState();

    const totalWeight = cart.lineItems.physicalItems.reduce((total, item) => {
        const graphqlData = graphqlProductData.find((product) => product.sku === item.sku);
        if (graphqlData) {
            return total + (graphqlData?.weight?.value ?? 0) * item.quantity;
        }

        return total;
    }, 0);

    // Create a map just for some easier lookups instead of doing [].find(...)
    // every time
    const shippingMethods = new Map(
        consignment.availableShippingOptions?.map((method) => [method.description, method])
    );

    const getShippingMethod = (date: Date) => {
        const isNextBusinessDay =
            minAvailabilityDate &&
            minDeliveryDate &&
            isToday(minAvailabilityDate) &&
            isSameDay(date, minDeliveryDate) &&
            new Date().getHours() < CUTOFF_TIME;
        // If the selected date is the next day, next day delivery always takes precedence,
        // otherwise free delivery takes precedence over standard delivery.
        // This includes a fallback to the first available shipping method in the case
        // that the preferred methods aren't found (typically in the case orders that are
        // ONLY samples)
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

        return method;
    }

    const handleDateSelect = async (date: Date) => {
        if (!isDateAllowed({ date, minDate: minDeliveryDate!, holidayDays: holidayDays!, consignment }))
            return;

        setSelectedDate(date);

        // Fetch the state directly as including comments in the selector
        // causes a re-render on every key stroke which makes the date picker
        // re-render and makes the checkout get very laggy
        const comments = customGlobalState.getState().comments;

        const formattedComment = formatComments(comments, date, narrowRoad);
        // Submit the updated comment to BigCommerce
        await updateCheckout({ customerMessage: formattedComment });

        const method = getShippingMethod(date);
        if (method) {
            handleSelect(method.id);
        }
    };

    // Generate a custom day component so we can include the pricing if it's
    // relevant for that day
    const renderDayContents = (day: number, date: Date) => {
        const allowed = isDateAllowed({
            date,
            minDate: minDeliveryDate!,
            holidayDays: holidayDays!,
            consignment,
        });
        return (
            <ShippingDatePickerDay
                day={day}
                date={date}
                minDate={minAvailabilityDate}
                minDeliveryDate={minDeliveryDate}
                shippingMethods={shippingMethods}
                allowed={allowed}
            />
        );
    };

    // Generate a modified header, mostly so we can add in our own icons and pick
    // custom formatting for the month/year
    const renderCustomHeader = (params: {
        date: Date;
        decreaseMonth(): void;
        increaseMonth(): void;
        prevMonthButtonDisabled: boolean;
        nextMonthButtonDisabled: boolean;
    }) => {
        return <ShippingDatePickerHeader {...params} />;
    };

    // Derive a string from the consignments because useEffect uses strict equality
    // checks, and so passing the array will cause unnecessary re-fetches
    const key = JSON.stringify(consignment.availableShippingOptions?.map((option) => option.id));

    // Perform a validation any time the shipping options change
    const revalidate = async () => {
        if (!consignment.availableShippingOptions?.length) return;

        const [
            latestHolidayDates,
            { earliestAvailableDeliveryDate: updatedMinDate },
        ] = await Promise.all([getHolidayDays(), getAvailabilityDates(cart)]);

        const method = getShippingMethod(updatedMinDate);
        const methodHasLeadTimeSpecified = method.description.match(/\d+/g) ?? false;

        const newMinDate = calculateTrueMinimumDate({
            minDate: updatedMinDate,
            holidayDays: latestHolidayDates!,
            consignment,
            potentialLeadTime: methodHasLeadTimeSpecified ? parseInt(methodHasLeadTimeSpecified[0]) ?? 0 : 0,
        }) as Date;

        const comments = customGlobalState.getState().comments;

        setMinDeliveryDate(newMinDate);

        const isValid = isDateAllowed({
            date: selectedDate,
            minDate: newMinDate,
            holidayDays: latestHolidayDates!,
            consignment,
        });

        if (!isValid) {
            setSelectedDate(newMinDate);
            handleSelect(method!.id);
            const formattedComment = formatComments(
                comments,
                newMinDate,
                narrowRoad
            );
            updateCheckout({ customerMessage: formattedComment });
        } else {
            const method = getShippingMethod(selectedDate);
            handleSelect(method!.id);
        }
        return { valid: isValid, date: newMinDate };
    };

    // Perform a validation on step load
    useEffect(() => {
        revalidate();
    }, []);

    useEffect(() => {
        revalidate();
        // eslint can't detect that key derives from consignment, which would mean all
        // dependencies are in fact covered
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [key, minAvailabilityDate?.toString, minDeliveryDate?.toString]);

    useEffect(() => {
        if (!graphqlProductData.length) {
            const productIds = cart.lineItems.physicalItems.map((item) => item.productId);
            client
                .query(getProductsByIdQuery, {
                    productIds,
                })
                .toPromise()
                .then((result) => {
                    const products = ((
                        result as { data: { site: Site } }
                    )?.data?.site?.products?.edges?.map((edge) => edge?.node) ?? []) as Product[];
                    if (products.length) {
                        setGraphqlProductData(products);
                    }
                });
        }
    }, [graphqlProductData, cart]);

    // We need to exclude any weekend or holiday days
    const excludedDates = eachDayOfInterval({
        start: minDeliveryDate ? minDeliveryDate : minAvailabilityDate ? minAvailabilityDate : new Date(),
        end: addWeeks(
            minDeliveryDate ? minDeliveryDate : minAvailabilityDate ? minAvailabilityDate : new Date(),
            12
        ),
    }).filter(
        (date) =>
            !isDateAllowed({
                date,
                minDate: minDeliveryDate!,
                holidayDays: holidayDays!,
                consignment,
            })
    );

    return (
        <React.Fragment>
            <div className="shippingDatePicker">
                <ReactDatePicker
                    excludeDates={excludedDates}
                    formatWeekDay={(nameOfDay) => nameOfDay.slice(0, 3)}
                    inline
                    locale="en-GB"
                    maxDate={
                        minDeliveryDate
                            ? addWeeks(minDeliveryDate, 12)
                            : minAvailabilityDate
                            ? addWeeks(minAvailabilityDate, 12)
                            : null
                    }
                    minDate={minDeliveryDate ? minDeliveryDate : minAvailabilityDate}
                    onChange={(date) => handleDateSelect(date!)}
                    renderCustomHeader={renderCustomHeader}
                    // The third party types are incorrect for this function
                    // @ts-ignore
                    renderDayContents={renderDayContents}
                    selected={selectedDate}
                />
            </div>

            <ShippingDatePickerDescription totalWeight={totalWeight} selectedDate={selectedDate} />
        </React.Fragment>
    );
};

// @ts-ignore
ShippingDatePicker.whyDidYouRender = true;

export default memo(ShippingDatePicker);
