import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useHistory } from 'react-router-dom';
import { TableCard } from '../Card/TableCard';
import { Holiday } from './Main/Holiday.js';



export const HolidayContainer = () => {

    const history = useHistory();
    const { socket } = useContext(AuthContext);
    const [data, setData] = useState([]);



    useEffect(() => {
        let cancel = false;
        if (socket) {
            socket.emit('get_holiday_data', new Date());
            socket.on('get_holiday_data', (data) => {
                cancel = false;
                if (!cancel) {
                    
                    data === undefined ? setData([]) : setData(data);
                } else {
                    return;
                }
            })
            socket.on('holiday_leave_room', () => socket.off('holiday_leave_room'));
            return () => {
                socket.off('get_holiday_data');
                cancel = true;
            }
        } else {
            history.push('/error');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);





    return <TableCard>
        <Holiday data={data} />
    </TableCard>
};