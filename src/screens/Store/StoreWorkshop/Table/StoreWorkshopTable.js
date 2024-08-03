import React, { useMemo, useState } from 'react';
import theme from '../../../../components/commonComponents/MuiTable/theme';
import { useHistory } from 'react-router-dom';
import { makeStyles } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/core";
import { TextField, } from '@material-ui/core';
import { storeWorkshopTableStyle } from "./StoreWorkshopTableStyle";
import { MuiTable } from '../../../../components/commonComponents/MuiTable/MuiTable';
import { StoreWorkshopCrudContainer } from '../StoreWorkshopCRUD/StoreWorkshopCrudContainer';


const useStyles = makeStyles((theme) => storeWorkshopTableStyle(theme));

export const StoreWorkshopTable = ({ data, types, ubications, socket}) => {

    const classes = useStyles();
    const history = useHistory();
    const [isCrudSWorkshopUbicOpen, setCrudSWorkshopUbicOpen] = useState(false);


    const columns = useMemo(
        () => [
            {
                field: 'id',
                title: 'Id',
                hidden: true,
            },
            {
                field: 'eqType',
                initialEditValue: Object.keys(types)[0],
                lookup: types, // { 1: 'Válvula', 2: 'Instrumento', 3: 'Otros' },
                title: 'Tipo',
                align: 'justify',
                width: '10%',
            },
            {
                field: 'tag',
                title: 'TAG',
                align: 'justify',
                type: 'string',
                width: '5%',
            },
            {
                field: 'item',
                title: 'Código',
                align: 'justify',
                type: 'string',
                width: '10%',
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
                width: '40%',
            },
            {
                field: 'storeWorkshopUbication',
                initialEditValue: Object.keys(ubications)[0],
                lookup: ubications,
                title: 'Ubicación',
                width: '10%',
            },
            {
                field: 'quantity',
                title: 'Cant',
                align: 'justify',
                type: 'numeric',
                width: '5%',
            },
            {
                field: 'state',
                initialEditValue: 1,
                lookup: { 1: 'Usado reparado', 2: 'Usado sin reparar', 3: 'Nuevo', 4: 'Obsoleto' },
                title: 'Estado',
                width: '10%',
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
                width: '10%',
                tooltip: 'Fecha de creación/actualización',
            },
        ],
        [types, ubications],
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
            enableCrudStoreWorkshopUbication={true}
            setCrudSWorkshopUbicOpen={setCrudSWorkshopUbicOpen}
            enablePaging={true}
            pageSize={20}
            pageSizeOptions={[20, 40, 100]}
        />
        <StoreWorkshopCrudContainer
            isCrudDialogOpen={isCrudSWorkshopUbicOpen}
            setCrudDialogOpen={setCrudSWorkshopUbicOpen}
            types={types}
            ubications={ubications}
        ></StoreWorkshopCrudContainer>

    </ThemeProvider>

}