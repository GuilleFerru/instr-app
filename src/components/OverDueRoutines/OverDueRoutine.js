import React, { useState, useEffect, useContext } from 'react';
import Badges from '../Badges/Badges';
import { makeStyles } from '@material-ui/core/styles';
import ScheduleIcon from '@material-ui/icons/Schedule';
import { AuthContext } from '../../context/AuthContext';
import { useHistory, Link } from 'react-router-dom';



const useStyles = makeStyles((theme) => ({
    link: {
        display: 'flex',
        textDecoration: 'none',
        cursor: 'pointer'
    },
}));


export const OverDueRoutine = (props) => {

    const classes = useStyles();
    const { socket } = useContext(AuthContext);
    const history = useHistory();
    const [qtyOverdueRoutines, setQtyOverdueRoutines] = useState(0);

    useEffect(() => {
        let cancel = false;
        if (socket) {
            socket.emit('get_qtyOverDueRoutines');
            socket.on('get_qtyOverDueRoutines', (data) => {
                cancel = false;
                if (!cancel) {
                    setQtyOverdueRoutines(data);
                } else {
                    return;
                }
            });
            return () => {
                socket.off('get_qtyOverDueRoutines');
                cancel = true
            }
        } else {
            history.push('/error');
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Link to="/rutinas" className={classes.link}>
            <Badges
                tooltip="Rutinas atrasadas"
                qty={qtyOverdueRoutines}
                color={qtyOverdueRoutines === 0 ? "primary" : "error"}
            >
                <ScheduleIcon color={qtyOverdueRoutines === 0 ? "disabled" : "error"} />
            </Badges>
        </Link>
    )
}


