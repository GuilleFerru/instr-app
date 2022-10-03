import { useState } from 'react'


export const UseStoreTable = () => {

    const [colDefs, setColDefs] = useState([]);
    const [data, setData] = useState();

    return {
        data,
        setData,
        colDefs,
        setColDefs
    }
}
