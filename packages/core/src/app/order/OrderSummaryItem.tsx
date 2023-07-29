import classNames from 'classnames';
import { isNumber } from 'lodash';
import React, { FunctionComponent, memo, ReactNode } from 'react';
import { Product } from '../../../types/graphql';

import { ShopperCurrency } from '../currency';

export interface OrderSummaryItemProps {
    id: string | number;
    productId?: string | number;
    amount: number;
    quantity: number;
    name: string;
    amountAfterDiscount?: number;
    image?: ReactNode;
    description?: ReactNode;
    productOptions?: OrderSummaryItemOption[];
    productDetails?: Product[];
}

export interface OrderSummaryItemOption {
    testId: string;
    content: ReactNode;
}

const OrderSummaryItem: FunctionComponent<OrderSummaryItemProps> = ({
    amount,
    amountAfterDiscount,
    productId,
    image,
    name,
    productOptions,
    description,
    productDetails,
    quantity,
}) => {
    const graphqlData = productDetails?.find((product) => Number(product.entityId) === Number(productId));

    const tilesPerM2 = graphqlData?.customFields?.edges?.find(
        (edge) => edge?.node.name === 'Tiles per M2'
    )?.node?.value;
    
    const packof2 = graphqlData?.customFields?.edges?.find(
        (edge) => edge?.node.name === 'Coverage per box'
    )?.node?.value;

    const price: number = tilesPerM2
        ? Number(tilesPerM2) * graphqlData?.prices?.price?.value
        : amount;

    const basePriceActual: number = tilesPerM2
        ? Number(tilesPerM2) * graphqlData?.prices?.basePrice?.value * Math.round((quantity / Number(tilesPerM2)) * 100) / 100
        : amount;
        
    const salePriceActual: number = tilesPerM2
        ? Number(tilesPerM2) * graphqlData?.prices?.salePrice?.value * Math.round((quantity / Number(tilesPerM2)) * 100) / 100
        : amount;

    let priceDifference: number = 0;
    priceDifference = basePriceActual - salePriceActual; 

    const width = `${graphqlData?.width?.value}${graphqlData?.width?.unit}`;
    const height = `${graphqlData?.height?.value}${graphqlData?.height?.unit}`;

    return (
        <div className="product" data-test="cart-item">
            <figure className="product-column product-figure">
                { image }
            </figure>

            <div className="product-column product-body">
                <h5
                    className="product-title optimizedCheckout-contentPrimary"
                    data-test="cart-item-product-title"
                >
                    { name }
                </h5>
                { tilesPerM2 ? (
                    <ul
                        className="product-options optimizedCheckout-contentSecondary"
                        data-test="cart-item-product-options"
                    >
                        <li className="product-option">
                            { Number(price).toLocaleString(undefined, {
                                style: 'currency',
                                currency: 'GBP',
                            }) }{ tilesPerM2 ? <React.Fragment>/m<sup>2</sup></React.Fragment> : null }
                        </li>
                        { width && height ? (
                            <li className="product-option">
                                Size: { width } x { height };
                            </li>
                        ) : null }
                        {tilesPerM2 ? (
                    <li className="product-option">
                        {packof2 ? (
                        <React.Fragment>
                            Coverage Per Box: {Math.round((quantity * Number(packof2)) * 100) / 100}m<sup>2</sup>
                        </React.Fragment>
                        ) : (
                        <React.Fragment>
                            Area: {Math.round((quantity / Number(tilesPerM2)) * 100) / 100}m<sup>2</sup>
                        </React.Fragment>
                        )}
                    </li>
                    ) : null}
                        { packof2 ? (
                            <li className="product-option">
                            Boxes: { quantity }
                            </li>
                        ) : 
                        <li className="product-option">
                        Quantity: { quantity }
                        </li> }
                        
                    </ul>
                ) : null }
                {productOptions && productOptions.length > 0 && (
                    <ul
                        className="product-options optimizedCheckout-contentSecondary"
                        data-test="cart-item-product-options"
                    >
                        { (productOptions || []).map((option, index) =>
                            <li
                                className="product-option"
                                data-test={ option.testId }
                                key={ index }
                            >
                                { option.content }
                            </li>
                        )}
                    </ul>
                )}
                {description && (
                    <div
                        className="product-description optimizedCheckout-contentSecondary"
                        data-test="cart-item-product-description"
                    >
                        {description}
                    </div>
                )}
            </div>

            <div className="product-column product-actions">
                <div
                    className={classNames('product-price', 'optimizedCheckout-contentPrimary', {
                        'product-price--beforeDiscount':
                            isNumber(amountAfterDiscount) && amountAfterDiscount !== amount,
                    })}
                    data-test="cart-item-product-price"
                >
                    <ShopperCurrency amount={amount} />
                    {salePriceActual && priceDifference !== 0 ?
                        <p className='product-price--saving'>You save £{priceDifference.toFixed(2)}</p>
                        :
                        null
                    }
                </div>
                
                {isNumber(amountAfterDiscount) && amountAfterDiscount !== amount && (
                    <div className="product-price" data-test="cart-item-product-price--afterDiscount">
                        <ShopperCurrency amount={amountAfterDiscount} />
                    </div>
                )}
            </div>
        </div>
    );
};

export default OrderSummaryItem;
