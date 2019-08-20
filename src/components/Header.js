import React from 'react';

import { useAuthValue } from '../context/auth-context';

import { oauth2Uri } from '../utils/auth';

const Header = () => {
  const [{ authenticated, user }, dispatch] = useAuthValue();

  const handleSignOut = () => {
    dispatch({ type: 'signOut' });
  };

  const renderSignedIn = () => (
    <div>
      <span>Hello, {user.name}</span>
      <a href="#" onClick={handleSignOut}>
        Sign out
      </a>
    </div>
  );

  const renderSignedOut = () => (
    <div>
      <a href={oauth2Uri}>Sign in</a>
    </div>
  );

  return authenticated ? renderSignedIn() : renderSignedOut();
};

export default Header;
