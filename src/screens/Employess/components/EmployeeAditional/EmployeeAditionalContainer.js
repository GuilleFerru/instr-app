import React from 'react';
import { EmployeeAditionalForm } from './EmployeeAditionalForm';
import { axiosPost } from '../../../../Services/Axios.js';

const baseUrl = process.env.REACT_APP_API_URL;

export const EmployeeAditionalContainer = ({ aditionals, aditionalData, setAditionalData, isAditionalDialogOpen, setIsAditionalDialogOpen, setLoadingAditional }) => {


    const addAditional = () => {
        setLoadingAditional(true);
        axiosPost(`${baseUrl}/schedule/create/aditionals`, aditionalData).then((_response) => {
            setLoadingAditional(false);
        }).catch((_error) => { })
        setIsAditionalDialogOpen(false);
    }

    return <>
        <EmployeeAditionalForm
            setIsAditionalDialogOpen={setIsAditionalDialogOpen}
            isAditionalDialogOpen={isAditionalDialogOpen}
            aditionals={aditionals}
            aditionalData={aditionalData}
            setAditionalData={setAditionalData}
            addAditional={addAditional}
        />
    </>
}
