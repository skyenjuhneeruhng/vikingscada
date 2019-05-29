import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import createBrowserHistory from 'history/createBrowserHistory';

import configureStore from './store';
import App from './App';
import NotificationList from './containers/NotificationGenerator/NotificationList';

import './../views/styles/styles.scss';

const initialState = {};
const history = createBrowserHistory();
const store = configureStore(initialState, history);

if (!('Notification' in window)) {
  alert('Your browser does not support HTML Notifications');
} else if (Notification.permission === 'default') {
  Notification.requestPermission().then((permission) => {
    if (permission === 'granted') {
      /* eslint-disable no-new */
      new Notification('Notification', {
        body: 'You\'re awesome!',
        icon: '/img/icon.png'
      });
    }
  });
}

ReactDOM.hydrate(
  (
    <Provider store={store}>
      <Router history={history}>
        <Fragment>
          <App />
          <NotificationList />
        </Fragment>
      </Router>
    </Provider>
  ),
  document.getElementById('app')
);
