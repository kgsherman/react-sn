import React, { useEffect } from 'react';

import { useAuthValue } from '../context/auth-context';

import { oauth2Callback } from '../utils/auth';
import { test } from '../utils/sn';

const AuthCallback = () => {
    const { authToken, setAuthToken } = useAuthValue();

    const setToken = async () => {
        const token = await oauth2Callback(window.location);
        setAuthToken(token.accessToken);
    };

    useEffect(() => {
        setToken();
        console.log(test());
    }, []);
    
    return (
        <div>
            <h1>Auth callback</h1>
            <code>
                {JSON.stringify(authToken, null, 2)}
            </code>
        </div>
    );
}

export default AuthCallback;