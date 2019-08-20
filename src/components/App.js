import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import Home from './Home';
import AuthCallback from './AuthCallback';
import Incidents from './Incidents';
import Header from './Header';
import Authenticator from './Authenticator';
import Unauthorized from './Unauthorized';

import { useAuthValue } from '../context/auth-context';

const App = () => {
  const [{ authenticated }] = useAuthValue();

  const PrivateRoute = ({ component: Component, ...rest }) => {
    return <Route {...rest} render={props => authenticated ? <Component {...props} /> : <Unauthorized />} />;
  };

  return (
    <Router>
      <Authenticator />
      <div>
        <Header />
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/incidents">Incidents</Link>
            </li>
          </ul>
        </nav>

        <Route path="/" exact component={Home} />
        <PrivateRoute path="/incidents" component={Incidents} />
        <Route path="/auth/callback" exact component={AuthCallback} />
      </div>
    </Router>
  );
};

export default App;
