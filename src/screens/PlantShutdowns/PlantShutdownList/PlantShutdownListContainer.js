import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { TableCard } from '../../Card/TableCard';
import { PlantShutdownListTable } from './Table/PlantShutdownListTable';
import { AuthContext } from '../../../context/AuthContext';


export const PlantShutdownListContainer = () => {

    const history = useHistory();
    const { socket } = useContext(AuthContext);
    const [data, setData] = useState([]);
    const [date, setDate] = useState(new Date());

    useEffect(() => {
        let cancel = false;
        if (socket) {
            socket.emit('get_plant_shutdowns', date);
            socket.on('get_plant_shutdowns', (data) => {
                cancel = false;
                if (!cancel) {
                    data === undefined ? setData([]) : setData(data);
                } else {
                    return;
                }
            })
            // socket.emit('schedule_leave_room');
            // socket.on('schedule_leave_room', () => socket.off('schedule_leave_room'));
            return () => {
                socket.off('get_plant_shutdowns');
                cancel = true;
            }
        } else {
            history.push('/error');
        }
    }, [date, history, socket]);



    return <TableCard>
        <PlantShutdownListTable allData={data} setDate={setDate} date={date} />
    </TableCard>
};