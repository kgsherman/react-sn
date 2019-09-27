import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import * as serviceWorker from './serviceWorker';

import { AuthProvider } from './context/auth-context';
import { SNAPIProvider } from './context/snapi-context';
import { AvatarProvider } from './context/avatar-context';

ReactDOM.render(
  <AuthProvider>
    <SNAPIProvider>
      <AvatarProvider>
        <App />
      </AvatarProvider>
    </SNAPIProvider>
  </AuthProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
