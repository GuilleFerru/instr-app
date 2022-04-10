import React, { useState, useEffect } from 'react';
import { axiosGet } from '../../../Services/Axios.js';
import { TableCard } from '../../Card/TableCard';
import { useLocation } from 'react-router-dom';
import { RoutineDetailTable } from './Table/RoutineDetailTable';
import { useHistory } from 'react-router-dom';

export const RoutineDetailsContainer = () => {
    const location = useLocation();
    const history = useHistory();
    const { routineScheduleId, nickname, tag } = location.state;
    const [data, setData] = useState([]);

    useEffect(() => {
        let cancel = false;
        axiosGet(`http://localhost:8080/api/dailyWork/getDailyWorkRoutine/${routineScheduleId}`).then(res => {
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