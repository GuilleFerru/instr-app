import React, { useState, useEffect, useContext } from 'react';
import Badges from '../Badges/Badges';
import ScheduleIcon from '@material-ui/icons/Schedule';
import { AuthContext } from '../../context/AuthContext';
import { useHistory, Link } from 'react-router-dom';

export const OverDueRoutine = (props) => {

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
    }, [history, socket]);

    return (
        <Link to="/rutinas">
            <Badges
                tooltip="Rutinas atrasadas"
                qty={qtyOverdueRoutines}
                color={qtyOverdueRoutines === 0 ? "secondary" : "error"}
            >
                <ScheduleIcon />
            </Badges>
        </Link>
    )
}


