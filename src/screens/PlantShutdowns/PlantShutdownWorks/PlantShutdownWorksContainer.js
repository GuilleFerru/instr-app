import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../../context/AuthContext';
import { TableCard } from '../../Card/TableCard';
import { useLocation, useHistory } from 'react-router-dom';
import { PlantShutdownWorkTable } from './Table/PlantShutdownWorkTable';
import { formatDate } from '../../../Services/DateUtils';




export const PlantShutdownWorksContainer = () => {

    const { socket } = useContext(AuthContext);
    const location = useLocation();
    const history = useHistory();
    const { id, name, beginDate,timeSchedule } = location.state;
    const [data, setData] = useState([]);

    useEffect(() => {
        let cancel = false;
        if (socket) {
            socket.emit('get_plant_shutdown_works', id);
            socket.on('get_plant_shutdown_works', (data) => {
                
                cancel = false;
                if (!cancel) {
                    setData(data);
                } else {
                    setData([]);
                }
            });
            return () => {
                socket.off('get_plant_shutdown_works');
                cancel = true
            }
        } else {
            history.push('/error');
        }
    }, [history, id, socket]);



    return <TableCard>
        <PlantShutdownWorkTable data={data} nickname={`${name} - Inicio: ${formatDate(beginDate)}`} plantShutdownId={id} timeSchedule={timeSchedule} />
    </TableCard>
};