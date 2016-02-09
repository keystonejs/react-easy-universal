import test from 'tape';
import express from 'express';

import React from 'react';
import universal from '../../server';

import routes from '../fixtures/routes';
import reducers from '../fixtures/reducers';

test('Helpful errors', nest => {
  nest.test('...with all params', assert => {
    const msg = 'should not throw when all required params are supplied';
    const app = express();

    try {
      universal({ React, app, routes, reducers });
      assert.pass(msg);
      assert.end();
    } catch (err) {
      assert.fail(msg);
      assert.end();
    }
  });

  ['React', 'routes', 'reducers'].forEach((param) => {
    nest.test(`...missing ${ param }`, assert => {
      const msg = `should throw when missing required ${ param } param`;
      const app = express();
      const options = {
        app,
        React: param === 'React' ? undefined : React,
        routes: param === 'routes' ? undefined : routes,
        reducers: param === 'reducers' ? undefined : reducers
      };

      try {
        universal(options);
        assert.fail(msg);
        assert.end();
      } catch (err) {
        assert.pass(msg);
        assert.end();
      }
    });
  });
});


test('Express app', assert => {
  const msg = 'should pass through the same express app instance';
  const app = express();

  const actual = universal({ React, app, routes, reducers });
  const expected = app;

  assert.equal(actual, expected, msg);
  assert.end();
});
