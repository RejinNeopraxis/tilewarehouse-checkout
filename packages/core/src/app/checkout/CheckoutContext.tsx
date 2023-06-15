import { CheckoutSelectors, CheckoutService } from '@bigcommerce/checkout-sdk';
import { createContext } from 'react';
import { customGlobalState } from '../5874/hooks/use-custom-global-state';

export interface CheckoutContextProps {
    checkoutService: CheckoutService;
    checkoutState: CheckoutSelectors;
    customGlobalState?: typeof customGlobalState;
}

const CheckoutContext = createContext<CheckoutContextProps | undefined>(undefined);

export default CheckoutContext;
