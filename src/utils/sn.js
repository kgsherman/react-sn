import snapi from './snapi';

export const getAuthenticatedUser = async () => {
  const token = localStorage.getItem('token');
  const instance = 'dev72041';

  if (!token) return false;

  try {
    const sn = new snapi({ token, instance });
    const response = await sn.scriptedRestApi('api/146223/auth_check', 'GET', {
      headers: {
        Accept: 'application/json'
      }
    });

    if (!response.ok) {
        console.log('Response failed.', response.statusText)
        return false;
    }

    const json = await response.json();
    return json;
  } catch (e) {
    return false;
  }
};
