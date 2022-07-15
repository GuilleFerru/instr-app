import React, { useState, useEffect } from 'react';
import { axiosGet } from '../../../Services/Axios.js';
import { useHistory } from 'react-router-dom';
import { TableCard } from '../../Card/TableCard';
import { HolidayScores } from './Tables/HolidayScores';

const baseUrl = process.env.REACT_APP_API_URL;

export const HolidayScoresContainer = () => {

    const history = useHistory();
    const [data, setData] = useState([]);
    const [date, setDate] = useState(new Date());


    useEffect(() => {
        setData([])
        let cancel = false;
        axiosGet(`${baseUrl}/holidays/getScore/${date}`).then(res => {
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
        <HolidayScores allData={data} setDate={setDate} date={date} />
    </TableCard>
};