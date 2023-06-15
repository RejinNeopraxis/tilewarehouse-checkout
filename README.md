# Checkout JS

Checkout JS is a browser-based application providing a seamless UI for BigCommerce shoppers to complete their checkout. It is also known as [Optimized One-Page Checkout](https://support.bigcommerce.com/s/article/Optimized-Single-Page-Checkout), which is currently the recommended checkout option for all BigCommerce stores.

## Requirements

In order to build from the source code, you must have the following set up in your development environment.

* Node >= v14.
* NPM >= v6.
* Unix-based operating system.

One of the simplest ways to install Node is using [NVM](https://github.com/nvm-sh/nvm#installation-and-update). You can follow their instructions to set up your environment if it is not already set up.

## Development

Once you have cloned the repository and set up your environment, you can start developing with it.

First, you have to pull in the dependencies required for the application.

```sh
npm ci
```

After that, you can make changes to the source code and run the following command to build it.

```sh
npm run build
```

If you are developing the application locally and want to build the source code in watch mode, you can run the following command:

```sh
npm run dev
```

If you want to create a prerelease (i.e.: `alpha`) for testing in the integration environment, you can run the following command:

```sh
npm run release:alpha
```

After that, you need to push the prerelease tag to your fork so it can be referenced remotely.


### Shipping Date Picker

The date picker utilises [React Date Picker](https://reactdatepicker.com/) for the core date picking functionality. The majority of the code for the datepicker sits inside the ```ShippingDatePicker``` folder with ```ShippingDatePicker.tsx``` being the primary file to work from. There are separate files for handling the rendering of individual days and the date picker header but that's mostly for code organisation's sake.

Minimum available delivery dates will be provided by the integration layer, and the holiday dates are provided by the UK Governments Bank Holiday API. Currently the date picker is allowing up to 12 weeks in advance, this hasn't been defined by Topps as of right now.

### Global State Management

Any custom global state is being defined within ```use-custom-global-state.ts```, which uses [Zustand](https://github.com/pmndrs/zustand) for state management. It's essentially a lighter version of something like Redux. This is to minimise the need for us to interact with the default checkout state and avoid any unintended side effects. You can optionally use a selector for performance/efficiency.

To use the state within function components you can import the hook directly:
```tsx
import useCustomGlobalState from '/path/to/use-custom-global-state';

const Component = () => {
    const state = useCustomGlobalState();
    const partialState = useCustomGlobalState((state) => state.property);
    return ...
}
```

To use the state within a class component you need to use the ```withCustomGlobalState``` higher order component:

```tsx
import withCustomGlobalState from './path/to/withCustomGlobalState';

class MyComponent extends React.Component<CustomGlobalStateStore, {}> {
   render() {
       const { customGlobalState } = this.props;
       return ...
   }
}

export default withCustomGlobalState(MyComponent);
// or...
export default withCustomGlobalState(MyComponent, (state) => state.property);
```

## GraphQL

GraphQL has been added to the checkout via [urql](https://formidable.com/open-source/urql/docs/) which is a light-weight GraphQL client. For function components you can import its ```useQuery``` hook, and for class components you can import the GraphQL client directly from ```client.ts```. ```useQuery``` works by wrapping the app in a Provider component that urql exports.

```tsx
import { Provider as GraphQLProvider } from 'urql';
import client from '/path/to/client';

class CheckoutApp extends Component {
    ...
    render() {
        return (
            <GraphQLProvider value={client}>
                {children}
            </GraphQLProvider>
        );
    }
}

## Custom Checkout installation

Follow [this guide](https://developer.bigcommerce.com/stencil-docs/customizing-checkout/installing-custom-checkouts) for instructions on how to fork and install this app as a Custom Checkout in your store.

If you want to test your checkout implementation, you can run:
```sh
npm run dev:server
```

And enter the local URL for `auto-loader-dev.js` in Checkout Settings, e.g `http://127.0.0.1:8080/auto-loader-dev.js`

## Release

Everytime a PR is merged to the master branch, CircleCI will trigger a build automatically. However, it won't create a new Git release until it is approved by a person with write access to the repository. If you have write access, you can approve a release job by going to [CircleCI](https://circleci.com/gh/bigcommerce/workflows/checkout-js/tree/master) and look for the job you wish to approve. You can also navigate directly to the release job by clicking on the yellow dot next to the merged commit.


## Contribution

We currently do not accept Pull Requests from external parties. However, if you are an external party and want to report a bug or provide your feedback, you are more than welcome to raise a GitHub Issue. We will attend to these issues as quickly as we can.

More information can be found in the [contribution guide](CONTRIBUTING.md) and [code of conduct](CODE_OF_CONDUCT.md) for this project.


Copyright (C) 2019-Present BigCommerce Inc. All rights reserved.
