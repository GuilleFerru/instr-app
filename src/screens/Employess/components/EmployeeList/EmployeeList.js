import React, { useContext } from 'react';
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import { Employee } from '../Employee/Employee';
import { employeeListStyle } from './EmployeeListStyle';
import { AuthContext } from '../../../../context/AuthContext';
import { Pagination } from '../../../../components/Pagination/Pagination';
import usePagination from '../../../../components/Pagination/usePagination';
import { AddTooltip } from '../../../../components/Tooltips/AddTooltip';

const useStyles = makeStyles((theme) => employeeListStyle(theme));

const countInactiveEmployees = (employees) => {
    return employees.filter(employee => employee.status === false).length;
}

export const EmployeeList = ({ employees, handleEmployee, handleAditionalDialog, aditionalData, setAditionalData }) => {

    const classes = useStyles();
    const { user } = useContext(AuthContext);
    const PER_PAGE = 8;

    const _DATA = usePagination(employees, PER_PAGE);

    return <>
        <div className={classes.container}>

            <div className={classes.body}>
                <div className={classes.mainTitles}>
                    <div className={classes.titles}>
                        <Typography variant="h6" gutterBottom> Personal Total: {employees.length - countInactiveEmployees(employees)} personas </Typography>
                        <Typography variant="overline" gutterBottom> Puedes editar los datos un empleado y agregar novedades a su Parte Díario </Typography>
                    </div>
                    <div>
                        <AddTooltip
                            title="Agregar Empleado"
                            size="small"
                            color="primary"
                            placement="top-end"
                            handleTooltip={handleEmployee}
                            disabled={user?.userType === 'user'}>
                        </AddTooltip>
                    </div>
                </div>
                <div className={classes.section}>
                    {_DATA.currentData().map((employee, i) => {
                        return <Employee
                            key={i}
                            employee={employee}
                            handleAditionalDialog={handleAditionalDialog}
                            aditionalData={aditionalData}
                            setAditionalData={setAditionalData}
                            handleEmployeeEdit={handleEmployee}
                            user={user}
                        />
                    })}
                </div>
            </div>
            <div className={classes.pagination}>
                <Pagination
                    _DATA={_DATA}
                    PER_PAGE={PER_PAGE}
                    rawData={employees}
                    variant={'outlined'}
                    color={'primary'}
                />
            </div>
        </div>
    </>
}
