import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Icon from '@mdi/react';
import { mdiBookOpenPageVariant } from '@mdi/js';

import { useSNAPI } from '../../context/snapi-context';

import RecordsHOC from '../RecordsHOC';
import HistorySuccess from './HistorySuccess';
import HistoryLoading from './HistoryLoading';
import HistoryError from './HistoryError';

const HistoryBox = styled.div`
    background-color: White;
    padding: 0.8em 1.2em;
    box-shadow: 0px 2px 3px 0 rgba(0, 0, 0, 0.1);
`;

const History = ({ sysId, table, internalUsers, textFields }) => {
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
        <div className="columns">
            <div className="column">
                <Icon path={mdiBookOpenPageVariant} size={3} style={{ opacity: 0.05 }} />
            </div>
            <div className="column is-three-quarters">
                <RecordsHOC
                    table="sys_history_line"
                    options={{
                        fields: ['sys_id', 'field', 'label', 'old', 'new', 'set', 'set.id', 'user', 'update_time', 'internal_checkpoint'],
                        displayValue: 'all',
                        query: `set.id=${sysId}^fieldIN${fields}`,
                    }}
                    Loading={HistoryLoading}
                    Error={HistoryError}
                    Unauthorized={HistoryError}
                >
                    <HistorySuccess internalUsers={internalUsers} fieldOrder={fields} />
                </RecordsHOC>
            </div>
            <div className="column"></div>
        </div>
    )
};

export default History;