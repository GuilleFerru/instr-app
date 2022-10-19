import React, { useState } from 'react';
import { TableCard } from '../../Card/TableCard';
import { StoreTable } from './Tables/StoreTable';


export const StoreContainer = () => {

    const [data, setData] = useState([{ 'id': '', 'item': '', 'smallDescription': '', 'bigDescription': '', 'unit': '', 'storeUbication': '' }]);
    //const [date, setDate] = useState(undefined);
    const [subTitle, setSubTitle] = useState('');

    const getData = (data) => {
        setData(data.items);
        setSubTitle(`Listado actualizado al ${new Date(data.date).toLocaleDateString()}`)
        
    };

    return <TableCard>
        <StoreTable getData={getData} data={data} subTitle={subTitle} />
    </TableCard>
};