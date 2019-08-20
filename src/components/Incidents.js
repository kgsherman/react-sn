import React, { useEffect, useState } from 'react';
import SNAPI from '../utils/snapi';

import { useAuthValue } from '../context/auth-context';

const Incidents = () => {
  const [{ authenticated }] = useAuthValue();
  const [incidents, setIncidents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const sn = new SNAPI({
        token: window.localStorage.getItem('token'),
        instance: 'dev72041'
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

  return (
      <div>
          <code>
              {loading
                  ? 'Loading...'
                  : JSON.stringify(incidents, null, 2)                
              }
          </code>
      </div>
  );
};

export default Incidents;