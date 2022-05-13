import React, { useState, useEffect } from 'react';
import { axiosGet } from '../../../Services/Axios.js';
import { TableCard } from '../../Card/TableCard';
import { useLocation, useHistory } from 'react-router-dom';
import { RoutineDetailTable } from './Table/RoutineDetailTable';


const baseUrl = process.env.REACT_APP_API_URL;

export const RoutineDetailsContainer = () => {
    const location = useLocation();
    const history = useHistory();
    const { routineScheduleId, nickname, tag } = location.state;
    const [data, setData] = useState([]);

    useEffect(() => {
        let cancel = false;
        axiosGet(`${baseUrl}/dailyWork/getDailyWorkRoutine/${routineScheduleId}`).then(res => {
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
    }, [history, routineScheduleId]);



    return <TableCard>
        <RoutineDetailTable data={data} nickname={`Rutina: ${nickname} - TAG: ${tag}`} />
    </TableCard>
};