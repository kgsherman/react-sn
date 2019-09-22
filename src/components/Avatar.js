import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import { useSNAPI } from '../context/snapi-context';

import './Avatar.css';

const AvatarElement = styled.img`
    border-radius: 50%;
    height: ${props => props.diameter};
    width: ${props => props.diameter};
`;

const Avatar = ({ userId, diameter }) => {
    const [pictureData, setPictureData] = useState('/default-avatar.png');
    const [loading, setLoading] = useState(true);

    const sn = useSNAPI();

    useEffect(() => {
        (async () => {
            const profilePic = await sn.getProfilePicture(userId);
            console.log(profilePic)
            if (profilePic) {
                setPictureData(profilePic);
            }
            setLoading(false);
        })();
    }, []);

    return (
        <>
            {loading && <div class="lds-ring"><div></div><div></div><div></div><div></div></div>}
            <AvatarElement diameter={diameter} src={pictureData} />
        </>
    );
}

export default Avatar;