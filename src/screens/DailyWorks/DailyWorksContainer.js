import React, { useState, useContext, useEffect } from 'react';
import { DateContext } from '../../context/DateContext';
import { AuthContext } from '../../context/AuthContext';
import { TableCard } from '../Card/TableCard';
import { DailyWorksTable } from './Tables/DailyWorksTable';
import { dailyWorksDefault } from '../../Services/defaultTables.js';
import { useHistory } from 'react-router-dom';


export const DailyWorksContainer = () => {

    
    const history = useHistory();
    const { socket } = useContext(AuthContext);
    const { date, getNewDate } = useContext(DateContext);
    const [data, setData] = useState([]);
    const [roomId, setRoomId] = useState(0);
    const [dataColumns, setDataColumns] = useState([]);

    const getData = (data) => {
        setData([]);
        const { dayWorks, columns } = data;

        if (data) {
            dayWorks === undefined ? setData([]) : setData(dayWorks);
            columns === undefined ? setDataColumns([dailyWorksDefault]) : setDataColumns(columns);
        }
    };

    useEffect(() => {
        let cancel = false;
        if (socket) {
            socket.emit('get_daily_works', date);
            socket.on('get_daily_works', (data) => {
                cancel = false;
                if (!cancel) {
                    getData(data);
                    setRoomId(date);
                    socket.emit('daily_works_join_room', date);
                } else {
                    return;
                }
            });
            socket.emit('daily_works_leave_room', roomId);
            socket.on('daily_works_leave_room', () => socket.off('daily_works_leave_room'));
            return () => {
                socket.off('get_daily_works');
                cancel = true
            }
        } else {
            history.push('/error');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [date]);

    return <TableCard>
        <DailyWorksTable allData={data} dataColumns={dataColumns} getData={getData} date={date} getNewDate={getNewDate} roomId={roomId} socket={socket} />
    </TableCard>
};