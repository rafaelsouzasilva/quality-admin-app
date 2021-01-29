import React from 'react';
import { Route } from 'react-router-dom';
import { Redirect } from './Redirect';
import { useAuth } from '../hooks/AuthContext';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const auth = useAuth();

  return (
    <Route
      {...rest}
      render={props => 
        auth.isAuthorized() ? <Component {...props} /> : <Redirect to="/login" /> 
      } />
  );
}

export default PrivateRoute;