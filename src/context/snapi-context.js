import React, { createContext, useContext } from 'react';

import SNAPI from 'snapi';

export const SNAPIContext = createContext();

export const SNAPIProvider = ({ children }) => {

    const sn = new SNAPI({
        token: window.localStorage.getItem('token'),
        instance: 'dev59227',
    });

    return <SNAPIContext.Provider value={sn}>{children}</SNAPIContext.Provider>;
};

export const useSNAPI = () => useContext(SNAPIContext);
