import React, { useReducer, useEffect } from 'react';
import { useSNAPI } from '../context/snapi-context';
import { useAuth } from '../context/auth-context';

const LOADING = Symbol('LOADING');
const SUCCESS = Symbol('SUCCESS');
const UNAUTHORIZED = Symbol('UNAUTHORIZED');
const ERROR = Symbol('ERROR');


const RecordsHOC = ({ table, options, Success, Loading, Error, Unauthorized }) => {
    const { connection, refreshConnection } = useSNAPI();
    const { signIn } = useAuth();

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
                refreshConnection();
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


    useEffect(() => {
        const getRecords = async (table, options) => {

            const response = await connection.getRecords(table, options);

            if (response.ok) {
                const data = (await response.json()).result;
                dispatch({
                    type: 'success',
                    data
                });
            } else if (response.status === 401) {
                dispatch({ type: 'unauthorized' });
            } else {
                try {
                    const data = await response.json();
                    console.log(data);
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

        getRecords(table, options);
    }, [options, table, connection]);


    return <state.component data={state.data} />;
}

export default RecordsHOC;