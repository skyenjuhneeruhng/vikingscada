import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { createEpicMiddleware } from 'redux-observable';
import { routerMiddleware } from 'react-router-redux';

import reducers from './containers/reducers';
import rootEpic from './containers/epics';


export default function configureStore(initialState = {}, history) {
  const epicMiddleware = createEpicMiddleware(rootEpic);

  const middleware = process.env.isProd ? [
    thunk,
    routerMiddleware(history),
    epicMiddleware
  ] : [
    thunk,
    routerMiddleware(history),
    createLogger(),
    epicMiddleware
  ];

  const store = createStore(
    reducers,
    initialState,
    compose(applyMiddleware(...middleware))
  );

  return store;
}
