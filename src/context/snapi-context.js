import React, { createContext, useContext, useState } from 'react';

//import SNAPI from 'sn-rest-async';
import SNAPI from 'snapi';

const createConnection = () => {
    const token = window.localStorage.getItem('token');
    const instance = 'dev59227';

    return new SNAPI({
        token,
        instance,
    });
}

export const SNAPIContext = createContext();

export const SNAPIProvider = ({ children }) => {
    const [connection, setConnection] = useState(createConnection());
    
    const refreshConnection = () => {
        setConnection(createConnection());
    }

    return <SNAPIContext.Provider value={{ connection, refreshConnection }}>{children}</SNAPIContext.Provider>;
};

export const useSNAPI = () => useContext(SNAPIContext);
