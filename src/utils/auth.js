import ClientOAuth2 from 'client-oauth2';

import { useAuthValue } from '../context/auth-context';

import { getAuthenticatedUser } from '../utils/sn';

const auth = new ClientOAuth2({
  clientId: '708e03d320033300941bb03db73a7eff',
  clientSecret: 'Nl;Uz,&Hh]',
  accessTokenUri: 'https://dev72041.service-now.com/oauth_token.do',
  authorizationUri: 'https://dev72041.service-now.com/oauth_auth.do',
  redirectUri: 'http://localhost:3000/auth/callback',
  state: 'keyboard-cat'
});

export const oauth2Callback = async uri => {
  try {
    const token = await auth.token.getToken(uri);
    window.localStorage.setItem('token', token.accessToken);

    return true;
  } catch (e) {
    console.error(e);
    return false;
  }
};

export const signOut = () => {
  window.localStorage.removeItem('token');
}
/*
export const refreshAuthentication = async () => {
  const [{ authenticated, user }, dispatch] = useAuthValue();

  const userData = await getAuthenticatedUser();
  if (userData) {
    dispatch({
      type: 'signIn',
      user: userData
    });
  } else {
    dispatch({ type: 'signOut' });
  }
};
*/

export const oauth2Uri = auth.token.getUri();
