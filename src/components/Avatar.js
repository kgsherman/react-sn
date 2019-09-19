import React from 'react';
import styled from 'styled-components';

const AvatarElement = styled.img`
    border-radius: 50%;
    height: ${props => props.diameter};
    width: ${props => props.diameter};
`;

const Avatar = (props) => {
    return (
        <AvatarElement {...props} />
    );
}

export default Avatar;