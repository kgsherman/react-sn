import React from 'react';
import { Link } from 'react-router-dom';

import { useAuth } from '../context/auth-context';

import Avatar from './Avatar';
import RecordsHOC from './RecordsHOC';

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

    const Success = ({ data }) => {return (
        <Page data={data}>
            <table className="table is-fullwidth">
                <thead>
                    <tr>
                        <th></th>
                        <th>Number</th>
                        <th>Short description</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map(incident =>
                        <tr key={incident.sys_id.value}>
                            <td><Avatar diameter="32px" userId={incident.caller_id.value}/></td>
                            <td><Link to={`/incidents/${incident.sys_id.value}`}>{incident.number.value}</Link></td>
                            <td>{incident.short_description.value}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </Page>
    )}

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