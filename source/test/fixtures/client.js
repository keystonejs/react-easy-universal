import React from 'react';
import createApp from './create-app.js';

// returns a function that must be invoked to trigger render
const app = createApp({ React }); // use all the defaults

export default app;