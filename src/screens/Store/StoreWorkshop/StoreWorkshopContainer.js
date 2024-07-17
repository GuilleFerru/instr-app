import React, { useState, useContext, useEffect } from 'react';
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from '@material-ui/core/CircularProgress';
import { AuthContext } from '../../../context/AuthContext';
import { TableCard } from '../../Card/TableCard';
import { useHistory } from 'react-router-dom';
import { StoreWorkshopTable } from './Table/StoreWorkshopTable';
import { storeWorkshopContainerStyle } from './StoreWorkshopContainerStyle';

const useStyles = makeStyles((theme) => storeWorkshopContainerStyle(theme));

export const StoreWorkshopContainer = () => {

    const classes = useStyles();
    const history = useHistory();
    const [data, setData] = useState([]);
    const [types, setTypes] = useState([]);
    const [ubications, setUbications] = useState([]);

    const [connected, setConnected] = useState(false);
    const { socket } = useContext(AuthContext);

    useEffect(() => {
        if (socket) {
            socket.emit('get_store_workshop');
            const listener = (...args) => {
                args === undefined ? setData([]) : setData(args[0].storeWorkshopResp);
                args === undefined ? setTypes([]) : setTypes(args[0].typesReduced);
                args === undefined ? setUbications([]) : setUbications(args[0].ubicationsReduced);
                setConnected(true);
            }
            socket.on('get_store_workshop', listener)
            return () => {
                socket.off('get_store_workshop', listener);
            }
        } else {
            history.push('/error');
        }
        
    }, [history, socket])


    return <TableCard>
        {connected ? (
            <StoreWorkshopTable data={data} types={types} ubications={ubications} socket={socket}></StoreWorkshopTable>
        ) : (
            <div className={classes.progress}>
                <CircularProgress />
            </div>
        )
        }
    </TableCard>
};