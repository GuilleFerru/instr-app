import React, { useState, useContext, useEffect } from 'react';
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from '@material-ui/core/CircularProgress';
import { DateContext } from '../../context/DateContext';
import { AuthContext } from '../../context/AuthContext';
import { TableCard } from '../Card/TableCard';
import { DailyWorksTable } from './Tables/DailyWorksTable';
import { dailyWorksDefault } from '../../Services/defaultTables.js';
import { dailyWorksContainerStyle } from './DailyWorksContainerStyle';
import { useHistory } from 'react-router-dom';
import { TableCustomComponents } from './Tables/CustomComponents/TableCustomComponents';

const useStyles = makeStyles((theme) => dailyWorksContainerStyle(theme));

export const DailyWorksContainer = () => {

    const classes = useStyles();
    const history = useHistory();
    const { socket } = useContext(AuthContext);
    const [connected, setConnected] = useState(false);
    const { date, getNewDate } = useContext(DateContext);
    const [data, setData] = useState([]);
    const [roomId, setRoomId] = useState(0);
    const [dataColumns, setDataColumns] = useState([]);
    const [disableButtons, setDisableButtons] = useState();
    const {
        createOptions,
        createAutocomplete,
        createTextField
    } = TableCustomComponents();



    const getData = (data) => {
        setData([]);
        const { dayWorks, columns } = data;


        const plantOptions = createOptions(columns[2].lookup);
        const attelierOptions = createOptions(columns[3].lookup);

        data.columns.forEach((column) => {
            if (column.field === 'plant') {
                column.editComponent = (props) => (
                    createAutocomplete(props, plantOptions, classes, column.field, true)
                )
            }
            if (column.field === 'attelier') {
                column.editComponent = (props) => (
                    createAutocomplete(props, attelierOptions, classes, column.field, false)
                )
            }
            if (column.field === 'description') {
                column.editComponent = (props) => createTextField(props, classes, column.field, 'Descripción de la tarea')
            }
        })
        if (data) {
            dayWorks === undefined ? setData([]) : setData(dayWorks);
            columns === undefined ? setDataColumns([dailyWorksDefault]) : setDataColumns(columns);
        }
    };

    useEffect(() => {
        if (socket) {
            socket.emit('get_daily_works', date);
            const listener = (...args) => {
                args[0].dayWorks.length === 0 ? setDisableButtons(true) : setDisableButtons(false);
                getData(args[0]);
                setRoomId(date);
                setConnected(true);
                socket.emit('daily_works_join_room', date);
            }
            socket.on('get_daily_works', listener)
            socket.emit('daily_works_leave_room', roomId);
            socket.on('daily_works_leave_room', () => socket.off('daily_works_leave_room'));
            return () => {
                socket.off('get_daily_works', listener);
            }
        } else {
            history.push('/error');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [date]);

    return <TableCard>
        {connected ? (
            <DailyWorksTable allData={data} dataColumns={dataColumns} getData={getData} date={date} getNewDate={getNewDate} roomId={roomId} socket={socket} disableButtons={disableButtons} />
        ) : (
            <div className={classes.progress}>
                <CircularProgress />
            </div>
        )
        }
    </TableCard>
};