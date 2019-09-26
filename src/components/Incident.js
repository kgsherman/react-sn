import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import Avatar from './Avatar';
import History from './History';

import RecordHOC from './RecordHOC';
import RecordsHOC from './RecordsHOC';

import { useSNAPI } from '../context/snapi-context';

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
            {children}
        </div>
    );

 /*   const HistoryLine = ({ data }) => {
        return (
            null
        );
    }

    const HistorySet = ({ updates, user, dt }) => {
        return (
            <div class="section">
                <h4>Updated by {user} on {dt}</h4>
                <table className='table'>
                    {updates.map(update => <tr>
                        <td>{update.label.value}</td>
                        <td>{update.new.value}</td>
                        <td>{update.old.value && <span>(was {update.old.value})</span>}</td>
                    </tr>)}
                </table>
            </div>
        );
    }

    const HistorySuccess = ({ data }) => {
        const sets = data.reduce((accumulator, current) => {
            const checkpoint = current.internal_checkpoint.value;

            return {
                ...accumulator,
                [checkpoint]: {
                    user: current.user.display_value,
                    dt: current.update_time.value,
                    updates: [...((accumulator[checkpoint] && accumulator[checkpoint].updates) || []), current]
                }
            };
        }, {})

        return (
            <div>
                {Object.keys(sets).reverse().map(setId => {
                    const set = sets[setId];
                    return <HistorySet {...set} />
                })}
            </div>
        );
    };



    const History = ({ incidentId }) => {
        const [loading, setLoading] = useState(true);
        const [fields, setFields] = useState(null);

        const getFields = async () => {
            const fields = await connection.getProperty('glide.ui.incident_activity.fields');
            setFields(fields);
            setLoading(false);
        }

        useEffect(() => {
            getFields();
        }, []);

        if (loading) return (<div>...</div>);

        return (

            <RecordsHOC
                table="sys_history_line"
                options={{
                    fields: ['sys_id', 'field', 'label', 'old', 'new', 'set', 'set.id', 'user', 'update_time', 'internal_checkpoint'],
                    displayValue: 'all',
                    query: `set.id=${incidentId}^fieldIN${fields}`,
                }}
                Success={HistorySuccess}
                Loading={Loading}
                Error={_Error}
                Unauthorized={Unauthorized}
            />
        )
    };*/

    const Loading = () => (<div>Loading</div>);
    const _Error = () => (<div>Error</div>);
    const Unauthorized = () => (<div>renderUnauthorized</div>);

    const DetailSuccess = ({ data }) => (
        <Page data={data}>
            <section className="section">
                <Avatar userId={data.result.caller_id.value} diameter="64px" />
                <h4 className="is-size-4">{data.result.caller_id.display_value} reports...</h4>
                <h3 className="is-size-3 has-text-weight-semibold">{data.result.short_description.value}</h3>
                <p className="">{data.result.description.value}</p>
            </section>
            <section>
                <History sysId={data.result.sys_id.value} table="incident" />
            </section>
        </Page>
    )
    return (
        <RecordHOC
            table='incident'
            sysId={props.match.params.id}
            options={{
                fields: ['sys_id', 'number', 'caller_id', 'state', 'short_description', 'description'],
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