import { CheckoutSelectors, CheckoutService } from '@bigcommerce/checkout-sdk';
import { memoizeOne } from '@bigcommerce/memoize';
import React, { Component, ReactNode } from 'react';
import { customGlobalState } from '../5874/hooks/use-custom-global-state';
import { calculateTrueMinimumDate, isDateAllowed } from '../5874/utils/validate-dates';

import CheckoutContext from './CheckoutContext';

export interface CheckoutProviderProps {
    checkoutService: CheckoutService;
}

export interface CheckoutProviderState {
    checkoutState: CheckoutSelectors;
    status: 'idle' | 'loading';
    hasFetched: boolean;
}

export default class CheckoutProvider extends Component<
    CheckoutProviderProps,
    CheckoutProviderState
> {
    state: Readonly<CheckoutProviderState>;

    private unsubscribe?: () => void;

    private getContextValue = memoizeOne((checkoutService, checkoutState) => {
        return {
            checkoutService,
            checkoutState,
            customGlobalState,
        };
    });

    constructor(props: Readonly<CheckoutProviderProps>) {
        super(props);

        this.state = {
            checkoutState: props.checkoutService.getState(),
            status: 'idle',
            hasFetched: false,
        };
    }

    componentDidMount(): void {
        const { checkoutService } = this.props;

        this.unsubscribe = checkoutService.subscribe((checkoutState) => {
            this.setState({ checkoutState });

            const cart = checkoutState.data.getCart();
            if (cart && !this.state.hasFetched && this.state.status === 'idle') {
                this.setState({ status: 'loading' });
                Promise.all([
                    customGlobalState.getState().getHolidayDays(),
                    customGlobalState.getState().getAvailabilityDates(cart),
                    checkoutService.loadShippingOptions(),
                ]).then(([holidayDays, { earliestAvailableDeliveryDate }, state]) => {
                    const customerMessage = checkoutState.data.getCheckout()?.customerMessage;
                    // Check if selected delivery date has been set before
                    if (
                        customerMessage &&
                        customerMessage.includes('Smaller delivery vehicle advised:') &&
                        customerMessage.includes('Selected delivery date:')
                    ) {
                        const [baseMessageWithVehicleAdvice, selectedDate] = customerMessage.split(
                            'Selected delivery date: '
                        );
                        const [baseMessage, vehicleAdvice] = baseMessageWithVehicleAdvice.split(
                            'Smaller delivery vehicle advised: '
                        );

                        const consignment = state?.data
                            ?.getConsignments()
                            ?.find(
                                (consignment) =>
                                    consignment?.availableShippingOptions
                                        ?.length
                            );

                        const methodHasLeadTimeSpecified = consignment?.selectedShippingOption?.description.match(/\d+/g) ?? 0;

                        // Get the "true" minimum date as the returned delivery date
                        // could possibly land on a weekend as it's when stock arrives
                        const minDeliveryDate = calculateTrueMinimumDate({
                            holidayDays,
                            minDate: earliestAvailableDeliveryDate,
                            consignment: consignment!,
                            potentialLeadTime: methodHasLeadTimeSpecified ? parseInt(methodHasLeadTimeSpecified[0], 10) ?? 0 : 0
                        });

                        // Validate the previously selected date
                        const isValid = isDateAllowed({
                            date: new Date(selectedDate),
                            minDate: minDeliveryDate!,
                            holidayDays: holidayDays,
                            consignment: consignment!,
                        });

                        const strippedMessage = baseMessage.split('\n').filter(Boolean).join('\n');

                        if (!isValid) {
                            // If the selected date is invalid, default it to today which will
                            // trigger the checkout to send the user to the shipping step
                            checkoutService.updateCheckout({ customerMessage: strippedMessage }).then(() => {
                                customGlobalState.setState({
                                    comments: strippedMessage,
                                    selectedDeliveryDate: new Date(),
                                    hasPerformedInitialFetch: true,
                                    narrowRoad: vehicleAdvice?.trim() === 'Yes',
                                });
                                this.setState({ hasFetched: true, status: 'idle' });
                            });
                        } else {
                            // Else just add the data to state
                            customGlobalState.setState({
                                hasPerformedInitialFetch: true,
                                comments: strippedMessage,
                                selectedDeliveryDate: new Date(selectedDate),
                                narrowRoad: vehicleAdvice?.trim() === 'Yes',
                            });
                            this.setState({ hasFetched: true, status: 'idle' });
                        }
                    } else {
                        customGlobalState.setState({ hasPerformedInitialFetch: true });
                        this.setState({ hasFetched: true, status: 'idle' });
                    }
                });
            }
        });
    }

    componentWillUnmount(): void {
        if (this.unsubscribe) {
            this.unsubscribe();
            this.unsubscribe = undefined;
        }
    }

    render(): ReactNode {
        const { checkoutService, children } = this.props;
        const { checkoutState } = this.state;

        return (
            <CheckoutContext.Provider value={this.getContextValue(checkoutService, checkoutState)}>
                {children}
            </CheckoutContext.Provider>
        );
    }
}
