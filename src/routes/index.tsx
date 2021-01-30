import React from 'react';
import { Route as RouteDom, BrowserRouter, Switch } from 'react-router-dom';
import Route from './PrivateRoute';

import Login from '../pages/Login';
import Home from '../pages/Home';

import * as QualityControl from '../pages/QualityControl';
import * as NonCompliance from '../pages/NonCompliance';

const Routes: React.FC = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/qualityControl/:idQualityControl/nonCompliance" component={NonCompliance.Form} />
      <Route path="/qualityControl/:id" component={QualityControl.Details} />
      <Route path="/qualityControl" exact component={QualityControl.List} />

      <Route path="/nonCompliance/create" component={NonCompliance.Form} />
      <Route path="/nonCompliance/edit/:id" component={NonCompliance.Form} />
      <Route path="/nonCompliance/:id" component={NonCompliance.Details} />
      <Route path="/nonCompliance" exact component={NonCompliance.List} />
      
      <RouteDom path="/login" component={Login} />
      <Route path="/" exact component={Home} />

      <Route path="/" component={() => <h1>404 - Not Found</h1>} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
