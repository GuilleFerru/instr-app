import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import { Employee } from '../Employee/Employee';
import { employeeListStyle } from './EmployeeListStyle';
import Breadcrumbs from '../../../../components/Breadcrumbs/Breadcrumbs';
import { OverDueRoutine } from '../../../../components/OverDueRoutines/OverDueRoutine';

const useStyles = makeStyles((theme) => employeeListStyle(theme));

export const EmployeeList = ({ employees, handleEmployeeEdit, handleDialog }) => {

    const classes = useStyles();

    return <>
        <div className={classes.breadcrumb}>
            <Breadcrumbs />
            <OverDueRoutine />
        </div>
        <div className={classes.container}>
            <div className={classes.mainTitles}>
                <Typography variant="h6" gutterBottom> Personal Total: {employees.length} personas </Typography>
                <Typography variant="overline" gutterBottom> Puedes editar los datos un empleado y agregar novedades a su Parte Díario </Typography>
            </div>
            <div className={classes.section}>
                {employees.map((employee, i) => {
                    return <Employee key={i} employee={employee} handleDialog={handleDialog} handleEmployeeEdit={handleEmployeeEdit} />
                })}
            </div>
        </div>
    </>
}
