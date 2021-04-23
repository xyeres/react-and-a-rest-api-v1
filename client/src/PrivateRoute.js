import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { Consumer } from './Context';

/**
  * A HOC that wraps a component in a simple ternary switch,
  * if they are logged in, send them to their page
  * Other wise route them to the signin page and save in state the current location
  * so that we can forward them on after they auth
*/
export default function PrivateRoute ({ component: Component, ...rest }) {
  return (
    <Consumer>
      {context => (
        <Route
          {...rest}
          render={props => context.authenticatedUser ? (
              <Component {...props} />
            ) : (
              <Redirect to={{
                pathname: '/signin',
                state: { from: props.location }
              }} />
            )
          }
        />
    )}
    </Consumer>
  );
};