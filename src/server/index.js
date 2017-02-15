/* eslint-disable no-console */

import 'isomorphic-fetch';
import express from 'express';
import spdy from 'spdy';
import fs from 'fs';
import compression from 'compression';
import { resolve as pathResolve } from 'path';
import appRootDir from 'app-root-dir';
// import bodyParser from 'body-parser';
// import { apolloExpress } from 'apollo-server';
import reactApplication from './middleware/reactApplication';
import security from './middleware/security';
import clientBundle from './middleware/clientBundle';
import serviceWorker from './middleware/serviceWorker';
import offlinePage from './middleware/offlinePage';
import errorHandlers from './middleware/errorHandlers';
import config from '../../config';

// Create our express based server.
const app = express();

// Don't expose any software information to potential hackers.
app.disable('x-powered-by');

// Security middlewares.
app.use(...security);

// Gzip compress the responses.
app.use(compression());

// When in production mode, we will serve our service worker which was generated
// by the offline-plugin webpack plugin. See the webpack plugins section for
// more information.
// Note: the service worker needs to be served from the http root of your
// application for it to work correctly.
if (process.env.NODE_ENV === 'production'
  && config.serviceWorker.enabled) {
  app.get(`/${config.serviceWorker.fileName}`, serviceWorker);
  app.get(
    `${config.bundles.client.webPath}${config.serviceWorker.offlinePageFileName}`,
    offlinePage,
  );
}

const httpsOptions = {
  cert: fs.readFileSync(pathResolve(appRootDir.get(), 'server.crt')),
  key: fs.readFileSync(pathResolve(appRootDir.get(), 'server.key')),
};

// Our apollo stack graphql server endpoints.
// app.use('/graphql', bodyParser.json(), apolloExpress({ schema: graphqlSchema }));

// Configure serving of our client bundle.
app.use(config.bundles.client.webPath, clientBundle);

// Configure static serving of our "public" root http path static files.
// Note: these will be served off the root (i.e. '/') of our application.
app.use(express.static(pathResolve(appRootDir.get(), config.publicAssetsPath)));

// The React application middleware.
app.get('*', reactApplication);

// Error Handler middlewares.
app.use(...errorHandlers);

// Create an http listener for our express app.
const listener = spdy.createServer(httpsOptions, app).listen(config.port, config.host, () =>
  console.log(`Server listening at ${config.host}:${config.port}`),
);

// We export the listener as it will be handy for our development hot reloader,
// or for exposing a general extension layer for application customisations.
export default listener;
