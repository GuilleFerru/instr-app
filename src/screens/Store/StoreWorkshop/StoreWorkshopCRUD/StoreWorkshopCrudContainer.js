import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { AlertSnackbar } from '../../../../components/Alerts/AlertNormal';
import { AuthContext } from '../../../../context/AuthContext';
import { CrudForm } from './components/CrudForm';


const actionMap = {
    'delete': 'delete_crud_workshop',
    'update': 'update_crud_workshop',
    'add': 'create_crud_workshop'
};

const isValidName = (name, arr) => {
    if (!name) {
        return true;
    }
    return arr.some(arr => arr.toUpperCase() === name.toUpperCase());
}

export const StoreWorkshopCrudContainer = ({ isCrudDialogOpen, setCrudDialogOpen, types, ubications }) => {

    const history = useHistory();
    const { socket } = useContext(AuthContext);
    const [openAlert, setOpenAlert] = useState(false);
    const [alertSeverity, setAlertSeverity] = useState('');
    const [alertText, setAlertText] = useState('')

    const handleSubmit = (action, selectValue, name, radioValue) => {
        if (!socket) {
            history.push('/error');
            return;
        }
        const actionType = actionMap[action];
        if (actionType) {
            if ((actionType === 'update_crud_workshop' || actionType === 'create_crud_workshop') && isValidName(name, Object.values(radioValue === 'eqType' ? types : ubications))) {
                setAlertSeverity('error');
                setAlertText('No se pueden duplicar nombres');
            } else {
                setAlertSeverity('success');
                setAlertText('Acción realizada correctamente');
                socket.emit(actionType, { id: selectValue, name: name, crudAction: radioValue });
            }
            setOpenAlert(true);
        } else {
            console.error('Invalid action');
        }
    }
    const handleCloseAlert = (_event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenAlert(false);
    };

    return <>
        <CrudForm onSubmit={handleSubmit} isCrudDialogOpen={isCrudDialogOpen} setCrudDialogOpen={setCrudDialogOpen} types={types} ubications={ubications}></CrudForm>
        <AlertSnackbar open={openAlert} handleClose={handleCloseAlert} message={alertText} severity={alertSeverity} autoHideDuration={2000} />
    </>
}