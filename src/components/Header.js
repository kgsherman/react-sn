import React from 'react';

import { useAuthValue } from '../context/auth-context';

import { oauth2Uri } from '../utils/auth';

const Header = () => {
  const [{ authenticated, user }, dispatch] = useAuthValue();

  const handleSignIn = e => {
    e.preventDefault();
    window.sessionStorage.setItem('savedUrl', window.location);

    window.location = oauth2Uri;
  };

  const handleSignOut = e => {
    e.preventDefault();
    dispatch({ type: 'signOut' });
  };

  const renderSignedIn = () => (
    <div>
      <span>Hello, {user.name}</span>
      <button onClick={handleSignOut}>
        Sign out
      </button>
    </div>
  );

  const renderSignedOut = () => (
    <div>
      <button onClick={handleSignIn}>Sign in</button>
    </div>
  );

  return authenticated ? renderSignedIn() : renderSignedOut();
};

export default Header;
