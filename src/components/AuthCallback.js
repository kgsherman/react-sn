import React, { useEffect } from 'react';

import { oauth2Callback } from '../utils/auth';

const AuthCallback = () => {

    useEffect(() => {
        (async () => {
            await oauth2Callback(window.location);
            const savedUrl = window.sessionStorage.getItem('savedUrl') || '/';
            window.location = savedUrl;
        })();
    }, []);
    
    return (
        <div>
            <h1>Redirecting...</h1>
        </div>
    );
}

export default AuthCallback;