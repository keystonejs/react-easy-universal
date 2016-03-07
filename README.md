# React Easy Universal

Universal Routing & Rendering with React & Redux was too hard. Now it's easy.

## Status

Proof of concept. Needs testing. Kick the tires.


## What's included?

* [Redux](https://github.com/rackt/redux)
* [React Router](https://github.com/rackt/react-router)
* Automatic syncing between Redux and React Router via [react-router-redux](https://github.com/rackt/react-router-redux)
* [History](https://github.com/rackt/history)
* Debugging support

## Getting Started

You'll need to create two files:

`client.js`:

```js
import React from 'react';

// Note: There are two versions of the client: bundled and source.
// If you want to build from source, try `react-easy-universal/client-src`.
import universal from 'react-easy-universal/client-bundled';
import routes from './path/to/routes';
import reducers from './path/to/reducers';
import reduxMiddleware from './path/to/midleware';

// returns a function that must be invoked to trigger render
const app = universal({ React, routes, reducers, reduxMiddleware });

// The app function will return your store so you can dispatch actions.
const store = app();

// Do stuff in your client app to trigger re-renders.
// e.g., subscribe to server updates, etc...
store.dispatch({
  type: 'SET_TITLE',
  title: 'Client render'
});
```


`server.js`:

```js
import express from 'express';
import React from 'react';
import universal from 'react-easy-universal/server';

import routes from './path/to/routes';
import reducers from './path/to/reducers';
import reduxMiddleware from './path/to/midleware';

// returns the express app
const app = universal({ React, routes, reducers, reduxMiddleware, app: express() });

app.use('/static', express.static(staticDir));

const port = process.env.APP_PORT || 3000;

app.listen(port, (err) => {
  if (err) {
    console.log(err);
    return;
  }

  console.log(`Listening at http://localhost:${ port }`);
});
```

Note: There is nothing exported from `react-easy-universal` by default. You must
use one of the client or the server. They are two different builds in order to
save on client download time.


### Defining Your Routes

Use this module instead of depending directly on React Router, and we'll worry about keeping all the version dependencies compatible and in-sync for you.

```js
import { Router, Route } from 'react-easy-universal/route-helpers';

import createHome from 'shared/components/home';
import createTestData from 'shared/components/test-data';

// It expects a factory function that it can inject dependencies into.
export default (React) => {

  return (
    <Router>
      <Route path="/" component={ createHome(React) } />
      <Route path="/test-data" component={ createTestData(React) } />
    </Router>
  );
};
```


## Why is this needed? (AKA, the old `n` busted way)

Universal routing & rendering with React and Redux is pretty great. For serious app projects, it can save you a ton of time, but if you have ever tried configuring it yourself, you'll know, it's a lot harder than it should be. Just to give you an idea of how complicated it can be, here's the example from `redux-simple-router`, which is AFAIK, the easiest way to configure this stuff right now:

```js
import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { Router, Route, browserHistory } from 'react-router'
import { syncHistory, routeReducer } from 'redux-simple-router'
import reducers from '<project-path>/reducers'

const reducer = combineReducers(Object.assign({}, reducers, {
  routing: routeReducer
}))

// Sync dispatched route actions to the history
const reduxRouterMiddleware = syncHistory(browserHistory)
const createStoreWithMiddleware = applyMiddleware(reduxRouterMiddleware)(createStore)

const store = createStoreWithMiddleware(reducer)

// Required for replaying actions from devtools to work
reduxRouterMiddleware.listenForReplays(store)

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <Route path="foo" component={Foo}/>
        <Route path="bar" component={Bar}/>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('mount')
)
```

That's six dependencies that you have to manage in your own app, and good luck getting all the right versions that will play together nicely. And this is just the client side. The code above doesn't work on the server. To get that going, you'll have to create an Express route handler that manually calls `match()` from `react-router`, checks for errors & redirects, and maybe renders the document. It looks something like this:


```js
import React from 'react';
import { match } from 'react-router';

import renderLayout from 'server/render-layout';
import render from 'server/render';
import settings from 'server/settings';

import configureStore from 'shared/configure-store';
import createRoutes from 'shared/routes';

const store = configureStore();
const routes = createRoutes(React);
const initialState = store.getState();

export default (req, res) => {
  match({ routes, location: req.url }, (error, redirectLocation, renderProps) => {
    if (error) {
      res.status(500).send(error.message);
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search);
    } else if (renderProps) {
      const rootMarkup = render(React)(renderProps, store);
      res.status(200).send(renderLayout({ settings, rootMarkup, initialState }));
    } else {
      res.status(404).send('Not found');
    }
  });
};
```

There are a few other files you need to wire up that I won't list, for brevity's sake.

It took me two days to get these examples working in one of my own projects. 2 days of fiddling with dependencies, copying the exact versions out of the example repositories and into my `package.json`. These projects are evolving quickly, and the documentation examples can't be relied on to work.

So, you could keep track of all these dependency versions yourself (and they're all being rapidly updated) -- or, you could use this library, plug in your routes & reducers, and get on with building an actual application instead of chasing all the moving parts around.


## Advanced Configuration (note: unfinished)

Need to customize layouts, the root React Node, the root route, and so on? No problem. Just make your `wire-app.js` factory configurable:

```js
import universal from 'react-easy-universal';

import routes from './path/to/your/routes';
import reducers from './path/to/your/reducers';

const wireApp = ({
  React, app,
  rootID, // default: 'root'
  rootRoute, // default: '/'
  renderLayout // Skeleton DOM render template for the server-side. Default: Barebones ES6 template
}) => universal({
  React, app,
  routes, reducers,
  rootId, rootRoute, renderLayout
});

export default wireApp;
```

## Contributing

There are some handy scripts for contributors, if you'd like to pitch in:

### Dev console

There's a dev console available that will show you any lint errors or test failures on file saves:

```sh
npm run watch
```

### Debugging

To run the debugger, first, make sure it's installed:

```sh
npm install -g iron-node
```

Then:

```
npm run debug:test
```
