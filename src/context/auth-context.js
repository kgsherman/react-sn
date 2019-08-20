import React, { createContext, useContext, useReducer } from 'react';

import { signOut } from '../utils/auth';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const initialState = {
    authenticated: false,
    user: null
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case 'signIn':
        return {
          authenticated: true,
          user: action.user
        };
      case 'signOut':
        signOut();
        return {
          authenticated: false,
          user: null
        };
      default:
        return state;
    }
  };

  return <AuthContext.Provider value={useReducer(reducer, initialState)}>{children}</AuthContext.Provider>;
};

export const useAuthValue = () => useContext(AuthContext);
