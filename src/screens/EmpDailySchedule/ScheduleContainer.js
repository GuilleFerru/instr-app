import React, { useState, useEffect, useContext } from 'react';
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from '@material-ui/core/CircularProgress';
import { scheduleContainerStyle } from './ScheduleContainerStyle';
import { ScheduleTable } from './Table/ScheduleTable';
import { TableCard } from '../Card/TableCard';
import { AuthContext } from '../../context/AuthContext';
import { DateContext } from '../../context/DateContext';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => scheduleContainerStyle(theme));

export const ScheduleContainer = () => {

    const classes = useStyles();
    const history = useHistory();
    const { socket } = useContext(AuthContext);
    const [connected, setConnected] = useState(false);
    const { date, getNewDate } = useContext(DateContext);
    const [data, setData] = useState([]);
    const [roomId, setRoomId] = useState(0);

    useEffect(() => {
        if (socket) {
            socket.emit('get_schedule', date);
            const listener = (...args) => {
                const { id, ...rest } = args[0];
                setData([]);
                setRoomId(0);
                rest === undefined ? setData([]) : setData(rest);
                id !== undefined ? setRoomId(id) : setRoomId(0);
                setConnected(true);
                socket.emit('schedule_join_room', id);
            }
            socket.on('get_schedule', listener)
            socket.emit('schedule_leave_room', roomId);
            socket.on('schedule_leave_room', () => socket.off('schedule_leave_room'));
            return () => {
                socket.off('get_schedule', listener);
            }
        } else {
            history.push('/error');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [date]);

    return <TableCard>
        {
            connected ? (
                <ScheduleTable allData={data} roomId={roomId} date={date} getNewDate={getNewDate} socket={socket} />
            ) : (
                <div className={classes.progress}>
                    <CircularProgress />
                </div>
            )
        }
    </TableCard>
};