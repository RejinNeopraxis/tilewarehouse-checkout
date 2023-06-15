import {
    Cart,
    CheckoutRequestBody,
    CheckoutSelectors,
    Consignment,
    ShippingOption
} from '@bigcommerce/checkout-sdk';
import React, { FunctionComponent, memo, useCallback } from 'react';

import { EMPTY_ARRAY } from '../../common/utility';
import { Checklist, ChecklistItem } from '../../ui/form';
import { LoadingOverlay } from '../../ui/loading';
import ShippingDatePicker from '../ShippingDatePicker/index';

import StaticShippingOption from './StaticShippingOption';

interface ShippingOptionListItemProps {
    consignmentId: string;
    shippingOption: ShippingOption;
}

const ShippingOptionListItem: FunctionComponent<ShippingOptionListItemProps> = ({
    consignmentId,
    shippingOption,
}) => {
    const renderLabel = useCallback(
        () => (
            <div className="shippingOptionLabel">
                <StaticShippingOption displayAdditionalInformation={true} method={shippingOption} />
            </div>
        ),
        [shippingOption],
    );

    return (
        <ChecklistItem
            htmlId={`shippingOptionRadio-${consignmentId}-${shippingOption.id}`}
            label={renderLabel}
            value={shippingOption.id}
        />
    );
};

export interface ShippingOptionListProps {
    cart: Cart;
    consignmentId: string;
    consignment: Consignment;
    inputName: string;
    isLoading: boolean;
    selectedShippingOptionId?: string;
    shippingOptions?: ShippingOption[];
    onSelectedOption(consignmentId: string, shippingOptionId: string): void;
    updateCheckout(payload: CheckoutRequestBody): Promise<CheckoutSelectors>;
}

const ShippingOptionsList: FunctionComponent<ShippingOptionListProps> = ({
    cart,
    consignment,
    consignmentId,
    inputName,
    isLoading,
    shippingOptions = EMPTY_ARRAY,
    selectedShippingOptionId,
    onSelectedOption,
    updateCheckout,
 }) => {
    const handleSelect = useCallback(
        (value: string) => {
            onSelectedOption(consignmentId, value);
        },
        [consignmentId, onSelectedOption],
    );

    if (!shippingOptions.length) {
        return null;
    }

    const samples = cart.lineItems.physicalItems.reduce(
        (total, item) => {
            if (
                item.sku.endsWith('-S') || item.name.includes('Sample')
            ) {
                return total + item.quantity;
            }

            return total;
        },
        0,
    );

    const isPureSamplesOrder = samples === cart.lineItems.physicalItems.length;

    return (
        <LoadingOverlay isLoading={isLoading}>
        { isPureSamplesOrder ? (
            <Checklist
                aria-live="polite"
                defaultSelectedItemId={ selectedShippingOptionId }
                name={ inputName }
                onSelect={ handleSelect }
            >
                { shippingOptions.map(shippingOption => (
                    <ShippingOptionListItem
                        consignmentId={ consignmentId }
                        key={ shippingOption.id }
                        shippingOption={ shippingOption }
                    />
                )) }
            </Checklist>
        ) : (
            <ShippingDatePicker
                cart={ cart }
                consignment={ consignment }
                handleSelect={ handleSelect }
                updateCheckout={ updateCheckout }
            />
        ) }
        </LoadingOverlay>
    );
};

export default memo(ShippingOptionsList);
