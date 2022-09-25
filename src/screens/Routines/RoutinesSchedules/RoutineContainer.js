import React, { useState, useEffect, useContext } from 'react';
import { DateContext } from '../../../context/DateContext';
import { axiosGet } from '../../../Services/Axios.js';
import { useHistory } from 'react-router-dom';
import { TableCard } from '../../Card/TableCard';
import { RoutineTable } from './Table/RoutineTable';

const baseUrl = process.env.REACT_APP_API_URL;



export const RoutineContainer = () => {

    const history = useHistory();
    const { routineDate } = useContext(DateContext);
    const [data, setData] = useState([]);
    const [date, setDate] = useState(new Date());

    useEffect(() => {
        routineDate && setDate(routineDate);
    }, [routineDate]);


    useEffect(() => {
        const abortController = new AbortController();
        setData([])
        let cancel = false;
        axiosGet(`${baseUrl}/routine/getAllRoutines/${date}`, { signal: abortController.signal }).then(res => {
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

    }, [date, history]);

    return <TableCard>
        <RoutineTable allData={data} setDate={setDate} date={date} />
    </TableCard>
};