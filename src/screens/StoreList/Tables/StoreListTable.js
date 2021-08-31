import React from 'react'
import XLSX from 'xlsx';
import { makeStyles } from "@material-ui/core/styles";
import { useStoreListTable } from './UseStoreListTable';
import { MuiTable } from '../../../components/commonComponents/MuiTable/MuiTable'
import { storeListTableStyle } from './StoreListTableStyle'




const useStyles = makeStyles((theme) => storeListTableStyle(theme));
const EXTENSION = ['xlsx', 'xls', 'csv'];

export const StoreListTable = props => {
    const classes = useStyles();



    const { data, setData, colDefs, setColDefs, updateRow, handleAditional, bulkUpdate, handleDatePicker, date } = useStoreListTable();

    const getExention = (file) => {
        const parts = file.name.split('.');
        const extension = parts[parts.length - 1];
        return EXTENSION.includes(extension);
    }

    const convertToJson = (headers, data) => {
        const rows = [];
        data.forEach(row => {
            let rowData = {}
            row.forEach((element, index) => {
                rowData[headers[index]] = element;
                rows.push(rowData)
            })
        })
        return rows;
    }

    const importExcel = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = (event) => {
            const bstr = event.target.result;
            const workBook = XLSX.read(bstr, { type: 'binary' });
            const workSheetName = workBook.SheetNames[0];
            const workSheet = workBook.Sheets[workSheetName];
            const fileData = XLSX.utils.sheet_to_json(workSheet, { header: 1 })
            const headers = fileData[5];
            const heads = headers.map(head => ({ title: head, field: head }))
            setColDefs(heads)
            fileData.splice(0, 7)
            setData(convertToJson(headers, fileData));
        }
        if (file) {
            if (getExention(file)) {
                reader.readAsBinaryString(file)
            } else {
                alert('Archivo Invalido')
            }
        } else{
            setData([]);
            setColDefs([])
        }


    }

    return <>
        <input type='file' onChange={importExcel}></input>
        <MuiTable className={classes.table}
            title={'Listado de almacen'}
            data={data}
            setData={setData}
            dataColumns={colDefs}
            // updateRow={updateRow}
            // handleAditional={handleAditional}
            // bulkUpdate={bulkUpdate}
            // handleDatePicker={handleDatePicker}
            date={date}
            disableAddButton={true}
            disableDeleteButton={true}
            disableOnRowUpdate={true}
            disableOnBulkUpdate={true}
            disableAditionalButton={true}

        />
    </>
}
