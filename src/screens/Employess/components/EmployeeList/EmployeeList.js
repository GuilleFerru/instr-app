import React, { useState } from 'react';
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import { Employee } from '../Employee/Employee';
import { employeeListStyle } from './EmployeeListStyle';
import Breadcrumbs from '../../../../components/Breadcrumbs/Breadcrumbs';
import { OverDueRoutine } from '../../../../components/OverDueRoutines/OverDueRoutine';
import { EmployeeCrudContainer } from '../EmployeeCRUD/EmployeeCrudContainer';

const useStyles = makeStyles((theme) => employeeListStyle(theme));

export const EmployeeList = ({ employees, auxData, dataToEdit, setDataToEdit }) => {

    const classes = useStyles();
    const [isDialogOpen, setIsDialogOpen] = useState(false);


    const handleDialog = (value) => {
        setIsDialogOpen(value);
    }
    const handleEmployeeEdit = (value) => {
        setDataToEdit(value);

    }


    return <>
        <div className={classes.breadcrumb}>
            <Breadcrumbs />
            <OverDueRoutine />
        </div>
        <Typography variant="h6" gutterBottom> Personal Total: {employees.length} personas </Typography>
        <div className={classes.section}>
            {employees.map((employee, i) => {
                return <Employee key={i} employee={employee} handleDialog={handleDialog} handleEmployeeEdit={handleEmployeeEdit} />
            })}
        </div>
        <EmployeeCrudContainer isDialogOpen={isDialogOpen} auxData={auxData} handleDialog={handleDialog} dataToEdit={dataToEdit} title={"Actualizar Datos"} />
    </>
}
