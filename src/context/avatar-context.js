import React, { createContext, useContext, useState } from 'react';

import { useSNAPI } from '../context/snapi-context';

export const AvatarContext = createContext({});

export const AvatarProvider = ({ children }) => {
    const [avatars, setAvatars] = useState({});
    const { connection } = useSNAPI();

    const defaultImage = '/default-avatar.png';

    const loadAvatar = async (userId) => {
        if (avatars[userId]) {
            return;
        }
        
        console.log('now loading ' + userId, {...avatars});

        setAvatars({
            ...avatars,
            [userId]: {
                src: defaultImage,
                loading: true,
            }
        });

        try {
            const profilePic = await connection.getProfilePicture(userId);
            setAvatars({
                ...avatars,
                [userId]: {
                    src: profilePic || defaultImage,
                    loading: false,
                }
            });
            console.log('done loading', {...avatars})
        } catch (e) {
            setAvatars({
                ...avatars,
                [userId]: {
                    src: defaultImage,
                    loading: false,
                }
            })
        }
    }

    return <AvatarContext.Provider value={{ avatars, loadAvatar, defaultImage }}>{children}</AvatarContext.Provider>
}

export const useAvatar = () => useContext(AvatarContext);