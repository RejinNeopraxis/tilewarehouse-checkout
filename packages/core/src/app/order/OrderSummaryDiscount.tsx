import React, { FunctionComponent, memo } from 'react';

import { ShopperCurrency } from '../currency';
import { TranslatedString } from '../locale';

import OrderSummaryPrice, { OrderSummaryPriceProps } from './OrderSummaryPrice';

export interface OrderSummaryDiscountProps extends OrderSummaryPriceProps {
    remaining?: number;
    code?: string;
    onRemoved?(code: string): void;
}

const OrderSummaryDiscount: FunctionComponent<OrderSummaryDiscountProps> = ({
    code,
    remaining,
    amount,
    onRemoved,
    ...rest
}) => (
    <OrderSummaryPrice
        { ...{ ...rest, label: code ? 'Coupon' : rest.label } }
        { ...(onRemoved && {
            onActionTriggered: () => code && onRemoved(code),
            className: 'cart-priceItem-coupon',
            actionLabel: (
                <React.Fragment>
                    <i aria-label="Remove" className="icon cart-priceItem-remove-coupon" title="Remove">
                        <svg viewBox="0 0 20 20">
                            <path d="M5 2a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2h4a1 1 0 0 1 0 2h-1.07l-.87 12.14a2 2 0 0 1-2 1.86H4.93a2 2 0 0 1-2-1.86L2.07 6H1a1 1 0 0 1 0-2h4Zm2 2h6V2H7ZM4.07 6l.86 12h10.14l.86-12ZM8 8a1 1 0 0 1 1 1v6a1 1 0 0 1-2 0V9a1 1 0 0 1 1-1Zm4 0a1 1 0 0 1 1 1v6a1 1 0 0 1-2 0V9a1 1 0 0 1 1-1Z" xmlns="http://www.w3.org/2000/svg" />
                        </svg>
                    </i>

                    <TranslatedString id="cart.remove_action" />
                </React.Fragment>
            ),
        }) }
        amount={ -1 * (amount || 0) }
    >
        {!!remaining && remaining > 0 && (
            <span
                className="cart-priceItem-postFix optimizedCheckout-contentSecondary"
                data-test="cart-price-remaining"
            >
                <TranslatedString id="cart.remaining_text" />
                {': '}
                <ShopperCurrency amount={remaining} />
            </span>
        )}

        {code && (
            <span
                className="cart-priceItem-postFix optimizedCheckout-contentSecondary"
                data-test="cart-price-code"
            >
                {code}
            </span>
        )}
    </OrderSummaryPrice>
);

export default memo(OrderSummaryDiscount);
