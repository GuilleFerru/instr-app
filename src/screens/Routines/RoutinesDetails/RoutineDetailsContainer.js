import React,{ useState, useEffect} from 'react';
import axios from 'axios';
import { TableCard } from '../../Card/TableCard';
import {useParams, useLocation } from 'react-router-dom';




export const RoutineDetailsContainer = () => {
    const location = useLocation();
    const {routineScheduleId} = location.state;
    const [data, setData] = useState([]);

    useEffect(() => {
        let cancel = false;
        axios.get(`/dailyWork/getDailyWorkRoutine/${routineScheduleId}`).then(res => {
            const {data} = res;
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
        
    </TableCard>
};