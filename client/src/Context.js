import React, { Component } from 'react';
import Cookies from 'js-cookie';
import Data from './Data';

export const Context = React.createContext();

export class Provider extends Component {
  constructor() {
    super();
    // Add our Data class API helper class to extend custom API calls
    this.data = new Data();
  }

  state = {
    authenticatedUser: Cookies.getJSON('authenticatedUser') || null
  };

  render() {
    const { authenticatedUser } = this.state;

    // Set value for provider, this object is accessible site wide via Context API
    const value = {
      authenticatedUser,
      data: this.data,
      actions: {
        signIn: this.signIn,
        signOut: this.signOut
      }
    };

    return (
      <Context.Provider value={value}>
        {this.props.children}
      </Context.Provider>
    );
  }

  /*
    Helper functions to Sign in, Sign Out users
  */
  signIn = async (emailAddress, password) => {
    const user = await this.data.getUser(emailAddress, password);
    user['password'] = password;
    
    if (user !== null) {
      this.setState(() => {
        return {
          authenticatedUser: user,
        };
      });
      Cookies.set('authenticatedUser', JSON.stringify(user), { expires: 1, sameSite: false, secure: false });
    }
    return user;
  }

  signOut = () => {
    this.setState({ authenticatedUser: null });
    Cookies.remove('authenticatedUser');
  }
}

export const Consumer = Context.Consumer;

/**
 * A higher-order component that wraps the provided component in a Context Consumer component.
 * @param {class} Component - A React component.
 * @returns {function} A higher-order component.
 */

export default function withContext(Component) {
  return function ContextComponent(props) {
    return (
      <Context.Consumer>
        {context => <Component {...props} context={context} />}
      </Context.Consumer>
    );
  }
}
