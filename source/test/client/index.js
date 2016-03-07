import browserColor from 'tap-browser-color';
browserColor();
import test from 'tape';

import React from 'react';
import universal from '../../../client-bundled.js';

import routes from '../fixtures/routes';
import reducers from '../fixtures/reducers';

const app = universal({ React, routes, reducers });
const store = app();


test('Client app', nest => {
  nest.test('...without Express instance', assert => {
    const msg = 'should not return an Express instance';

    const actual = typeof app.use;
    const expected = 'undefined';

    assert.equal(actual, expected, msg);
    assert.end();
  });

  nest.test('...initalState', assert => {
    const msg = 'should render initialState';
    const text = 'Untitled';

    const actual = document.querySelectorAll('.title')[0].innerHTML;
    const expected = text;

    assert.equal(actual, expected, msg);
    assert.end();
  });

  nest.test('...client call', assert => {
    const msg = 'should return store instance';

    const actual = typeof store.dispatch;
    const expected = 'function';

    assert.equal(actual, expected, msg);
    assert.end();
  });


  nest.test('...with dispatch', assert => {
    const msg = 'should render new output';
    const text = 'Client render';

    store.dispatch({
      type: 'SET_TITLE',
      title: text
    });

    setTimeout(() => {
      const actual = document.querySelectorAll('.title')[0].innerHTML;
      const expected = text;

      assert.equal(actual, expected, msg);
      assert.end();
    }, 100);
  });

  nest.test('...with second dispatch', assert => {
    const msg = 'should render new output';
    const text = 'Client render 2';

    store.dispatch({
      type: 'SET_TITLE',
      title: text
    });

    setTimeout(() => {
      const actual = document.querySelectorAll('.title')[0].innerHTML;
      const expected = text;

      assert.equal(actual, expected, msg);
      assert.end();
    }, 100);
  });
});
