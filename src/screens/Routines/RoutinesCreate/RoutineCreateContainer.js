import React, { useEffect, useState } from 'react';
import { axiosGet } from '../../../Services/Axios.js';
import { useHistory } from 'react-router-dom';
import { TableCard } from '../../Card/TableCard';
import { RoutineCreateForm } from './Forms/RoutineCreateForm';

const baseUrl = process.env.REACT_APP_API_URL;

export const RoutineCreateContainer = ({ isDialogOpen, setIsDialogOpen }) => {

    const history = useHistory();
    const [data, setData] = useState([]);


    useEffect(() => {
        setData([])
        let cancel = false;
        axiosGet(`${baseUrl}/routine/getDataForRoutineCreate`).then(res => {
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
        }
    }, [history]);

    return <TableCard>
        <RoutineCreateForm isDialogOpen={isDialogOpen} setIsDialogOpen={setIsDialogOpen} data={data} />
    </TableCard>
};