import classNames from 'classnames';
import { noop } from 'lodash';
import React, { FunctionComponent, memo, ReactNode } from 'react';

import { preventDefault } from '../common/dom';

import CheckoutStepType from './CheckoutStepType';

export interface CheckoutStepHeaderProps {
    heading: ReactNode;
    isActive?: boolean;
    isComplete?: boolean;
    isEditable?: boolean;
    summary?: ReactNode;
    type: CheckoutStepType;
    onEdit?(type: CheckoutStepType): void;
}

const CheckoutStepHeader: FunctionComponent<CheckoutStepHeaderProps> = ({
    heading,
    isActive,
    isComplete,
    isEditable,
    onEdit,
    summary,
    type,
}) => {
    return (
        <div
            className={classNames('stepHeader', {
                'is-readonly': !isEditable,
                'is-clickable': isEditable && !isActive,
            })}
            onClick={preventDefault(isEditable && onEdit ? () => onEdit(type) : noop)}
        >
            <div className="stepHeader-figure stepHeader-column">
                <h2 className="stepHeader-title optimizedCheckout-headingPrimary">{heading}</h2>
            </div>

            <div
                className="stepHeader-body stepHeader-column optimizedCheckout-contentPrimary"
                data-test="step-info"
            >
                { !isActive && isComplete && summary }
            </div>
        </div>
    );
};

export default memo(CheckoutStepHeader);
