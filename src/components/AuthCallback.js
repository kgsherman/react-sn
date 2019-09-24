import React, { useEffect } from 'react';

import { useAuth } from '../context/auth-context';
import { useSNAPI } from '../context/snapi-context'
import { oauth2Callback } from '../utils/auth';

const AuthCallback = (props) => {
    const { signIn, signOut } = useAuth();
    const { refreshConnection } = useSNAPI();

    useEffect(() => {
        (async () => {
            const success = await oauth2Callback(window.location);
            if (success) {
                console.log('Token is saved in session.');
                refreshConnection();
                signIn();
            } else {
                console.log('Error saving token to session.');
                signOut();
            }
            
            const savedUrl = window.sessionStorage.getItem('savedUrl') || '/';
            window.sessionStorage.removeItem('savedUrl');
            props.history.push(savedUrl);
        })();
    }, []);
    
    return (
        <div>
            <h1>Redirecting...</h1>
        </div>
    );
}

export default AuthCallback;