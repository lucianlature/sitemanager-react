
import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import ApolloClient, { createNetworkInterface } from 'apollo-client';
import { ApolloProvider, getDataFromTree } from 'react-apollo';
import { CodeSplitProvider, createRenderContext } from 'code-split-component';
import Helmet from 'react-helmet';
import LocaleProvider from 'antd/lib/locale-provider';
import en_US from 'antd/lib/locale-provider/en_US';

import generateHTML from './generateHTML';
import DemoApp from '../../../shared/components/DemoApp';
import configureStore from '../../../shared/redux/configureStore';
import config from '../../../../config';

/**
 * An express middleware that is capabable of service our React application,
 * supporting server side rendering of the application.
 */
function reactApplicationMiddleware(request, response) {
  // We should have had a nonce provided to us.  See the server/index.js for
  // more information on what this is.
  if (typeof response.locals.nonce !== 'string') {
    throw new Error('A "nonce" value has not been attached to the response');
  }
  const nonce = response.locals.nonce;

  // It's possible to disable SSR, which can be useful in development mode.
  // In this case traditional client side only rendering will occur.
  if (config.disableSSR) {
    if (process.env.NODE_ENV === 'development') {
      // eslint-disable-next-line no-console
      console.log('==> Handling react route without SSR');
    }
    // SSR is disabled so we will just return an empty html page and will
    // rely on the client to initialize and render the react application.
    const html = generateHTML({
      // Nonce which allows us to safely declare inline scripts.
      nonce,
    });
    response.status(200).send(html);
    return;
  }

  // Create our apollo client.
  const apolloClient = new ApolloClient({
    ssrMode: true,
    // Remember that this is the interface the SSR server will use to connect to the
    // API server, so we need to ensure it isn't firewalled, etc
    networkInterface: createNetworkInterface({
      uri: `https://${config.host}:${config.port}/graphql`,
      opts: {
        credentials: 'same-origin',
        // transfer request headers to networkInterface so that they're accessible to proxy server
        // Addresses this issue: https://github.com/matthew-andrews/isomorphic-fetch/issues/83
        headers: request.headers,
      },
    }),
  })

  // Create the redux store.
  const store = configureStore(apolloClient)

  // First create a context for <StaticRouter>, which will allow us to
  // query for the results of the render.
  const reactRouterContext = {}

  // We also create a context for our <CodeSplitProvider> which will allow us
  // to query which chunks/modules were used during the render process.
  const codeSplitContext = createRenderContext();

  // Create our React application and render it into a string.
  const reactAppElement = (
    <CodeSplitProvider context={codeSplitContext}>
      <StaticRouter location={request.url} context={reactRouterContext}>
        <ApolloProvider store={store} client={apolloClient}>
          <LocaleProvider locale={en_US}>
            <DemoApp />
          </LocaleProvider>
        </ApolloProvider>
      </StaticRouter>
    </CodeSplitProvider>
  )

   // First we load all the required data for our components using Apollo.
  getDataFromTree(reactAppElement).then(() => {
    // Generate the html response.
    const html = generateHTML({
      // Provide the rendered React application as a string.
      reactAppString: renderToString(reactAppElement),
      // Nonce which allows us to safely declare inline scripts.
      nonce,
      // Running this gets all the helmet properties (e.g. headers/scripts/title etc)
      // that need to be included within our html.  It's based on the rendered app.
      // @see https://github.com/nfl/react-helmet
      helmet: Helmet.rewind(),
      // We provide our code split state so that it can be included within the
      // html, and then the client bundle can use this data to know which chunks/
      // modules need to be rehydrated prior to the application being rendered.
      codeSplitState: codeSplitContext.getState(),
      // The initial Apollo/Redux state.
      initialState: apolloClient.store.getState(),
    });

    // Get the render result from the server render context.
    // const renderResult = reactRouterContext.getResult();

    // Check if the render result contains a redirect, if so we need to set
    // the specific status and redirect header and end the response.
    if (reactRouterContext.url) {
      response.writeHead(302).setHeader('Location', reactRouterContext.url);
      response.end();
      return;
    }

    response.status(200).send(html);
  }).catch((err) => {
    // TODO: Make this nicer.
    response.status(500).send('Unfortunately a problem occurred.');
    if (err) {
      console.error(err);
    }
  });
}

export default (reactApplicationMiddleware);
