/* eslint-disable import/no-internal-modules */
import * as React from 'react';
import { StateSelector } from 'zustand';

import useCustomGlobalState, {
    CustomGlobalState,
} from '../hooks/use-custom-global-state';

export interface CustomGlobalStateStore {
    customGlobalState?: CustomGlobalState;
}

const defaultSelector: StateSelector<CustomGlobalState, any> = (state) => state;

/**
 * Higher order component to inject our custom global state into a class component.
 * @example
 * import withCustomGlobalState from './path/to/withCustomGlobalState';
 * class MyComponent extends React.Component<CustomGlobalStateStore, {}> {
 *    render() {
 *        const { customGlobalState } = this.props;
 *        return ...
 *    }
 * }
 *
 * export default withCustomGlobalState(MyComponent);
 */
const withCustomGlobalState =
    <Props extends object>(
        Component:
            | React.FunctionComponent<Props>
            | React.ComponentClass<Props, any>,
        selector = defaultSelector
    ) =>
    (props: Props & CustomGlobalStateStore) => {
        const customGlobalState = useCustomGlobalState(selector);

        return <Component {...props} customGlobalState={customGlobalState} />;
    };

export default withCustomGlobalState;
