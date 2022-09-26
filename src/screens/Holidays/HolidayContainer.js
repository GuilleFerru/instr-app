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
        if (socket) {
            socket.emit('get_holiday_data', new Date());
            const listener = (...args) => {
                data === undefined ? setData([]) : setData(args[0]);
            }
            socket.on('get_holiday_data', listener)
            return () => {
                socket.off('get_holiday_data', listener);
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