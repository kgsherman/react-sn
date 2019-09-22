import React from 'react';
import { Link } from 'react-router-dom';

import Avatar from './Avatar';

import RecordHOC from './RecordHOC';

const Incident = (props) => {
    const Success = ({ data }) => {
        console.log(data);
        return (
            <div className="container">
                <nav className="breadcrumb has-succeeds-separator" aria-label="breadcrumbs">
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/incidents">Incidents</Link></li>
                        <li className="is-active"><Link to="/#" aria-current="page">{data ? data.result.number.value : 'Loading...'}</Link></li>
                    </ul>
                </nav>
                <div>
                    <Avatar userId={data.result.caller_id.value} diameter="64px" />
                    <h4 className="is-size-4">{data.result.caller_id.display_value} reports...</h4>
                    <h3 className="is-size-3 has-text-weight-semibold">{data.result.short_description.value}</h3>
                    <p className="">{data.result.description.value}</p>
                </div>
            </div>
        )
    };

    const Loading = () => (<div>Loading</div>);
    const _Error = () => (<div>Error</div>);
    const Unauthorized = () => (<div>renderUnauthorized</div>);

    return (<RecordHOC
        table='incident'
        sysId={props.match.params.id}
        options={{
            fields: ['number', 'caller_id', 'state', 'short_description', 'description'],
            displayValue: 'all',
        }}
        Success={Success}
        Loading={Loading}
        Error={_Error}
        Unauthorized={Unauthorized}
    />);

}

export default Incident;