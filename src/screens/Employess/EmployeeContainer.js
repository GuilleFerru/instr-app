import React, { useState, useEffect, useReducer } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import { TYPES } from '../../actions/employeeCrudActions';
import { axiosGet, axiosPut, axiosPost } from '../../Services/Axios.js';
import { TableCard } from '../Card/TableCard';
import { employeeContainerStyle } from './EmployeeContainerStyle';
import { EmployeeList } from './components/EmployeeList/EmployeeList';
import { EmployeeCrudContainer } from './components/EmployeeCRUD/EmployeeCrudContainer';
import { EmployeeAditionalContainer } from './components/EmployeeAditional/EmployeeAditionalContainer';
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
    const [isAditionalDialogOpen, setIsAditionalDialogOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [loadingAditional, setLoadingAditional] = useState(false);
    const [dataToEdit, setDataToEdit] = useState(null);
    const [aditionals, setAditionals] = useState(null);
    const [aditionalData, setAditionalData] = useState(
        {
            legajo: '',
            startDate: new Date(),
            endDate: new Date(),
            aditional: ''
        }
    )
    const [updateEmployee, setUpdateEmployee] = useState(null)
    const [addEmployee, setAddEmployee] = useState(null);


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



    const handleCrud = (employee) => {
        const emp = {}
        const url = addEmployee ? `${baseUrl}/emp/create` : `${baseUrl}/emp/update`;
        employee.forEach((element, _index) => {
            emp[element.id] = element.id === 'hireDate' ? parseHtmlInputTypeToDate(element.value) : element.value;
            emp[element.id] = element.id === 'status' ? element.checked : element.value;
        });

        updateEmployee && axiosPut(url, emp).then((response) => {
            dispatch({ type: TYPES.READ_ALL_EMPLOYEES, payload: response.data }); /// ver si lo dejo asi
        }).catch((_error) => {
        })

        addEmployee && axiosPost(url, emp).then((response) => {
            dispatch({ type: TYPES.READ_ALL_EMPLOYEES, payload: response.empResp }); /// ver si lo dejo asi
        }).catch((_error) => {
        })
    }



    const handleDialog = (value) => {
        setIsDialogOpen(value);
    }

    const handleEmployeeEdit = (value) => {
        setDataToEdit(value);
        setUpdateEmployee(true);
        setAddEmployee(false);
    }

    const handleEmployeeAdd = () => {
        setAddEmployee(true);
        setUpdateEmployee(false);
    }

    const handleEmployee = (value = null) => {
        value ? handleEmployeeEdit(value) : handleEmployeeAdd();
        setIsDialogOpen(true);
    }


    const handleAditionalDialog = (value) => {
        setIsAditionalDialogOpen(value);
        setLoadingAditional(true);
        const abortController = new AbortController();
        let cancel = false;
        axiosGet(`${baseUrl}/aditional/get`, { signal: abortController.signal }).then(res => {
            if (!cancel) {
                setAditionals(res);
                setLoadingAditional(false);
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
    }

    return <TableCard>
        {(loading || loadingAditional) && <CircularProgress size='5rem' className={classes.loading} />}

        {db ? <EmployeeList
            employees={db}
            handleEmployee={handleEmployee}
            handleAditionalDialog={handleAditionalDialog}
            aditionalData={aditionalData}
            setAditionalData={setAditionalData}
        /> : null}
        <EmployeeCrudContainer
            isDialogOpen={isDialogOpen}
            auxData={aux}
            updateEmployee={updateEmployee}
            addEmployee={addEmployee}
            handleCrud={handleCrud}
            handleDialog={handleDialog}
            dataToEdit={dataToEdit}

        />
        {aditionals ? <EmployeeAditionalContainer
            aditionals={aditionals}
            aditionalData={aditionalData}
            setAditionalData={setAditionalData}
            isAditionalDialogOpen={isAditionalDialogOpen}
            setIsAditionalDialogOpen={setIsAditionalDialogOpen}
            setLoadingAditional={setLoadingAditional}
        /> : null}
    </TableCard>
}



