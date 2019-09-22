import React, { useReducer, useEffect } from 'react';
import { useSNAPI } from '../context/snapi-context';

const LOADING = Symbol('LOADING');
const SUCCESS = Symbol('SUCCESS');
const UNAUTHORIZED = Symbol('UNAUTHORIZED');
const ERROR = Symbol('ERROR');


const RecordHOC = ({ table, sysId, options, Success, Loading, Error, Unauthorized }) => {

    const reducer = (state, action) => {
        switch (action.type) {
            case 'success':
                return {
                    stage: SUCCESS,
                    component: Success,
                    data: action.data,
                };
            case 'error':
                return {
                    stage: ERROR,
                    component: Error,
                    data: action.data,
                };
            case 'unauthorized':
                return {
                    stage: UNAUTHORIZED,
                    component: Unauthorized,
                    data: null,
                };
            case 'loading':
                return {
                    stage: LOADING,
                    component: Loading,
                    data: null,
                };
            default: throw new Error();
        }
    }

    const [state, dispatch] = useReducer(reducer, {
        stage: LOADING,
        component: Loading,
        data: null,
    });

    const sn = useSNAPI();

    const getRecord = async (table, sysId, options) => {
        const response = await sn.getRecord(table, sysId, options);
        if (response.ok) {
            const data = await response.json();
            dispatch({
                type: 'success',
                data
            });
        } else if (response.status === 401) {
            dispatch({ type: 'unauthorized' });
        } else {
            try {
                const data = await response.json();
                dispatch({
                    type: 'error',
                    data
                });
            } catch (e) {
                console.log(response);
                dispatch({ 
                    type: 'error',
                    data: response,
                });
            }
        }
    }

    useEffect(() => {
        (async () => {
            getRecord(table, sysId, options);
        })();
    }, []);


    return <state.component data={state.data} />;
}

export default RecordHOC;