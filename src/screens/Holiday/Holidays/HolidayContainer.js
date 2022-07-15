import React, { useState, useEffect } from 'react';
import { axiosGet } from '../../../Services/Axios.js';
import { useHistory } from 'react-router-dom';
import { TableCard } from '../../Card/TableCard';
import { Holiday } from './Main/Holiday.js';



const baseUrl = process.env.REACT_APP_API_URL;

export const HolidayContainer = () => {

    const history = useHistory();



    useEffect(() => {

    }, []);





    return <TableCard>
        <Holiday />
    </TableCard>
};