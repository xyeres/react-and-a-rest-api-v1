import React, {useContext, useEffect} from 'react';
import { Redirect } from 'react-router-dom';
import { Context } from '../Context';

export default () => {
  const context = useContext(Context);
  useEffect(() =>  context.actions.signOut());
  return (
    <Redirect to="/" />
  );
}
