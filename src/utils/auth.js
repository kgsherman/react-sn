import ClientOAuth2 from 'client-oauth2';

import { useAuthValue } from '../context/auth-context';

const auth = new ClientOAuth2({
  clientId: '708e03d320033300941bb03db73a7eff',
  clientSecret: 'Nl;Uz,&Hh]',
  accessTokenUri: 'https://dev72041.service-now.com/oauth_token.do',
  authorizationUri: 'https://dev72041.service-now.com/oauth_auth.do',
  redirectUri: 'http://localhost:3000/auth/callback',
  state: 'keyboard-cat'
});

export const oauth2Callback = async uri => {
  const token = await auth.token.getToken(uri);
  return token;
};

export const oauth2Uri = auth.token.getUri();
