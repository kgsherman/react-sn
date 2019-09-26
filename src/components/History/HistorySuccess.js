import React from 'react';

import HistorySet from './HistorySet';

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

export default HistorySuccess;