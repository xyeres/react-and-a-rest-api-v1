import React, {useContext, useEffect} from 'react';
import { Redirect } from 'react-router-dom';
import { Context } from '../Context';

/**
  * Sign a user out and redirect them to the root route
*/
export default function UserSignOut() {
  const context = useContext(Context);
  useEffect(() =>  context.actions.signOut());
  return (
    <Redirect to="/" />
  );
}
