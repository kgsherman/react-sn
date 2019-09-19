import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const TileElement = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 200px;
    background-color: White;
    box-shadow: 0px 2px 3px 0 rgba(0, 0, 0, 0.25);
`;

const Tile = ({children}) => (
    <TileElement>
        {children}
    </TileElement>
);

const Home = () => (
    <>
    <section className="hero">
        <p className="title is-2">React SN</p>
    </section>
    <section className="section">
        <div className="container">
            <div className="columns">
                <div className="column">
                    <Link to="/incidents"><Tile>Incidents</Tile></Link>
                </div>
                <div className="column">
                    <Tile>Tile 2</Tile>
                </div>
                <div className="column">
                    <Tile>Tile 3</Tile>
                </div>
            </div>
        </div>
    </section>
    </>
);

export default Home;