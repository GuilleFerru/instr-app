import React, { useState, useEffect, useReducer } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import { TYPES } from '../../actions/employeeCrudActions';
import { axiosGet } from '../../Services/Axios.js';
import { TableCard } from '../Card/TableCard';
import { employeeContainerStyle } from './EmployeeContainerStyle';
import { EmployeeList } from './components/EmployeeList/EmployeeList';
import { employeeCrudInitialState, employeeCrudReducer } from '../../reducers/employeeCrudReducer';
import { useHistory } from 'react-router-dom';

const baseUrl = process.env.REACT_APP_API_URL;
const useStyles = makeStyles((theme) => employeeContainerStyle(theme));

export const EmployeeContainer = () => {

    const classes = useStyles();
    const history = useHistory();

    const [loading, setLoading] = useState(false);
    const [dataToEdit, setDataToEdit] = useState(null);
    const [state, dispatch] = useReducer(employeeCrudReducer, employeeCrudInitialState);
    const { db, aux } = state;



    useEffect(() => {
        setLoading(true);
        const abortController = new AbortController();
        let cancel = false;
        axiosGet(`${baseUrl}/emp/get`, { signal: abortController.signal }).then(res => {
            if (!cancel) {
                dispatch({ type: TYPES.READ_ALL_EMPLOYEES, payload: res });
                setLoading(false);
            } else {
                return;
            }
        }).catch(_err => {
            history.push('/error');
        });;
        return () => {
            cancel = true;
            abortController.abort();
        }
    }, [history]);


    // const handleDialog = (value) => () => {
    //     setIsDialogOpen(value);
    // }



    return <TableCard>
        {loading && <CircularProgress size='5rem' className={classes.loading} />}
        {db ? <EmployeeList employees={db} auxData={aux} setDataToEdit={setDataToEdit} dataToEdit={dataToEdit} /> : null}
    </TableCard>
}



