import React from 'react';
import { TableCard } from '../Card/TableCard';
import { PlantShutdownsTable } from './Table/PlantShutdownsTable';


export const PlantShutdownsContainer = () => {



    return <TableCard>
        <PlantShutdownsTable allData={[]} />
    </TableCard>
};