import React from 'react';

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

export default HistorySet;