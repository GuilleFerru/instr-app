import React, { useState, useEffect, useContext } from 'react';
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from '@material-ui/core/CircularProgress';
import { StoreReclaimsTable } from './Tables/StoreReclaimsTable';
import { storeReclaimsContainerStyle } from './StoreReclaimsContainerStyle';

import { TableCard } from '../../Card/TableCard';
import { AuthContext } from '../../../context/AuthContext';
//import { DateContext } from '../../context/DateContext';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => storeReclaimsContainerStyle(theme));

export const StoreReclaimsContainer = () => {

    const classes = useStyles();
    const history = useHistory();
    const { socket } = useContext(AuthContext);
    const [connected, setConnected] = useState(true);
    
    
    const [data, setData] = useState([]);
    //const [roomId, setRoomId] = useState(0);

    useEffect(() => {
        if (socket) {
            socket.emit('get_store_claims');
            const listener = (...args) => {
                data === undefined ? setData([]) : setData(args[0]);
                //setRoomId(0);
                setConnected(true);
                //socket.emit('schedule_join_room', id);
            }
            socket.on('get_store_claims', listener)
            //socket.emit('schedule_leave_room', roomId);
            // eslintsocket.on('schedule_leave_room', () => socket.off('schedule_leave_room'));
            return () => {
                socket.off('get_store_claims', listener);
            }
        } else {
            history.push('/error');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return <TableCard>
        {
            connected ? (
                <StoreReclaimsTable allData={data} socket={socket} />
            ) : (
                <div className={classes.progress}>
                    <CircularProgress />
                </div>
            )
        }
    </TableCard>
};