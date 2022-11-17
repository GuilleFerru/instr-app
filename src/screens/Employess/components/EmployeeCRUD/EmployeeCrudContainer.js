import React from 'react';
import { EmployeeUpdateForm } from './EmployeeUpdate/EmployeeUpdateForm';

export const EmployeeCrudContainer = ({ isDialogOpen, auxData, handleUpdate, handleDialog, dataToEdit, title }) => {

    return <>
        {dataToEdit && <EmployeeUpdateForm employee={dataToEdit} auxData={auxData} handleUpdate={handleUpdate} handleDialog={handleDialog} isDialogOpen={isDialogOpen} title={title} />}
    </>
}
