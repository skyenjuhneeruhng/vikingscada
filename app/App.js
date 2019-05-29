import React from 'react';
import { Switch, Route } from 'react-router-dom';
import shortid from 'shortid';

import routes from './routes';

const App = () => (
  <Switch>
    {routes.map((route) => (
      <Route key={shortid.generate()} {...route} />
    ))}
  </Switch>
);

export default App;
