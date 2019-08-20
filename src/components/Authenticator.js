import React, { useEffect } from 'react';

import { useAuthValue } from '../context/auth-context';

import { refreshAuthentication } from '../utils/auth';
import { getAuthenticatedUser } from '../utils/sn';

const Authenticator = () => {
    const [{ authenticated, user }, dispatch] = useAuthValue();

    const refreshAuthentication = async () => {
        const userData = await getAuthenticatedUser();

        if (userData) {
            console.log('got user data', userData);
          dispatch({
            type: 'signIn',
            user: userData.result
          });
        } else {
            console.log('didnt get user data, signing out')
          dispatch({ type: 'signOut' });
        }
    }
    useEffect(() => {
        refreshAuthentication();
    }, []);

    return <div>authenticator</div>;
}

export default Authenticator;