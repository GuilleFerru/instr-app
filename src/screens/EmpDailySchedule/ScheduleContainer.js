import React, { useState, useEffect, useContext } from 'react';
import { ScheduleTable } from './Table/ScheduleTable';
import { TableCard } from '../Card/TableCard';
import { AuthContext } from '../../context/AuthContext';
import { DateContext } from '../../context/DateContext';
import { useHistory } from 'react-router-dom';


export const ScheduleContainer = () => {

    const history = useHistory();
    const { socket } = useContext(AuthContext);
    const { date, getNewDate } = useContext(DateContext);
    const [data, setData] = useState([]);
    const [roomId, setRoomId] = useState(0);

    useEffect(() => {
        let cancel = false;
        if (socket) {
            socket.emit('get_schedule', date);
            socket.on('get_schedule', (data) => {
                cancel = false;
                if (!cancel) {
                    const { id, ...rest } = data;
                    rest === undefined ? setData([]) : setData(rest);
                    id !== undefined ? setRoomId(id) : setRoomId(0);
                    socket.emit('schedule_join_room', id);
                } else {
                    return;
                }
            })
            socket.emit('schedule_leave_room', roomId);
            socket.on('schedule_leave_room', () => socket.off('schedule_leave_room'));
            return () => {
                socket.off('get_schedule');
                cancel = true;
            }
        } else {
            history.push('/error');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [date]);

    return <TableCard>
        <ScheduleTable allData={data} roomId={roomId} date={date} getNewDate={getNewDate} socket={socket} />
    </TableCard>
};