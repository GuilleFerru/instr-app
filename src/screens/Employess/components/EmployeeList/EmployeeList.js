import React, { useContext } from 'react';
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import { Employee } from '../Employee/Employee';
import { employeeListStyle } from './EmployeeListStyle';
import { AuthContext } from '../../../../context/AuthContext';
import { Pagination } from '../../../../components/Pagination/Pagination';
import usePagination from '../../../../components/Pagination/usePagination';

const useStyles = makeStyles((theme) => employeeListStyle(theme));

export const EmployeeList = ({ employees, handleEmployeeEdit, handleDialog, handleAditionalDialog, aditionalData, setAditionalData }) => {

    const classes = useStyles();
    const { user } = useContext(AuthContext);
    const PER_PAGE = 8;
    const _DATA = usePagination(employees, PER_PAGE);

    return <>
        <div className={classes.container}>
            <div className={classes.body}>
                <div className={classes.mainTitles}>
                    <Typography variant="h6" gutterBottom> Personal Total: {employees.length} personas </Typography>
                    <Typography variant="overline" gutterBottom> Puedes editar los datos un empleado y agregar novedades a su Parte Díario </Typography>
                </div>
                <div className={classes.section}>
                    {_DATA.currentData().map((employee, i) => {
                        return <Employee
                            key={i}
                            employee={employee}
                            handleDialog={handleDialog}
                            handleAditionalDialog={handleAditionalDialog}
                            aditionalData={aditionalData}
                            setAditionalData={setAditionalData}
                            handleEmployeeEdit={handleEmployeeEdit}
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
