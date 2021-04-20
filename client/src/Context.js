import React, { Component } from 'react';
import Cookies from 'js-cookie';
import { useHistory } from 'react-router-dom'

export const Context = React.createContext();

export class Provider extends Component {
    constructor() {
      super();
    }
  
    state = {
      authenticatedUser: Cookies.getJSON('authenticatedUser') || null
    };
    
    render() {
      const { authenticatedUser } = this.state;
  
      const value = {
        authenticatedUser,
        actions: { // Add the 'actions' property and object
          signIn: this.signIn,
          signOut: this.signOut,
          handleCancel: this.handleCancel
        }
      };
  
      return (
        <Context.Provider value={value}>
          {this.props.children}
        </Context.Provider>
      );
    }
  
    signIn = async (username, password) => {
      const user = await this.data.getUser(username, password);
      if (user !== null) {
        this.setState(() => {
          return {
            authenticatedUser: user,
          };
        });
        Cookies.set('authenticatedUser', JSON.stringify(user), { expires: 1 });
  
      }
      return user;
    }
  
    signOut = () => {
      this.setState({ authenticatedUser: null });
      Cookies.remove('authenticatedUser');
    }
  }