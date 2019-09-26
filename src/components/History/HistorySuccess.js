import React from 'react';
import styled from 'styled-components';

import HistorySet from './HistorySet';

const HistoryWrapper = styled.div`
    display: flex;
    flex-direction: column-reverse
    background-color: #f7f7f7;
    padding: 1em;
    border: 1px solid WhiteSmoke;
`;


const HistorySuccess = ({ records, internalUsers, fieldOrder }) => {

    const sets = records.reduce((accumulator, historyLine) => {

        const setId = historyLine.internal_checkpoint.value;
        const isInternal = internalUsers.includes(historyLine.user.value);

        // need to check for duplicates because apparently that's a thing?
        if (accumulator[setId] && accumulator[setId].historyLines && accumulator[setId].historyLines.find(line => line.field.value === historyLine.field.value))
            return accumulator;

        const checkpointData = {
            user: historyLine.user.display_value,
            dt: historyLine.update_time.value,
            internal: isInternal,
        }

        const historyLines = accumulator[setId]
            ? [...accumulator[setId].historyLines, historyLine]
            : [historyLine];


        return {
            ...accumulator,
            [setId]: {
                ...checkpointData,
                historyLines: historyLines
            }
        };
    }, {})

    return (
        <HistoryWrapper>
            {Object.keys(sets).map(setId => {
                const set = sets[setId];
                return <HistorySet key={setId} {...set} fieldOrder={fieldOrder}/>
            })}
        </HistoryWrapper>
    );
};

export default HistorySuccess;