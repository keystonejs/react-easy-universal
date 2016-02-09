import checkInputs from '../shared/check-inputs';
import createClientApp from './create-client-app';

// universal({ React, app?, routes, reducers });
const universal = ({ React, app, routes, reducers }) => {
  checkInputs({ React, app, routes, reducers });

  // Client case. Plug in browserHistory, etc...
  return createClientApp({ React, createRoutes: routes, reducers });
};

export default universal;
