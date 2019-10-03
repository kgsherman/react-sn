import React, { createContext, useContext , useReducer} from 'react';

import { useSNAPI } from '../context/snapi-context';

export const AvatarContext = createContext({});

export const AvatarProvider = ({ children }) => {
    const defaultImage = '/default-avatar.png';

    const reducer = (avatars, action) => {

        switch (action.type) {
            case 'loaded':
                return {
                    ...avatars,
                    [action.userId]: {
                        src: action.src || defaultImage,
                        loading: false,
                    }
                }
            case 'loading':
                return {
                    ...avatars,
                    [action.userId]: {
                        src: defaultImage,
                        loading: true,
                    }
                }
            default:
                throw new Error();
        }
    }

    const { connection } = useSNAPI();
    const [avatars, dispatch] = useReducer(reducer, {});


    const loadAvatar = async (userId) => {
        if (avatars[userId])
            return;

        dispatch({ type: 'loading', userId })

        try {
            const profilePic = await connection.getProfilePicture(userId);
            dispatch({
                userId, 
                type: 'loaded', 
                src: profilePic || defaultImage });
        } catch (e) {
            dispatch({
                userId, 
                type: 'loaded', 
                src: defaultImage });
        }
    }

    return <AvatarContext.Provider value={{ avatars, loadAvatar, defaultImage }}>{children}</AvatarContext.Provider>
}

export const useAvatar = () => useContext(AvatarContext);