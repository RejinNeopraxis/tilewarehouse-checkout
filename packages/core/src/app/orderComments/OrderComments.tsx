import { FieldProps } from 'formik';
import React, { ChangeEvent, FunctionComponent, useCallback, useMemo } from 'react';

import useCustomGlobalState, { CustomGlobalState } from '../5874/hooks/use-custom-global-state';
import { TranslatedString } from '../locale';
import { CheckboxInput, Fieldset, FormField, Label, Legend, TextArea } from '../ui/form';

const OrderComments: FunctionComponent = () => {
    const { comments, narrowRoad, setComments, setNarrowRoad } =
        useCustomGlobalState() as CustomGlobalState;

    // This is to play "nice" with Formik controlling all the inputs and being
    // on too old of a version for us to use hooks to programatically change it
    // See: https://stackoverflow.com/questions/23892547/what-is-the-best-way-to-trigger-onchange-event-in-react-js
    function onChange(event: ChangeEvent<HTMLTextAreaElement>) {
        setComments(event.target.value);
    }

    const renderLabel = useCallback(name => (
            <Label hidden htmlFor={ name }>
                <TranslatedString id="shipping.order_comment_label" />
                <span>
                    <TranslatedString id="shipping.order_comment_label_limit" />
                </span>
            </Label>
        ),
        []
    );

    const renderInput = useCallback(({ field }: FieldProps) => (
        <TextArea
            { ...field }
            autoComplete={ 'off' }
            maxLength={ 70 }
            onChange={ onChange }
            rows={ 2 }
            value={ comments }
        />
    // eslint-disable-next-line react-hooks/exhaustive-deps
    ), [comments]);

    const renderHiddenField = useCallback(({ field }: FieldProps) => (
        <input
            { ...field }
            name="orderComment"
            type="hidden"
        />
    ), []);

    const legend = useMemo(
        () => (
            <Legend>
                <TranslatedString id="shipping.order_comment_label" />
            </Legend>
        ),
        []
    );

    return (
        <React.Fragment>
            <CheckboxInput
                checked={narrowRoad}
                id="narrow-road"
                label="My road has restricted access. Smaller vehicle advisable"
                name="narrow-road"
                onChange={(event) => setNarrowRoad(event.target.checked)}
                value="narrow-road"
            />

            <Fieldset legend={ legend } testId="checkout-shipping-comments">
                <FormField
                    input={ renderInput }
                    label={ renderLabel }
                    name="orderComments"
                />

                <FormField
                    input={ renderHiddenField }
                    // eslint-disable-next-line react/jsx-no-bind
                    label={ () => null }
                    name="orderComment"
                />
            </Fieldset>
        </React.Fragment>
    );
};

export default OrderComments;
