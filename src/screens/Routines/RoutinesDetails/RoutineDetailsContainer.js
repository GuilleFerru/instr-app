import React, { useState, useEffect, useContext } from 'react';
import { DateContext } from '../../../context/DateContext';
import { axiosGet } from '../../../Services/Axios.js';
import { TableCard } from '../../Card/TableCard';
import { useLocation, useHistory } from 'react-router-dom';
import { RoutineDetailTable } from './Table/RoutineDetailTable';


const baseUrl = process.env.REACT_APP_API_URL;

export const RoutineDetailsContainer = () => {
    const location = useLocation();
    const history = useHistory();
    const { routineScheduleId, nickname, tag, monthAndYear, routineDate } = location.state;
    const [data, setData] = useState([]);
    const { handleRoutineDate } = useContext(DateContext);

    useEffect(() => {
        handleRoutineDate(routineDate);
    }, [handleRoutineDate, location, routineDate]);

    useEffect(() => {
        const abortController = new AbortController();
        let cancel = false;
        axiosGet(`${baseUrl}/dailyWork/getDailyWorkRoutine/${routineScheduleId}`, { signal: abortController.signal }).then(res => {
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
    }, [history, routineScheduleId]);



    return <TableCard>
        <RoutineDetailTable data={data} nickname={`Rutina: ${nickname} - TAG: ${tag} - Fecha: ${monthAndYear}`} />
    </TableCard>
};