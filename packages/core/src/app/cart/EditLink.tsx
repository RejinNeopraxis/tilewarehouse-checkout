import React, { FunctionComponent, memo } from 'react';

import { TranslatedString } from '../locale';

export interface EditLinkProps {
    className?: string;
    url: string;
}

const EditLink: FunctionComponent<EditLinkProps> = ({ className, url }) => (
    <a
        className={className || 'cart-header-link'}
        data-test="cart-edit-link"
        href={url}
        id="cart-edit-link"
        target="_top"
    >
        <span className="button button--tertiary button--tertiary-grey">
            <TranslatedString id="cart.edit_cart_action" />
        </span>
    </a>
);

export default memo(EditLink);
