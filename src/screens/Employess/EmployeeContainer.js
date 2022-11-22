import React, { useState, useEffect, useReducer } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import { TYPES } from '../../actions/employeeCrudActions';
import { axiosGet, axiosPut } from '../../Services/Axios.js';
import { TableCard } from '../Card/TableCard';
import { employeeContainerStyle } from './EmployeeContainerStyle';
import { EmployeeList } from './components/EmployeeList/EmployeeList';
import { EmployeeCrudContainer } from './components/EmployeeCRUD/EmployeeCrudContainer';
import { parseHtmlInputTypeToDate } from '../../Services/DateUtils.js';
import { employeeCrudInitialState, employeeCrudReducer } from '../../reducers/employeeCrudReducer';
import { useHistory } from 'react-router-dom';

const baseUrl = process.env.REACT_APP_API_URL;
const useStyles = makeStyles((theme) => employeeContainerStyle(theme));

export const EmployeeContainer = () => {

    const classes = useStyles();
    const history = useHistory();
    const [state, dispatch] = useReducer(employeeCrudReducer, employeeCrudInitialState);
    const { db, aux } = state;
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [dataToEdit, setDataToEdit] = useState(null);


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


    const handleUpdate = (employee) => {
        const updateEmployee = {}
        employee.forEach((element, _index) => {
            updateEmployee[element.id] = element.id === 'hireDate' ? parseHtmlInputTypeToDate(element.value) : element.value;
        });

        axiosPut(`${baseUrl}/emp/update`, updateEmployee).then((response) => {
            dispatch({ type: TYPES.READ_ALL_EMPLOYEES, payload: response.data }); /// ver si lo dejo asi
        }).catch((_error) => {
        })
    }

    const handleDialog = (value) => {
        setIsDialogOpen(value);
    }
    const handleEmployeeEdit = (value) => {
        setDataToEdit(value);
    }

    return <TableCard>
        {loading && <CircularProgress size='5rem' className={classes.loading} />}
        {db ? <EmployeeList employees={db} auxData={aux} setDataToEdit={setDataToEdit} dataToEdit={dataToEdit} isDialogOpen={isDialogOpen} handleEmployeeEdit={handleEmployeeEdit} handleDialog={handleDialog} /> : null}
        <EmployeeCrudContainer isDialogOpen={isDialogOpen} auxData={aux} handleUpdate={handleUpdate} handleDialog={handleDialog} dataToEdit={dataToEdit} title={"Actualizar Datos"} />
    </TableCard>
}



