import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import Home from './Home';
import AuthCallback from './AuthCallback';
import Incidents from './Incidents';
import Header from './Header';
import Authenticator from './Authenticator';
import Unauthorized from './Unauthorized';
import Authorizing from './Authorizing';

import { useAuth } from '../context/auth-context';

import './App.sass';

const App = () => {

  const { authState, signIn } = useAuth();

  useEffect(() => {
    signIn();
  }, []);

  const PrivateRoute = ({ component: Component, ...rest }) => {
    return <Route 
      {...rest} 
      render={props => authState.loading
        ? <Authorizing />
        : authState.authenticated 
          ? <Component {...props} /> 
          : <Unauthorized />
      }
    />;
  };

  return (
    <Router>
      <div>
        <Header />

        <Route path="/" exact component={Home} />
        <PrivateRoute path="/incidents" component={Incidents} />
        <Route exact path="/auth/callback" component={AuthCallback} />
      </div>
    </Router>
  );
};

export default App;
