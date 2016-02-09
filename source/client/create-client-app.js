import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import { Router, browserHistory } from 'react-router';
import configureStore from '../shared/configure-store';

const createClientApp = ({
    React, createRoutes, reducers, initialState = {}
  }) => {
  const routes = createRoutes({ React });

  const store = configureStore({
    initialState: window.BOOTSTRAP_CLIENT_STATE ?
      Object.assign({}, window.BOOTSTRAP_CLIENT_STATE, initialState) :
      undefined,
    reducers
  });

  return () => {

    ReactDOM.render(
      <Provider store={ store }>
        <Router routes={ routes } history={ browserHistory }/>
      </Provider>,
      document.getElementById('root')
    );

    return store;
  };
};

export default createClientApp;
