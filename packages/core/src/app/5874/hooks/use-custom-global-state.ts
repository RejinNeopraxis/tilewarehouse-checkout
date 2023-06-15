import { Cart } from '@bigcommerce/checkout-sdk';
import { useStore } from 'zustand';
import createStore, { StateSelector } from 'zustand/vanilla';
import { startOfDay } from 'date-fns';
import { Product } from '../../../../types/graphql';
import shallow from 'zustand/shallow';

export interface HolidayDay {
    title: string;
    date: string;
    notes: string;
    bunting: boolean;
}

export interface AvailabilityDetails {
    [sku: string]: {
        requestedStock: number;
        onHand: number;
        onOrder: number;
        availableStock: number;
        stockAvailabilityDate: string;
    };
}

export interface CustomGlobalState {
    selectedDeliveryDate: Date;
    earliestAvailableDeliveryDate: Date | null;
    comments: string;
    narrowRoad: boolean;
    holidayDays: HolidayDay[] | null;
    holidayDayStatus: 'loading' | 'idle' | 'error';
    availabilityDates: AvailabilityDetails | null;
    hasPerformedInitialFetch: boolean;
    graphqlProductData: Product[];
    setSelectedDeliveryDate(date: Date): void;
    setEarliestAvailableDeliveryDate(date: Date): void;
    setComments(comments: string): void;
    setNarrowRoad(narrowRoad: boolean): void;
    getHolidayDays(): Promise<HolidayDay[]>;
    getAvailabilityDates(cart: Cart): Promise<{
        availabilityDates: AvailabilityDetails;
        earliestAvailableDeliveryDate: Date;
    }>;
    setGraphqlProductData(data: Product[]): void;
}

export const customGlobalState = createStore<CustomGlobalState>((set) => ({
    selectedDeliveryDate: new Date(),
    earliestAvailableDeliveryDate: null,
    comments: '',
    narrowRoad: false,
    holidayDays: null,
    holidayDayStatus: 'idle',
    availabilityDates: null,
    hasPerformedInitialFetch: false,
    graphqlProductData: [],
    setSelectedDeliveryDate: (date: Date) => {
        window.localStorage.setItem(
            'persisted_delivery_date',
            date.valueOf().toString()
        );
        set({ selectedDeliveryDate: date });
    },
    setEarliestAvailableDeliveryDate: (date: Date) =>
        set({ earliestAvailableDeliveryDate: date }),
    setComments: (comments: string) => set({ comments }),
    setNarrowRoad: (narrowRoad: boolean) => set({ narrowRoad }),
    getHolidayDays: async () => {
        set({ holidayDayStatus: 'loading' });
        // See https://www.api.gov.uk/gds/bank-holidays/#bank-holidays for reference
        const response = await fetch('https://www.gov.uk/bank-holidays.json');
        const holidayDays = (await response.json()) as {
            'england-and-wales': { events: HolidayDay[] };
            scotland: { events: HolidayDay[] };
            'northern-ireland': { events: HolidayDay[] };
        };

        set({
            holidayDays: holidayDays['england-and-wales'].events,
            holidayDayStatus: 'idle',
        });

        return holidayDays['england-and-wales'].events;
    },
    getAvailabilityDates: async (
        cart: Cart
    ): Promise<{
        availabilityDates: AvailabilityDetails;
        earliestAvailableDeliveryDate: Date;
    }> => {
        const { lineItems } = cart;
        const items = lineItems?.physicalItems;
        const data = items?.map((item) => ({
            sku: item.sku,
            quantity: item.quantity,
        }));

        const response = await fetch(
            `https://api.tilewarehouse.co.uk/api/bp/product-availability`,
            {
                headers: {
                    Authorization:
                        'Bearer WB0ltuSeJ9g5nN8cBpHx5f9LoCduNZvgR3w7VOaL',
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
                body: JSON.stringify({ data }),
                method: 'POST',
            }
        );

        const json = await response.text();
        const parsed = JSON.parse(json) as AvailabilityDetails;
        const dates = Object.values(parsed)
            .filter((item) => Boolean(item.stockAvailabilityDate))
            .map((item) => startOfDay(new Date(item.stockAvailabilityDate)))
            .sort((a, b) => b.getTime() - a.getTime());
        // If date is today that means it's immediately available, but since next day
        // is the actual earliest it can be delivered, add one day
        const minDate = dates[0];
        set({
            availabilityDates: parsed,
            earliestAvailableDeliveryDate: minDate,
        });
        return {
            availabilityDates: parsed,
            earliestAvailableDeliveryDate: minDate,
        };
    },
    setGraphqlProductData: (data: Product[]) =>
        set({ graphqlProductData: data }),
}));

const defaultSelector: StateSelector<CustomGlobalState, CustomGlobalState | Partial<CustomGlobalState>> = (state) => state;

/**
 * To use the custom global state within a function component, just import
 * this hook and access it directly. For class components see withCustomGlobalState.tsx
 * @example
 * import { useCustomGlobalState } from './path/to/use-custom-global-state';
 * const MyComponent = () => {
 *    const state = useCustomGlobalState();
 *    return ...;
 * }
 */
const useCustomGlobalState = (selector = defaultSelector) =>
    useStore(customGlobalState, selector, shallow);

export default useCustomGlobalState;
