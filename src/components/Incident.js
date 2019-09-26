import React, { useState, useEffect, useContext, createContext } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Icon from '@mdi/react';
import { mdiChatOutline } from '@mdi/js'

import Avatar from './Avatar';
import History from './History';

import RecordHOC from './RecordHOC';
import RecordsHOC from './RecordsHOC';

import { useSNAPI } from '../context/snapi-context';

const HR = styled.hr`
    box-shadow: 0px 1px 2px 0 rgba(0, 0, 0, 0.1);
`;

const Caller = styled.div`
    display: flex;
    margin-bottom: 1em;
`;

const CallerText = styled.div`
    margin-left: 1em;
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

const CallerTitle = styled.h4`
    font-size: 1.5em;
    line-height: 1em;
`;

const CallerSubtitle = styled.div`
    font-style: italic;
    font-weight: lighter;
`;

const IncidentBox = styled.div`
    margin: 2em 0;
    padding: 1.2em;
    background-color: White;
    border-color: WhiteSmoke;
    box-shadow: 0px 1px 2px 0 rgba(0, 0, 0, 0.1);
`;

const ShortDescription = styled.h3`
    font-size: 1.6em;
    font-weight: 500;
`;

const DescriptionBox = styled.div`
    display: flex;
    margin: 1.2em 0;
`;

const Description = styled.div`
    background-color: white;
    white-space: pre-wrap;
    border-left: 1px solid LightGrey;
    padding: 0.8em 1.2em;
    margin-left: 0.8em;
    box-shadow: 0px 2px 3px 0 rgba(0, 0, 0, 0.1);
`;

const AdditionalInfo = styled.div`
    border-left: 1px solid LightGrey;
    padding-left: 1em;
    margin: 1.5em;
`;

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

const Incident = (props) => {
    const { connection } = useSNAPI();

    const Page = ({ data, children }) => (
        <div className="container">
            <nav className="breadcrumb has-succeeds-separator" aria-label="breadcrumbs">
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/incidents">Incidents</Link></li>
                    <li className="is-active"><Link to="/#" aria-current="page">{data ? data.result.number.display_value : 'Loading...'}</Link></li>
                </ul>
            </nav>
            <HR />
            {children}
        </div>
    );

    const Loading = () => (
        <Loader>
            <h1>Loading...</h1>
        </Loader>
    );
    const _Error = () => (<div>Error</div>);
    const Unauthorized = () => (<div>renderUnauthorized</div>);

    const DetailSuccess = ({ data }) => (
        <Page data={data}>
            <Caller>
                <Avatar userId={data.result.caller_id.value} diameter="48px" />
                <CallerText>
                    <CallerTitle>{data.result.caller_id.display_value}</CallerTitle>
                    <CallerSubtitle>reports...</CallerSubtitle>
                </CallerText>
            </Caller>
            <IncidentBox>
                <div className="columns">
                    <div className="column is-three-quarters">
                        <ShortDescription>{data.result.short_description.value}</ShortDescription>
                        <DescriptionBox>
                            <Icon path={mdiChatOutline} size={2} style={{ opacity: 0.05 }} />
                            <Description>{data.result.description.value}</Description>
                        </DescriptionBox>
                    </div>
                    <AdditionalInfo className="column">
                        <p>Priority: {data.result.priority.display_value}</p>
                    </AdditionalInfo>
                </div>
                <History sysId={data.result.sys_id.value} table="incident" internalUsers={data.result.caller_id.value} textFields={['comments']} />
            </IncidentBox>
        </Page>
    )
    return (
        <RecordHOC
            table='incident'
            sysId={props.match.params.id}
            options={{
                fields: ['sys_id', 'number', 'caller_id', 'state', 'short_description', 'description', 'priority'],
                displayValue: 'all',
            }}
            Success={DetailSuccess}
            Loading={Loading}
            Error={_Error}
            Unauthorized={Unauthorized}
        />

    );

}

export default Incident;