import React, { ComponentType, FunctionComponent } from 'react';

import { OrderSummaryProps, OrderSummarySubtotalsProps } from '../order';

import { WithCheckoutCartSummaryProps } from './CartSummary';
import mapToOrderSummarySubtotalsProps from './mapToOrderSummarySubtotalsProps';

export default function withRedeemable(
    OriginalComponent: ComponentType<OrderSummaryProps & OrderSummarySubtotalsProps>,
): FunctionComponent<WithCheckoutCartSummaryProps & { headerLink?: any }> {
    return (props) => {
        const {
            checkout,
            storeCurrency,
            shopperCurrency,
            headerLink,
            onRemovedCoupon,
            onRemovedGiftCertificate,
            storeCreditAmount,
        } = props;

        return (
            <OriginalComponent
                { ...mapToOrderSummarySubtotalsProps(checkout) }
                additionalLineItems={ null }
                headerLink={ headerLink }
                lineItems={ checkout.cart.lineItems }
                onRemovedCoupon={ onRemovedCoupon }
                onRemovedGiftCertificate={ onRemovedGiftCertificate }
                shopperCurrency={ shopperCurrency }
                storeCreditAmount={ storeCreditAmount }
                storeCurrency={ storeCurrency }
                total={ checkout.outstandingBalance }
            />
        );
    };
}
