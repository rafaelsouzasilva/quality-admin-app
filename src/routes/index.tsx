import React from 'react';
import { Route as RouteDom, BrowserRouter, Switch } from 'react-router-dom';
import Route from './PrivateRoute';

import Login from '../pages/Login';
import Home from '../pages/Home';

import * as QualityControl from '../pages/QualityControl';

const Routes: React.FC = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/qualityControl/:id" component={QualityControl.Details} />
      <Route path="/qualityControl" exact component={QualityControl.List} />

      <RouteDom path="/login" component={Login} />
      <Route path="/" exact component={Home} />

      <Route path="/" component={() => <h1>404 - Not Found</h1>} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
