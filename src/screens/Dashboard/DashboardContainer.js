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
    const [widgetData, setWidgetData] = useState([]);
    const [dataManteinanceType, setDataManteinanceType] = useState([]);
    const [dataManteinance, setDataManteinance] = useState([]);
    const { isFetching } = useContext(AuthContext);
    const [monthAndYear, setMonthAndYear] = useState(new Date());


    useEffect(() => {
        new Promise((resolve) => {
            resolve(!isFetching)
        }).then(() => {
            const abortController = new AbortController();
            let cancel = false;
            axiosGet(`${baseUrl}/dashboard/getWidgetData/${new Date()}`, { signal: abortController.signal }).then(res => {
                const data = res;
                if (!cancel) {
                    data.includes(null) ? setWidgetData(defaultData) : setWidgetData(data);
                } else {
                    return;
                }
            }).catch(_err => {
                history.push('/error');
            });;
            return () => {
                cancel = true;
                abortController.abort();
            }
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {

        new Promise((resolve) => {
            resolve(!isFetching)
        }).then(() => {
            const abortController = new AbortController();
            let cancel = false;
            axiosGet(`${baseUrl}/dashboard/getChartsData/${monthAndYear}`, { signal: abortController.signal }).then(res => {
                const data = res;
                if (!cancel) {
                    data === undefined ? setDataManteinanceType([]) : setDataManteinanceType(data[0]);
                    data === undefined ? setDataManteinance([]) : setDataManteinance(data[1]);
                } else {
                    return;
                }
            }).catch(_err => {
                history.push('/error');
            });;
            return () => {
                cancel = true;
                abortController.abort();
            }
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [monthAndYear]);


    const handleMonthAndYear = (e) => {
        setMonthAndYear(e.target.value);
    }


    return <TableCard>
        <Dashboard widgetData={widgetData} manteinanceActionsData={dataManteinanceType} manteinanceData={dataManteinance} handleMonthAndYear={handleMonthAndYear} monthAndYear={monthAndYear} />
    </TableCard>
};