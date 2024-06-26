import React, { useMemo, useState } from 'react';
import XLSX from 'xlsx';
import ThemeProvider from "@material-ui/styles/ThemeProvider";
import theme from '../../../../components/commonComponents/MuiTable/theme';
import { axiosGet } from '../../../../Services/Axios.js';
import { useHistory } from 'react-router-dom';
import { makeStyles } from "@material-ui/core/styles";
import Backdrop from '../../../../components/Backdrop/Backdrop';
import { MySearchBar } from '../../../../components/commonComponents/Controls/SearchBar';
import { TextField, } from '@material-ui/core';
import { axiosPost } from '../../../../Services/Axios.js';
import { MuiTable } from '../../../../components/commonComponents/MuiTable/MuiTable';
import { storeTableStyle } from './StoreTableStyle';



const baseUrl = process.env.REACT_APP_API_URL;
const useStyles = makeStyles((theme) => storeTableStyle(theme));
const EXTENSION = ['xlsx', 'xls', 'csv'];


export const StoreTable = ({ getData, data, subTitle }) => {

    const classes = useStyles();
    const history = useHistory();

    const columns = useMemo(
        () => [
            // {
            //     field: '_id',
            //     title: 'Id',
            //     hidden: true,
            // },
            {
                field: 'item',
                title: 'Item',
                width: '5%',
            },
            {
                field: 'smallDescription',
                title: 'Descripción reducida',
                multiline: true,
                editComponent: ({ value, onChange }) => (
                    <TextField
                        onChange={e => onChange(e.target.value)}
                        value={value}
                        multiline
                    />
                ),
                align: 'justify',
                type: 'string',
                width: '20%',
            },
            {
                field: 'bigDescription',
                title: 'Descripción ampliada',
                multiline: true,
                editComponent: ({ value, onChange }) => (
                    <TextField
                        onChange={e => onChange(e.target.value)}
                        value={value}
                        multiline
                    />
                ),
                align: 'justify',
                type: 'string',
                width: '50%',
            },
            {
                field: 'unit',
                title: 'Unidad',
                width: '5%',
            },
            {
                field: 'storeUbication',
                title: 'Ubicación',
                width: '10%',
            },
            {
                field: 'quantity',
                title: 'Cantidad',
                width: '10%',
            },
        ],
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [],
    );
    const [onLoading, setOnLoading] = useState(false);



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
                if (headers[index] === 'STK.ACT.') {
                    rowData['quantity'] = element;
                } else if (headers[index] === 'DESCRIPCION AMPLIADA') {
                    rowData['bigDescription'] = typeof element === 'string' ? element.replace(/\s+/g, ' ').trim() : element;
                } else if (headers[index] === 'DESCRIPCION REDUCIDA') {
                    rowData['smallDescription'] = typeof element === 'string' ? element.replace(/\s+/g, ' ').trim() : element;;
                } else if (headers[index] === 'U.FISICA') {
                    rowData['storeUbication'] = element;
                } else if (headers[index] === 'UM') {
                    rowData['unit'] = element;
                } else if (headers[index] === 'ITEM') {
                    rowData['item'] = element;
                }

            })
            rows.push(rowData)
        })
        return rows;
    }

    const importExcel = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        setOnLoading(true);
        reader.onload = (event) => {
            const bstr = event.target.result;
            const workBook = XLSX.read(bstr, { type: 'binary' });
            const workSheetName = workBook.SheetNames[0];
            const workSheet = workBook.Sheets[workSheetName];
            const fileData = XLSX.utils.sheet_to_json(workSheet, { header: 1 })
            const headers = fileData[5];
            //const heads = headers.map(head => ({ title: head, field: head }))
            const excelDate = fileData.splice(0, 7)[1][5];
            const date = excelDate ? new Date(Math.round((excelDate - (25567 + 1)) * 86400 * 1000)) : new Date();
            const data = {
                date: date,
                items: convertToJson(headers, fileData)
            }
            axiosPost(`${baseUrl}/store/uploadStoreItems`, data).then(res => {
                res && setOnLoading(false);
            })
        }
        if (file) {
            if (getExention(file)) {
                reader.readAsBinaryString(file)
            } else {
                alert('Archivo Invalido')
            }
        }
    }

    const searchData = (value) => {
        if (value) {
            setOnLoading(true);
            axiosGet(`${baseUrl}/store/searchBy/${value}`).then(data => {
                getData(data);
                setOnLoading(false);
            }).catch(_err => {
                history.push('/error');
            });
        } else {
        }
    }

    return <ThemeProvider theme={theme}>
            <MuiTable className={classes.table}
                title={'LISTADO ITEMS ALMACEN'}
                subTitle={subTitle}
                disableSubTitle={false}
                data={data}
                dataColumns={columns}
                disableCustomSearch={false}
                CustomSearchBar={MySearchBar}
                searchPlaceHolder={'Buscar por código o descripción'}
                searchData={searchData}
                enablePaging={true}
                pageSize={20}
                pageSizeOptions={[20, 40, 100]}
                disableAddButton={true}
                disableDeleteButton={true}
                disableOnRowUpdate={true}
                disableOnBulkUpdate={true}
                disableAditionalButton={true}
                enableLoadNewStoreItemsButton={true}
                handleLoadNewStoreItems={importExcel}
            />
            <Backdrop open={onLoading} />
        </ThemeProvider >
}

