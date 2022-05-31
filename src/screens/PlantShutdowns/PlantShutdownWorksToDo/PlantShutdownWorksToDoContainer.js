import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../../context/AuthContext';
import { TableCard } from '../../Card/TableCard';
import { useHistory } from 'react-router-dom';
import { PlantShutdownWorksToDoTable } from './Table/PlantShutdownWorksToDoTable';


export const PlantShutdownWorksToDoContainer = () => {

    const { socket } = useContext(AuthContext);
    const history = useHistory();
    const [data, setData] = useState([]);

    useEffect(() => {
        let cancel = false;
        if (socket) {
            
            socket.emit('get_daily_works_for_plant_shutdown');
            socket.on('get_daily_works_for_plant_shutdown', (data) => {
                cancel = false;
                if (!cancel) {
                    setData(data);
                } else {
                    setData([]);
                }
            });
            return () => {
                socket.off('get_daily_works_for_plant_shutdown');
                cancel = true
            }
        } else {
            history.push('/error');
        }
    }, [history, socket]);


    return <TableCard>
        <PlantShutdownWorksToDoTable data={data} />
    </TableCard>
};