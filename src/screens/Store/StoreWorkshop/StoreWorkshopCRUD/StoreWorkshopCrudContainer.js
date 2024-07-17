import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../../../../context/AuthContext';
import { CrudForm } from './components/CrudForm';


const actionMap = {
    'delete': 'delete_crud_workshop',
    'update': 'update_crud_workshop',
    'add': 'create_crud_workshop'
};

export const StoreWorkshopCrudContainer = ({ isCrudDialogOpen, setCrudDialogOpen, types, ubications }) => {

    const history = useHistory();
    const { socket } = useContext(AuthContext);


    const handleSubmit = (action, selectValue, name, radioValue) => {
        if (!socket) {
            history.push('/error');
            return;
        }
        const actionType = actionMap[action];
        if (actionType) {
            socket.emit(actionType, { id: selectValue, name: name, crudAction: radioValue });
            //setCrudDialogOpen(false);
        } else {
            console.error('Invalid action');
        }
    }

    return <>
        <CrudForm onSubmit={handleSubmit} isCrudDialogOpen={isCrudDialogOpen} setCrudDialogOpen={setCrudDialogOpen} types={types} ubications={ubications}></CrudForm>
    </>
}