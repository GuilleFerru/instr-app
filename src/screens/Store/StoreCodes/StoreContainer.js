import React, { useState } from 'react';
import { TableCard } from '../../Card/TableCard';
import { StoreTable } from './Tables/StoreTable';


export const StoreContainer = () => {

    const [data, setData] = useState([{ 'id': '', 'item': '', 'smallDescription': '', 'bigDescription': '', 'unit': '', 'storeUbication': '' }]);

    const getData = (data) => {
        setData(data);
    };

    return <TableCard>
        <StoreTable getData={getData} data={data} />
    </TableCard>
};