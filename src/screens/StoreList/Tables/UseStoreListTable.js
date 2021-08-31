import { useState } from 'react'


export const useStoreListTable = () => {

    const [colDefs, setColDefs] = useState([]);
    const [data, setData] = useState();

    return {
        data,
        setData,
        colDefs,
        setColDefs
    }
}
