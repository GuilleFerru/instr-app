import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TableCard } from '../../Card/TableCard';
import { useLocation } from 'react-router-dom';
import { RoutineDetailTable } from './Table/RoutineDetailTable';


export const RoutineDetailsContainer = () => {
    const location = useLocation();
    const { routineScheduleId, nickname, tag } = location.state;
    const [data, setData] = useState([]);

    useEffect(() => {
        let cancel = false;
        axios.get(`http://localhost:3001/api/dailyWork/getDailyWorkRoutine/${routineScheduleId}`).then(res => {
            const { data } = res;
            if (!cancel) {
                data === undefined ? setData([]) : setData(data);
            } else {
                return;
            }
        });
        return () => {
            cancel = true;
        }
    }, [routineScheduleId]);



    return <TableCard>
        <RoutineDetailTable data={data} nickname={`Rutina: ${nickname} - TAG: ${tag}`} />
    </TableCard>
};