import React from 'react';
import { Route as RouteDom, BrowserRouter, Switch } from 'react-router-dom';
import Route from './PrivateRoute';

import Login from '../pages/Login';
import Home from '../pages/Home';

//import * as Area from '../pages/Area';
//<Route path="/area/create" component={Area.Form} />
//<Route path="/area/edit/:id" component={Area.Form} />
//<Route path="/area/:id" component={Area.Details} />
//<Route path="/area" exact component={Area.List} />

const Routes: React.FC = () => (
  <BrowserRouter>
    <Switch>
      <RouteDom path="/login" component={Login} />
      <Route path="/" exact component={Home} />

      <Route path="/" component={() => <h1>404 - Not Found</h1>} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
