import React from 'react'
import { EmployeeUpdateForm } from './EmployeeUpdate/EmployeeUpdateForm'

export const EmployeeCrudContainer = ({ isDialogOpen, auxData, handleDialog, dataToEdit, title }) => {



    const handleUpdate = (employee) => {
        // console.log('handleUpdate');
        // console.log(employee);
    }

    return <>
        {dataToEdit && <EmployeeUpdateForm employee={dataToEdit} auxData={auxData} handleUpdate={handleUpdate} handleDialog={handleDialog} isDialogOpen={isDialogOpen} title={title} />}
    </>
}
