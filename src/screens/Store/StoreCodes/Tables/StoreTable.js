import React from 'react'
import XLSX from 'xlsx';
//import { makeStyles } from "@material-ui/core/styles";
import { Input } from '@mui/material';
import { axiosPost } from '../../../../Services/Axios.js';
//import { MuiTable  } from '../../../../components/commonComponents/MuiTable/MuiTable'
//import { storeTableStyle } from './StoreTableStyle'



const baseUrl = process.env.REACT_APP_API_URL;
//const useStyles = makeStyles((theme) => storeTableStyle(theme));
const EXTENSION = ['xlsx', 'xls', 'csv'];

export const StoreTable = props => {

    //const classes = useStyles();

    // const [colDefs, setColDefs] = useState([]);
    // const [data, setData] = useState([]);


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
                if (headers[index] !== 'STK.ACT.') {
                    if (headers[index] === 'DESCRIPCION AMPLIADA') {
                        rowData['bigDescription'] = element;
                    } else if (headers[index] === 'DESCRIPCION REDUCIDA') {
                        rowData['smallDescription'] = element;
                    } else if (headers[index] === 'U.FISICA') {
                        rowData['storeUbication'] = element;
                    } else if (headers[index] === 'UM') {
                        rowData['unit'] = element;
                    } else if (headers[index] === 'ITEM') {
                        rowData['item'] = element;
                    }
                }
            })
            rows.push(rowData)
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


            console.log('fileData', heads)
            fileData.splice(0, 7);
            axiosPost(`${baseUrl}/store/uploadStoreItems`, convertToJson(headers, fileData))
            //axiosPost('http://localhost:3001/api/store/import', convertToJson(headers, fileData))
            console.log(convertToJson(headers, fileData))

        }
        if (file) {
            if (getExention(file)) {
                reader.readAsBinaryString(file)
            } else {
                alert('Archivo Invalido')
            }
        } else {
            //setData([]);
            //setColDefs([])
        }


    }

    return <>

        <Input type='file' onChange={importExcel}></Input>
        {/* <MuiTable className={classes.table}
            title={'Listado de almacen'}
            data={data}
            setData={setData}
            dataColumns={colDefs}
            pageSize={15}
            // updateRow={updateRow}
            // handleAditional={handleAditional}
            // bulkUpdate={bulkUpdate}
            // handleDatePicker={handleDatePicker}
            //date={date}
            disableAddButton={true}
            disableDeleteButton={true}
            disableOnRowUpdate={true}
            disableOnBulkUpdate={true}
            disableAditionalButton={true}
        /> */}
    </>
}
