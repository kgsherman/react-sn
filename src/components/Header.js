import React from 'react';
import styled from 'styled-components';

import { useAuth } from '../context/auth-context';

import { oauth2Uri } from '../utils/auth';

const HeaderElement = styled.div`
  color: White;
  background-color: #16697A;
  padding: 1.4em;
  border-bottom-width: 4px;
  border-bottom-style: solid;
  border-bottom-color: #82C0CC;
  box-shadow: 0px 3px 3px 0 rgba(0, 0, 0, 0.25);
`;

const Header = (props) => {
  const { signOut, authState } = useAuth();

  const handleSignIn = e => {
    e.preventDefault();
    console.log(oauth2Uri);
    alert(oauth2Uri);

    window.sessionStorage.setItem('savedUrl', window.location.pathname);
    window.location = oauth2Uri;
  };

  const handleSignOut = e => {
    e.preventDefault();
    signOut();
  };

  const renderLoading = () => (
    <div className="level-item">
      ...
    </div>
  );

  const renderSignedIn = () => (
    <>
      <span className="level-item">{authState.user.name}</span>
      <button className="level-item button is-small" onClick={handleSignOut}>
        Sign out
      </button>
    </>
  );

  const renderSignedOut = () => (
    <div className="level-item">
      <button onClick={handleSignIn}>Sign in</button>
    </div>
  );

  return (
    <HeaderElement className="level">
      <div className="level-left">
        <p className="level-item">
          React-SN
        </p>
      </div>
      <div className="level-right">
        {authState.loading 
          ? renderLoading() 
          : authState.authenticated 
            ? renderSignedIn() 
            : renderSignedOut()
        }
      </div>
    </HeaderElement>
  );
};

export default Header;
