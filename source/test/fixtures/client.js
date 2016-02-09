import React from 'react';
import universal from '../../client';

import routes from './routes';
import reducers from './reducers';

// returns a function that must be invoked to trigger render
const app = universal({ React, routes, reducers });

// The app function will return your store so you can dispatch actions.
const store = app();

// Do stuff in your client app to trigger re-renders.
// e.g., subscribe to server updates, etc...
store.dispatch({
  type: 'SET_TITLE',
  title: 'Client render'
});
