import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import SNAPI from '../utils/snapi';

import Avatar from './Avatar';

const Incident = (props) => {
    const [data, setData] = useState(false);
    const [picture, setPicture] = useState('');

    const sn = new SNAPI({
        token: window.localStorage.getItem('token'),
        instance: 'dev59227'
    });

    const getIncidentData = async () => {

        const data = await sn.getRecord('incident', props.match.params.id, {
            fields: ['number', 'caller_id', 'state', 'short_description', 'description'],
            displayValue: 'all',
        });

        const pictureData = await sn.getProfilePicture(data.caller_id.value);
        setPicture(pictureData);

        return data;
    }

    const getIncidentHistory = async () => {

    }

    useEffect(() => {
        (async () => {
            const data = await getIncidentData();
            console.log('data', data);
            setData(data);
        })();
    }, [props.match.params.id]);

    const renderLoading = () => (
        <div>
            Loading...
        </div>
    );

    const renderIncident = () => (
        <> 
            <Avatar src={picture} diameter="64px" />
            <h4 className="is-size-4 has-text-weight-semibold">{data.short_description.value}</h4>
            <p className="">{data.description.value}</p>
        </>
    )


    return (
        <div className="container">
            <nav className="breadcrumb has-succeeds-separator" aria-label="breadcrumbs">
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/incidents">Incidents</Link></li>
                    <li className="is-active"><Link to="/#" aria-current="page">{data ? data.number.value : 'Loading...'}</Link></li>
                </ul>
            </nav>
            {data
                ? renderIncident()
                : renderLoading()
            }
        </div>
    );
};

export default Incident;