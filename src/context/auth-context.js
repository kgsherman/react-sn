import React, { createContext, useContext, useReducer } from 'react';

import { getAuthenticatedUser } from '../utils/sn';

const initialState = {
  loading: true,
  authenticated: false,
  user: null
};

export const AuthContext = createContext(initialState);

const reducer = (state, action) => {
  switch (action.type) {
    case 'loading':
      return {
        ...state,
        loading: true,
      }
    case 'signIn':
      return {
        loading: false,
        authenticated: true,
        user: action.user
      };
    case 'signOut':
      return {
        loading: false,
        authenticated: false,
        user: null
      };
    default:
      return state;
  }
};

export const AuthProvider = ({ children }) => {

  const [authState, dispatch] = useReducer(reducer, initialState);

  const signIn = async () => {
    dispatch({ type: 'loading' });
    const userData = await getAuthenticatedUser();
    if (userData) {
      dispatch({
        type: 'signIn',
        user: userData.result
      });
    } else {
      dispatch({ type: 'signOut' });
    }
  }

  const signOut = () => {
    dispatch({ type: 'signOut' });
    window.localStorage.removeItem('token');
  }


  return <AuthContext.Provider value={{ signIn, signOut, authState }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
