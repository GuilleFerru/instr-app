import React from 'react';
import { EmployeeUpdateForm } from './EmployeeUpdate/EmployeeUpdateForm';
import { EmployeeAddForm } from './EmployeeAdd/EmployeeAddForm';

export const EmployeeCrudContainer = ({ isDialogOpen, auxData, updateEmployee, addEmployee, handleUpdate, handleCrud, handleDialog, dataToEdit }) => {

    return <>
        {updateEmployee && <EmployeeUpdateForm
            employee={dataToEdit}
            auxData={auxData}
            handleUpdate={handleUpdate}
            handleDialog={handleDialog}
            isDialogOpen={isDialogOpen}
            title={"Actualizar Datos"}
            handleCrud={handleCrud}

        />}

        {addEmployee && <EmployeeAddForm
            auxData={auxData}
            handleUpdate={handleUpdate}
            handleDialog={handleDialog}
            isDialogOpen={isDialogOpen}
            title='Agregar un empleado'
            handleCrud={handleCrud}
        />}
    </>
}
