import React from 'react';

import { useAuthValue } from '../context/auth-context';

const Header = () => {
    const { authToken } = useAuthValue();

    return (
        <div>
            {authToken
                ? <span>I'm logged in with the token {authToken}</span>
                : <span>I'm not logged in</span>
            }
        </div>
    );
}

export default Header;