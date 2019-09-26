import React, { useState, useEffect } from 'react';

import { useSNAPI } from '../../context/snapi-context';

import RecordsHOC from '../RecordsHOC';
import HistorySuccess from './HistorySuccess';
import HistoryLoading from './HistoryLoading';
import HistoryError from './HistoryError';

const History = ({ sysId, table }) => {
    const { connection } = useSNAPI();

    const [loading, setLoading] = useState(true);
    const [fields, setFields] = useState(null);

    const getFields = async () => {
        const fields = await connection.getProperty(`glide.ui.${table}_activity.fields`);
        setFields(fields);
        setLoading(false);
    }

    useEffect(() => {
        getFields();
    }, []);

    if (loading) return (<div>...</div>);

    return (
        <>
            <h4 className="is-size-4">Case history</h4>
            <hr />
            <RecordsHOC
                table="sys_history_line"
                options={{
                    fields: ['sys_id', 'field', 'label', 'old', 'new', 'set', 'set.id', 'user', 'update_time', 'internal_checkpoint'],
                    displayValue: 'all',
                    query: `set.id=${sysId}^fieldIN${fields}`,
                }}
                Success={HistorySuccess}
                Loading={HistoryLoading}
                Error={HistoryError}
                Unauthorized={HistoryError}
            />
        </>
    )
};

export default History;