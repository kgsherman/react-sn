import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { useAuth } from '../context/auth-context';
import { useSNAPI } from '../context/snapi-context';

const Incidents = () => {
  const [incidents, setIncidents] = useState([]);
  const [loading, setLoading] = useState(true);
  const { authState } = useAuth();
  const sn = useSNAPI();

  useEffect(() => {
    (async () => {

      const response = await sn.getRecords('incident', {
        fields: ['number', 'short_description', 'sys_id'],
        query: `active=true^assigned_to=${authState.user.sysId}`
      });

      console.log('response', response)

      const incidents = (await response.json()).result;

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
            <td><Link to={`/incidents/${incident.sys_id}`}>{incident.number}</Link></td>
            <td>{incident.short_description}</td>
          </tr>
        )}
      </tbody>
    </table>
  );

  return (
    <>
      <div className="container">
        <nav className="breadcrumb has-succeeds-separator" aria-label="breadcrumbs">
          <ul>
            <li><Link to="/">Home</Link></li>
            <li className="is-active"><Link to="/incidents" aria-current="page">Incidents</Link></li>
          </ul>
        </nav>

        {loading
          ? 'Loading...'
          : <IncidentTable />
        }
      </div>
    </>
  );
};

export default Incidents;