import React, { useEffect } from 'react';

import { useAuth } from '../context/auth-context';
import { oauth2Callback } from '../utils/auth';

const AuthCallback = (props) => {
    const { signIn, signOut } = useAuth();

    useEffect(() => {
        (async () => {
            const success = await oauth2Callback(window.location);
            if (success) {
                console.log('Token is saved in session.');
                signIn();
            } else {
                console.log('Error saving token to session.');
                signOut();
            }
            
            const savedUrl = window.sessionStorage.getItem('savedUrl') || '/';
            window.sessionStorage.removeItem('savedUrl');
            props.history.push(savedUrl);
        })();
    }, [props.history]);
    
    return (
        <div>
            <h1>Redirecting...</h1>
        </div>
    );
}

export default AuthCallback;