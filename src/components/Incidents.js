import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import SNAPI from '../utils/snapi';

const Incidents = () => {
  const [incidents, setIncidents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const sn = new SNAPI({
        token: window.localStorage.getItem('token'),
        instance: 'dev59227'
      });

      const incidents = await sn.getRecords('incident', {
        fields: ['number', 'short_description'],
        limit: 2,
        query: 'active=true'
      });

      setIncidents(incidents);
      setLoading(false);
    })();
  }, []);

  const IncidentTable = () => (
    <table className="table is-fullwidth">
      <thead>
        <tr>
          <th>Number</th>
          <th>Short description</th> 
        </tr>
      </thead>
      <tbody>
        {incidents.map(incident =>
          <tr>
            <td>{incident.number}</td>
            <td>{incident.short_description}</td>
          </tr>
        )}
      </tbody>
    </table>
  );

  return (
    <>
      <div class="container">
        <nav class="breadcrumb has-succeeds-separator" aria-label="breadcrumbs">
          <ul>
            <li><Link to="/">Home</Link></li>
            <li class="is-active"><Link to="/incidents" aria-current="page">Incidents</Link></li>
          </ul>
        </nav>
      </div>
      <div class="container">
        {loading
          ? 'Loading...'
          : <IncidentTable />
        }
      </div>
    </>
  );
};

export default Incidents;