import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { useAuth } from '../context/auth-context';

import Avatar from './Avatar';
import RecordsHOC from './RecordsHOC';

const IncidentTable = styled.table`
    width: 100%;
    border-collapse: collapse;
    border-spacing: 0;

    th {
        border: 1px solid #dbdbdb;
        border-width: 0 0 2px;
        color: #363636;
    }

    td {
        padding: 0.4em 0;
        vertical-align: middle;
    }
`;

const Incidents = (props) => {
    const { authState } = useAuth();

    const Page = ({ children }) => (
        <div className="container">
            <nav className="breadcrumb has-succeeds-separator" aria-label="breadcrumbs">
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li className="is-active"><Link to="/incidents" aria-current="page">Incidents</Link></li>
                </ul>
            </nav>
            {children}
        </div>
    );

    const Success = ({ data }) => {
        return (
            <Page data={data}>
                <IncidentTable>
                    <thead>
                        <tr>
                            <th>Number</th>
                            <th>Short description</th>
                            <th>Caller</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(incident =>
                            <tr key={incident.sys_id.value}>
                                <td><Link to={`/incidents/${incident.sys_id.value}`}>{incident.number.value}</Link></td>
                                <td>{incident.short_description.value}</td>
                                <td className="level">
                                    <div className="level-left">
                                        <Avatar diameter="2em" userId={incident.caller_id.value} className="level-item" />
                                        <span className="level-item">&nbsp;{incident.caller_id.display_value}</span>
                                    </div>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </IncidentTable>
            </Page>
        )
    }

    const Loading = () => (<Page><div>Loading</div></Page>);
    const _Error = () => (<div>Error</div>);
    const Unauthorized = () => (<div>renderUnauthorized</div>);

    return (

        <RecordsHOC
            table='incident'
            options={{
                fields: ['number', 'short_description', 'sys_id', 'caller_id'],
                query: `active=true^assigned_to=${authState.user.sysId}`,
                displayValue: 'all',
            }}
            Success={Success}
            Loading={Loading}
            Error={_Error}
            Unauthorized={Unauthorized}
        />

    );

}

export default Incidents;