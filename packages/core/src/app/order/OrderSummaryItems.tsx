import { LineItemMap } from '@bigcommerce/checkout-sdk';
import React, { ReactNode } from 'react';

import { TranslatedString } from '../locale';
import { IconChevronDown, IconChevronUp } from '../ui/icon';
import client from '../client';
import type { Product, Site } from '../../../types/graphql';

import getItemsCount from './getItemsCount';
import mapFromCustom from './mapFromCustom';
import mapFromDigital from './mapFromDigital';
import mapFromGiftCertificate from './mapFromGiftCertificate';
import mapFromPhysical from './mapFromPhysical';
import OrderSummaryItem from './OrderSummaryItem';
import getProductsByIdQuery from '../5874/graphql/get-products-by-id';
import withCustomGlobalState, { CustomGlobalStateStore } from '../5874/components/withCustomGlobalState';

const COLLAPSED_ITEMS_LIMIT = 4;

export interface OrderSummaryItemsProps {
    items: LineItemMap;
}

interface OrderSummaryItemsState {
    isExpanded: boolean;
}

class OrderSummaryItems extends React.Component<OrderSummaryItemsProps & CustomGlobalStateStore, OrderSummaryItemsState> {
    constructor(props: OrderSummaryItemsProps & CustomGlobalStateStore) {
        super(props);

        this.state = {
            isExpanded: false,
        };
    }

    componentDidMount(): void {
        client
            .query(getProductsByIdQuery, {
                productIds: this.props.items.physicalItems.map(
                    (item) => item.productId
                ),
            })
            .toPromise()
            .then((result) => {
                const products = ((
                    result as { data: { site: Site } }
                )?.data?.site?.products?.edges?.map((edge) => edge?.node) ??
                    []) as Product[];
                this.props.customGlobalState?.setGraphqlProductData(products);
            });
    }

    render(): ReactNode {
        const { items, customGlobalState } = this.props;
        const { graphqlProductData } = customGlobalState ?? {};
        const { isExpanded } = this.state;

        return (
            <>
                <h3
                    className="cart-section-heading optimizedCheckout-contentPrimary"
                    data-test="cart-count-total"
                >
                    <TranslatedString
                        data={{ count: getItemsCount(items) }}
                        id="cart.item_count_text"
                    />
                </h3>

                <ul aria-live="polite" className="productList">
                    {[
                        ...items.physicalItems
                            .slice()
                            .sort((item) => item.variantId)
                            .map(mapFromPhysical),
                        ...items.giftCertificates.slice().map(mapFromGiftCertificate),
                        ...items.digitalItems
                            .slice()
                            .sort((item) => item.variantId)
                            .map(mapFromDigital),
                        ...(items.customItems || []).map(mapFromCustom),
                    ]
                        .slice(0, isExpanded ? undefined : COLLAPSED_ITEMS_LIMIT)
                        .map(summaryItemProps => {
                            return <li
                                className="productList-item is-visible"
                                key={ summaryItemProps.id }
                            >
                                <OrderSummaryItem
                                    { ...summaryItemProps }
                                    productDetails={ graphqlProductData }
                                />
                            </li>
                        })
                    }
                </ul>

                {this.renderActions()}
            </>
        );
    }

    private renderActions(): ReactNode {
        const { isExpanded } = this.state;

        if (this.getLineItemCount() < 5) {
            return;
        }

        return (
            <div className="cart-actions">
                <button
                    className="button button--tertiary button--tiny optimizedCheckout-buttonSecondary"
                    onClick={this.handleToggle}
                    type="button"
                >
                    {isExpanded ? (
                        <>
                            <TranslatedString id="cart.see_less_action" />
                            <IconChevronUp />
                        </>
                    ) : (
                        <>
                            <TranslatedString id="cart.see_all_action" />
                            <IconChevronDown />
                        </>
                    )}
                </button>
            </div>
        );
    }

    private getLineItemCount(): number {
        const { items } = this.props;

        return (
            (items.customItems || []).length +
            items.physicalItems.length +
            items.digitalItems.length +
            items.giftCertificates.length
        );
    }

    private handleToggle: () => void = () => {
        const { isExpanded } = this.state;

        this.setState({ isExpanded: !isExpanded });
    };
}

export default withCustomGlobalState(OrderSummaryItems, (state) => ({
    graphqlProductData: state.graphqlProductData,
    setGraphqlProductData: state.setGraphqlProductData,
}));
