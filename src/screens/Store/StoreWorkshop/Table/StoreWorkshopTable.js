import React, { useMemo } from 'react';
import theme from '../../../../components/commonComponents/MuiTable/theme';
import { useHistory } from 'react-router-dom';
import { makeStyles } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/core";
import { TextField, } from '@material-ui/core';
import { storeWorkshopTableStyle } from "./StoreWorkshopTableStyle";
import { MuiTable } from '../../../../components/commonComponents/MuiTable/MuiTable';


const useStyles = makeStyles((theme) => storeWorkshopTableStyle(theme));

export const StoreWorkshopTable = ({ data, socket }) => {

    const classes = useStyles();
    const history = useHistory();


    const columns = useMemo(
        () => [
            {
                field: 'id',
                title: 'Id',
                hidden: true,
            },
            {
                field: 'eqType',
                initialEditValue: 1,
                lookup: {
                    1: 'Válvula',
                    2: 'Instrumento',
                    3: 'Otros',
                },
                title: 'Tipo',
                align: 'justify',
                width: '10%',
            },
            {
                field: 'tag',
                title: 'TAG',
                align: 'justify',
                type: 'string',
                width: '10%',
            },
            {
                field: 'item',
                title: 'Código almacén',
                align: 'justify',
                type: 'string',
                width: '15%',
            },
            {
                field: 'bigDescription',
                title: 'Descripción ',
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
                width: '35%',
            },
            {
                field: 'storeWorkshopUbication',
                initialEditValue: 1,
                lookup: {
                    1: 'CP-EST1',
                    2: 'CP-EST2',
                    3: 'CP-ARM1',
                    4: 'CP-ARM2',
                    6: 'CON-ZN1',
                },
                title: 'Ubicación',
                width: '10%',
            },
            {
                field: 'quantity',
                title: 'Cantidad',
                type: 'numeric',
                width: '5%',
            },
            {
                field: 'date',
                title: 'Fecha',
                type: 'date',
                dateSetting: {
                    "locale": "es-AR",
                    "format": "dd-MMM-yyyy"
                },
                filtering: false,
                initialEditValue: new Date(),
                width: '15%',
                tooltip: 'Fecha de creación/actualización',
            },
        ],
        [],
    );

    const rowAdd = (newRow, resolve) => {
        const newStoreWorkshop = newRow;
        socket ? socket.emit('create_store_workshop', newStoreWorkshop) : history.push('/error');
        resolve();
    }

    const updateRow = (newData, oldData, resolve) => {
        const dataUpdate = [...data];
        const target = dataUpdate.find((el) => el.id === oldData.tableData.id);
        const index = dataUpdate.indexOf(target);
        dataUpdate[index] = newData;
        socket ? socket.emit('update_store_workshop', newData) : history.push('/error');
        resolve();
        return dataUpdate;
    }

    const deleteRow = (selectedRow, resolve) => {
        socket ? socket.emit('delete_store_workshop', selectedRow) : history.push('/error');
        resolve();
    }


    return <ThemeProvider theme={theme}>
        <MuiTable className={classes.table}
            data={data}
            dataColumns={columns}
            rowAdd={rowAdd}
            updateRow={updateRow}
            deleteRow={deleteRow}
            disableSubTitle={false}
            title={'LISTADO ITEMS EN TALLER'}
            searchPlaceHolder={'Buscar por código o descripción'}
            pdfTitle={`Listado de stock en taller`}
            disableAddButton={false}
            disableDeleteButton={false}
            disableOnRowUpdate={false}
            disableColumnButton={false}
            disableGroupingOption={false}
            disableDefaultSearch={false}
            disableInitialFormData={false}
            enableDuplicateButton={true}
            enablePaging={true}
            pageSize={20}
            pageSizeOptions={[20, 40, 100]}

        />

    </ThemeProvider>

}