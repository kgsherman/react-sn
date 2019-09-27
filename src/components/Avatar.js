import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';

import { useSNAPI } from '../context/snapi-context';
import { useAvatar } from '../context/avatar-context';

const AvatarWrapper = styled.div`
    position: relative;
    border-radius: 50%;
    height: ${props => props.diameter};
    width: ${props => props.diameter};
    overflow: hidden;
`;

const AvatarElement = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
`;

const AvatarShade = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: White;
    opacity: 0.66;
`;

const rotate = keyframes`
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
`;

const LoadingRing = styled.div`
    display: inline-block;
    position: absolute;
    width: ${props => props.diameter};
    height: ${props => props.diameter};

    & div {
        box-sizing: border-box;
        display: block;
        position: absolute;
        width: ${props => props.diameter};
        height: ${props => props.diameter};
        border: 6px solid #fff;
        border-radius: 50%;
        animation: ${rotate} 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
        border-color: #fff transparent transparent transparent;
      }
    .& div:nth-child(1) {
        animation-delay: -0.45s;
    }
    .& div:nth-child(2) {
        animation-delay: -0.3s;
    }
    .& div:nth-child(3) {
        animation-delay: -0.15s;
    }
`;

const Avatar = ({ userId, diameter }) => {
    //const [pictureData, setPictureData] = useState('/default-avatar.png');
    //const [loading, setLoading] = useState(true);

    // const { connection } = useSNAPI();

    const { avatars, loadAvatar } = useAvatar();
    loadAvatar(userId);


    return avatars[userId] ? (
        <>
            <AvatarWrapper diameter={diameter}>
                {(!avatars[userId] || avatars[userId].loading) && <>
                    <LoadingRing diameter={diameter}><div></div><div></div><div></div><div></div></LoadingRing>
                    <AvatarShade />
                </>}
                <AvatarElement src={avatars[userId].src} />
            </AvatarWrapper>
        </>
    ) : null;
}

export default Avatar;