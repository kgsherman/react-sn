import React from 'react';
import styled from 'styled-components';

const Box = styled.div`
    font-size: 0.9em;
    background-color: White;
    display: flex;
    flex-direction: column;
    width: 75%;
    margin-bottom: 1.5em;
    border: 1px solid WhiteSmoke;
    box-shadow: 0px 1px 2px 0 rgba(0, 0, 0, 0.1);
`;

const BoxHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid WhiteSmoke;
    padding: 0.7em;

    h4 {
        font-weight: 500;
    }

    span {
        font-weight: 300;
        font-size: 0.8em;
        font-style: italic;
        margin-left: 1em;
    }
`;

const BoxContent = styled.div`
    padding: 1em;
`;

const BoxTable = styled.table`
    border-collapse: collapse;

    th {
        vertical-align: top;
        text-align: right !important;
        padding: 0.5em;
    }

    td {
        vertical-align: top;
        padding: 0.5em;
        white-space: pre-wrap;
    }
`;

const Was = styled.span`
    font-weight: 300;
    font-style: italic;
    margin-left: 1em;
`;

const InternalBox = styled(Box) `
    align-self: flex-end;
    border-radius: 0.5em 0.5em 0 0.5em;
`;

const ExternalBox = styled(Box) `
    align-self: flex-start;
    border-radius: 0.5em 0.5em 0.5em 0;
`;

const HistorySet = ({ historyLines, user, dt, internal, fieldOrder }) => {
    const BoxType = internal ? InternalBox : ExternalBox;
    return (
        <BoxType>
            <BoxHeader>
                <h4>{user}</h4>
                <span>{dt}</span>
            </BoxHeader>
            <BoxContent>
                <BoxTable>
                    <tbody>
                        {fieldOrder.split(',').map(field => {

                            const historyLine = historyLines.find(historyLine => historyLine.field.value === field);

                            return historyLine ? (
                                <tr key={historyLine.sys_id.value}>
                                    <th>{historyLine.label.value}</th>
                                    <td>
                                        {historyLine.new.value}
                                        {historyLine.old.value && <Was>(was {historyLine.old.value})</Was>}
                                    </td>
                                </tr>
                            ) : null;
                        })}
                    </tbody>
                </BoxTable>
            </BoxContent>
        </BoxType>
    );
}

export default HistorySet;