import React from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';

import { currentUser, AuthContext } from '../services/authentication.service';

type IProps = {
  component: React.ComponentType<any>;
} & RouteProps;

export const AuthRoute = ({ component: Component, ...rest }: IProps) => (
  <AuthContext.Consumer>
    {() => {
      return (
        <Route
          {...rest}
          render={(props) => {
            // const currentUser = currentUser;
            if (!currentUser()) {
              // not logged in so redirect to login page with the return url
              return (
                <Redirect
                  to={{ pathname: '/login', state: { from: props.location } }}
                />
              );
            }

            // authorised so return component
            return <Component {...props} />;
          }}
        />
      );
    }}
  </AuthContext.Consumer>
);
