import ClientOAuth2 from 'client-oauth2';

const auth = new ClientOAuth2({
  clientId: '51bbb56c68000010909a1f6d7dd41ddf',
  //clientSecret: 'Nl;Uz,&Hh]',
  accessTokenUri: 'https://dev59227.service-now.com/oauth_token.do',
  authorizationUri: 'https://dev59227.service-now.com/oauth_auth.do',
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
  
};

export const oauth2Uri = auth.token.getUri();
