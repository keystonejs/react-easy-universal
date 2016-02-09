import express from 'express';
import React from 'react';
import path from 'path';

import universal from '../../server';
import routes from './routes';
import reducers from './reducers';

const buildDir = '../../../build/';
const staticDir = path.join(__dirname, buildDir);

const server = express();
server.use('/static', express.static(staticDir));

// Passing in the express app lets it know you want the server
// version, and it wires up the route automatically
const app = universal({ React, app: server, routes, reducers });

export default app;
