import React from 'react';
import { Route, Redirect } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
function PrivateRoute({ children, ...rest }) {
  return (
    <Route
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...rest}
      // eslint-disable-next-line no-confusing-arrow
      render={
        // eslint-disable-next-line no-confusing-arrow
        () =>
          // eslint-disable-next-line implicit-arrow-linebreak
          localStorage.getItem('token') ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: '/login',
              }}
            />
          )
        // eslint-disable-next-line react/jsx-curly-newline
      }
    />
  );
}

export default PrivateRoute;
