import React, { useState, useEffect, useContext } from 'react';
import { axiosGet } from '../../Services/Axios.js';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { TableCard } from '../Card/TableCard';
import { Dashboard } from './Main/Dashboard';


const baseUrl = process.env.REACT_APP_API_URL;


const defaultData = [['N/A', 'N/A', 'N/A'], ['N/A', 'N/A', 'N/A'], ['N/A', 'N/A'], ['N/A', 'N/A', 'N/A']]



export const DashboardContainer = () => {

    const history = useHistory();
    const [data, setData] = useState([]);
    const { isFetching } = useContext(AuthContext);


    useEffect(() => {
        new Promise((resolve) => {
            resolve(!isFetching)
        }).then(() => {
            let cancel = false;
            axiosGet(`${baseUrl}/dashboard/get/${new Date()}`).then(res => {
                const data = res;
                if (!cancel) {
                    data.includes(null) ? setData(defaultData) : setData(data);
                } else {
                    return;
                }
            }).catch(_err => {
                history.push('/error');
            });;
            return () => {
                cancel = true;
            }
        })

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    return <TableCard>
        <Dashboard widgetData={data} />
    </TableCard>
};