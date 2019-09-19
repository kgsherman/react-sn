/*import React, { useEffect } from 'react';

import { useAuthValue } from '../context/auth-context';

import { refreshAuthentication } from '../utils/auth';
import { getAuthenticatedUser } from '../utils/sn';

const Authenticator = () => {
    const [{ authenticated, user, loading }, dispatch] = useAuthValue();

    const refreshAuthentication = async () => {
        console.log('Refreshing authentication.');
        dispatch({ type: 'loading' });
        console.log('finished dispatch')

        const userData = await getAuthenticatedUser();

        if (userData) {
            console.log('User data', userData);
            dispatch({
                type: 'signIn',
                user: userData.result
            });
        } else {
            dispatch({ type: 'signOut' });
        }
    }
    useEffect(() => {
        refreshAuthentication();
    }, []);

    return <div></div>;
}

export default Authenticator;*/