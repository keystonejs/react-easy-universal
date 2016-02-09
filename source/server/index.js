import createHandler from './create-server-app';

import checkInputs from '../shared/check-inputs';

// universal({ React, app?, routes, reducers });
const universal = ({ React, app, routes, reducers }) => {
  checkInputs({ React, app, routes, reducers });

  if (app) {
    const requestHandler = createHandler({ React, app, createRoutes: routes, reducers });

    app.use('/', requestHandler);

    return app;
  }
};

export default universal;
