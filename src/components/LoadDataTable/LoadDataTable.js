import React, { useState, useEffect } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';


export const LoadDataTable = ({ data }) => {


    const [loadingData, setLoadingData] = useState(true);

    useEffect(() => {
        setLoadingData(true);
        data.length > 0 ? setLoadingData(false) : setLoadingData(true);
        const timer = setTimeout(() => setLoadingData(false), 25000);
        return () => clearTimeout(timer);
    }, [data]);

    return <>
        {loadingData ? (
            <CircularProgress size='5rem' color="inherit" />
        ) : (
            <span>No existen filas para mostrar</span>
        )}
    </>
}


