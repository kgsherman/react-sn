import React from 'react';
import styled from 'styled-components';

const Loader = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;

    h1 {
        font-size: 1.3em;
        font-style: italic;
        font-weight: 300;
    }
`;

const Authorizing = () => (
    <Loader>
        <h1>Authorizing...</h1>
    </Loader>
);

export default Authorizing;