/* eslint-disable global-require */

import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { CodeSplitProvider, rehydrateState } from 'code-split-component';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import ApolloClient, { createNetworkInterface } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import configureStore from '../shared/redux/configureStore';

import ReactHotLoader from './components/ReactHotLoader';
import DemoApp from '../shared/components/DemoApp';

import LocaleProvider from 'antd/lib/locale-provider';
import en_US from 'antd/lib/locale-provider/en_US';

// Create the apollo graphql client.
const apolloClient = new ApolloClient({
  reduxRootSelector: state => state.apollo,
  networkInterface: createNetworkInterface({
    uri: `https://pyfjbt1w7f.execute-api.eu-west-2.amazonaws.com/production/graphql`,
    opts: {
      credentials: 'same-origin',
    },
  }),
});

// Create our Redux store.
const store = configureStore(
  apolloClient,
  // Server side rendering would have mounted our state on this global.
  // eslint-disable-next-line no-underscore-dangle
  window.__APP_STATE__,
);

// Get the DOM Element that will host our React application.
const container = document.querySelector('#app');

function renderApp(TheApp) {
  // We use the code-split-component library to provide us with code splitting
  // within our application.  This library supports server rendered applications,
  // but for server rendered applications it requires that we rehydrate any
  // code split modules that may have been rendered for a request.  We use
  // the provided helper and then pass the result to the CodeSplitProvider
  // instance which takes care of the rest for us.  This is really important
  // to do as it will ensure that our React checksum for the client will match
  // the content returned by the server.
  // @see https://github.com/ctrlplusb/code-split-component
  rehydrateState().then(codeSplitState =>
    render(
      <ReactHotLoader>
        <CodeSplitProvider state={codeSplitState}>
          <ApolloProvider store={store} client={apolloClient}>
            <BrowserRouter>
              <LocaleProvider locale={en_US}>
                <TheApp />
              </LocaleProvider>
            </BrowserRouter>
          </ApolloProvider>
        </CodeSplitProvider>
      </ReactHotLoader>,
      container,
    ),
  );
}

// The following is needed so that we can support hot reloading our application.
if (process.env.NODE_ENV === 'development' && module.hot) {
  // Accept changes to this file for hot reloading.
  module.hot.accept('./index.js');
  // Any changes to our App will cause a hotload re-render.
  module.hot.accept(
    '../shared/components/DemoApp',
    () => renderApp(require('../shared/components/DemoApp').default),
  );
}

// Execute the first render of our app.
renderApp(DemoApp);

// This registers our service worker for asset caching and offline support.
// Keep this as the last item, just in case the code execution failed (thanks
// to react-boilerplate for that tip.)
require('./registerServiceWorker');
