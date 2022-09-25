import React, { useEffect, useState } from 'react';
import { axiosGet } from '../../../Services/Axios.js';
import { useHistory } from 'react-router-dom';
import { RoutineCreateForm } from './RoutinesCreate/RoutineCreateForm';
import { RoutineEdit } from './RoutinesEdit/RoutineEdit';

const baseUrl = process.env.REACT_APP_API_URL;

export const RoutineCrudContainer = ({ isCreateDialogOpen, setIsCreateDialogOpen, isEditDialogOpen, setIsEditDialogOpen }) => {

    const history = useHistory();
    const [data, setData] = useState([]);


    useEffect(() => {
        const abortController = new AbortController();
        setData([])
        let cancel = false;
        axiosGet(`${baseUrl}/routine/getDataForRoutineCrud`, { signal: abortController.signal }).then(res => {
            const data = res;
            if (!cancel) {
                data === undefined ? setData([]) : setData(data);
            } else {
                return;
            }
        }).catch(_err => {
            history.push('/error');
        });;
        return () => {
            cancel = true;
            abortController.abort();
        }
    }, [history]);

    return <>
        <RoutineCreateForm data={data} isDialogOpen={isCreateDialogOpen} setIsDialogOpen={setIsCreateDialogOpen} />
        <RoutineEdit data={data} isDialogOpen={isEditDialogOpen} setIsDialogOpen={setIsEditDialogOpen} />
    </>
}