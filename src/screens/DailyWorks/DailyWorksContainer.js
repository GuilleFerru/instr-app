import React from 'react';
import { TableCard } from '../Card/TableCard';
import { DailyWorksTable } from './Tables/DailyWorksTable';


export const DailyWorksContainer = () => {

    return <TableCard>
        <DailyWorksTable />
    </TableCard>
};