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

    const [connected, setConnected] = useState(false);
    const { socket } = useContext(AuthContext);

    useEffect(() => {
        if (socket) {
            socket.emit('get_store_workshop');
            const listener = (...args) => {
                data === undefined ? setData([]) : setData(args[0]);
                setConnected(true);
            }
            socket.on('get_store_workshop', listener)
            return () => {
                socket.off('get_store_workshop', listener);
            }
        } else {
            history.push('/error');
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    return <TableCard>
        {connected ? (
            <StoreWorkshopTable data={data} setData={setData} socket={socket}></StoreWorkshopTable>
        ) : (
            <div className={classes.progress}>
                <CircularProgress />
            </div>
        )
        }
    </TableCard>
};