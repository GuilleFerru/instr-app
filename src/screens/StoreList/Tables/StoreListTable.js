import React from 'react'
import XLSX from 'xlsx';
import { makeStyles } from "@material-ui/core/styles";
import { useStoreListTable } from './UseStoreListTable';
import { MuiTable } from '../../../components/commonComponents/MuiTable/MuiTable'
import { storeListTableStyle } from './StoreListTableStyle'




const useStyles = makeStyles((theme) => storeListTableStyle(theme));

export const StoreListTable = props => {
    const classes = useStyles();



    const { data, setData, colDefs, setColDefs, updateRow, handleAditional, bulkUpdate, handleDatePicker, date } = useStoreListTable();

    const importExcel=(e)=>{

    }

    return <>
    <input type='file' onChange={importExcel}></input>
        <MuiTable className={classes.table}
            title={'Listado de almacen'}
            data={data}
            setData={setData}
            dataColumns={colDefs}
            updateRow={updateRow}
            handleAditional={handleAditional}
            bulkUpdate={bulkUpdate}
            handleDatePicker={handleDatePicker}
            date={date}
            disableAddButton = {true}
            disableDeleteButton = {true}
            disableOnRowUpdate = {true}
            disableOnBulkUpdate = {true}
            disableAditionalButton={true}

        />
    </>
}
