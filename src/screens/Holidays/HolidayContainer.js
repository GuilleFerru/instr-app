import React, { useState, useEffect, useMemo } from 'react';
import { axiosGet } from '../../Services/Axios.js';
import { useHistory } from 'react-router-dom';
import { TableCard } from '../Card/TableCard';
import { Holiday } from './Main/Holiday.js';

const baseUrl = process.env.REACT_APP_API_URL;

export const HolidayContainer = () => {

    const history = useHistory();
    const [data, setData] = useState([]);
    const [date, setDate] = useState(new Date());
    const allData = useMemo(() => data, [data]);


    useEffect(() => {
        setData([])
        let cancel = false;
        axiosGet(`${baseUrl}/holidays/getData/${date}`).then(res => {
            const data = res;
            if (!cancel) {
                data === undefined ? setData([]) : setData(data);
            } else {
                return;
            }
        }).catch(_err => {
            history.push('/error');
        });;
        return () => {
            cancel = true;
        }
    }, [date, history]);


    return <TableCard>
        <Holiday data={allData} setDate={setDate} date={date} />
    </TableCard>
};