import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import { AuthProvider } from '../context/auth-context';

import Home from './Home';
import AuthCallback from './AuthCallback';
import Incidents from './Incidents';
import Header from './Header';

import { oauth2Uri } from '../utils/auth';

const App = () => (
  <AuthProvider>
    <Router>
      <div>
        <Header />
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <a href={oauth2Uri}>Sign in</a>
            </li>
          </ul>
        </nav>

        <Route path="/" exact component={Home} />
        <Route path="/incidents" component={Incidents} />
        <Route path="/auth/callback" exact component={AuthCallback} />
      </div>
    </Router>
  </AuthProvider>
);

export default App;
