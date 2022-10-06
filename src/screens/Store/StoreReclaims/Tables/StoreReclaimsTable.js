import React, { useState, useEffect, useContext, useMemo, useRef } from 'react';
import ThemeProvider from "@material-ui/styles/ThemeProvider";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from 'react-router-dom';
import { muiTableCommonActions } from '../../../../components/commonComponents/MuiTable/MuiTableCommonActions';
import { AuthContext } from '../../../../context/AuthContext';
import theme from '../../../../components/commonComponents/MuiTable/theme';
import { MuiTable } from '../../../../components/commonComponents/MuiTable/MuiTable';
import { storeReclaimsTableStyle } from './StoreReclaimsTableStyle';
import { StoreReclaimsEmail } from '../Form/StoreReclaimsEmail';
import { Alerts } from '../../components/Alerts';
//import emailjs from '@emailjs/browser';

const useStyles = makeStyles((theme) => storeReclaimsTableStyle(theme));


export const StoreReclaimsTable = ({ allData, socket }) => {

    const classes = useStyles();
    const history = useHistory();
    const { getNewDataBulkEdit } = muiTableCommonActions();
    const { user } = useContext(AuthContext);
    const isMounted = useRef(false);
    const [data, setData] = useState([])
    const [itemsToClaim, setItemsToClaim] = useState([]);
    const [itemsToClaimQty, setItemsToClaimQty] = useState(0);
    const [openSendMailDialog, setOpenSendMailDialog] = useState(false);
    const [openAlert, setOpenAlert] = useState(false);
    const [values, setValues] = useState({
        name: '',
        email: '',
        message: '',
    });

    useEffect(() => {
        if (isMounted.current) {
            setData(allData);
            setItemsToClaim([]);
            setItemsToClaimQty(0);
        } else {
            isMounted.current = true;
        }
    }, [allData]);


    const columns = useMemo(
        () => [
            {
                field: 'id',
                title: 'Id',
                hidden: true,
            },
            {
                field: 'item',
                title: 'Item',
                width: '15%',
            },
            {
                field: 'description',
                title: 'Descripción',
                multiline: true,
                type: 'string',
                width: '25%',

            },
            {
                field: 'nonstockdate',
                title: 'Fecha de Stock cero',
                type: 'date',
                dateSetting: {
                    "locale": "es-AR",
                    "format": "dd-MMM-yyyy"
                },
                filtering: false,
                initialEditValue: new Date(),
                width: '15%',
            },
            {
                field: 'claimdate',
                title: 'Fecha de reclamo',
                type: 'date',
                dateSetting: {
                    "locale": "es-AR",
                    "format": "dd-MMM-yyyy"
                },
                filtering: false,
                width: '15%',
                // editComponent: props => (
                //     <MuiPickersUtilsProvider utils={DateFnsUtils}
                //         locale={props.dateTimePickerLocalization}>
                //         <DatePicker
                //             format="dd/MM/yyyy"
                //             value={props.value || null}
                //             onChange={props.onChange}
                //             clearable
                //             InputProps={{
                //                 style: {
                //                     fontSize: 13,
                //                 }
                //             }}
                //         />
                //     </MuiPickersUtilsProvider>
                // )
                //initialEditValue: new Date()
            },
            {
                field: 'claimed',
                title: 'Reclamado',
                type: 'boolean',
                cellStyle: (_data, rowData) => {
                    if (rowData?.claimed && !rowData?.addedToClaim) {
                        return {
                            color: '#4caf50',
                            textAlign: 'left'
                        }
                    } else if (rowData?.addedToClaim) {
                        return {
                            color: '#ff9800',
                            textAlign: 'left'
                        }
                    } else {
                        return {
                            color: '#f44336',
                            textAlign: 'left'
                        }
                    }
                },
                initialEditValue: false,
                width: '5%',
            },
            {
                field: 'claimedBy',
                title: 'Reclamado por',
                //initialEditValue: ((rowData) => rowData?.claimed ? `${user.name} ${user.lastname}` : ''),
                filtering: false,
                width: '15%',
            },
            {
                field: 'claimedQty',
                title: 'Cantidad',
                type: 'numeric',
                align: 'left',
                initialEditValue: 1,
                filtering: false,
                width: '10%',

            }

        ],
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [],
    );

    const rowAdd = (newRow, resolve) => {
        const newClaim = newRow;
        socket ? socket.emit('create_store_claim', newClaim) : history.push('/error');
        resolve();
    }

    const deleteRow = (selectedRow, resolve) => {
        socket ? socket.emit('delete_store_claim', selectedRow) : history.push('/error');
        resolve();
    }

    const updateRow = (newData, oldData, resolve) => {
        if (newData?.addedToClaim) {
            setOpenAlert(true);
        } else {
            const dataUpdate = [...data];
            const target = dataUpdate.find((el) => el.id === oldData.tableData.id);
            const index = dataUpdate.indexOf(target);
            dataUpdate[index] = newData;
            socket ? socket.emit('update_store_claim', newData) : history.push('/error');
            return dataUpdate;
        }
        resolve();
    }

    const bulkUpdate = (changes, resolve) => {
        const copyData = [...data];
        const dataUpdate = getNewDataBulkEdit(changes, copyData);
        const keys = Object.keys(changes)
        const dataToUpdate = keys.map(key => {
            const target = copyData.find((el) => el.id === parseInt(key));
            const index = copyData.indexOf(target);
            copyData[index] = changes[key];
            return changes[key].newData;
        })
        const addeToClaim = dataToUpdate.some(item => item.addedToClaim);
        if (addeToClaim) {
            setOpenAlert(true);
        } else {
            setData(dataUpdate);
            socket ? socket.emit('bulk_update_store_claims', dataToUpdate) : history.push('/error');
        }
        resolve();
    }

    const handleAddToClaimItem = (rowData) => {
        const target = data.find((el) => el.id === rowData.tableData.id);
        const index = data.indexOf(target);
        data[index] = { ...data[index], claimed: true, claimdate: new Date(), claimedBy: `${user.name} ${user.lastname}`, addedToClaim: true };
        setItemsToClaim((prevState) => [...prevState, data[index]]);
        setItemsToClaimQty((prevState) => prevState + 1);
    }

    const handleClaimItems = () => {
        setOpenSendMailDialog(true);
    }

    const handleDeleteClaimedItems = () => {
        socket.emit('get_store_claims');
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        // emailjs.send('', '', values, '')
        //     .then(_response => {
        //         setOpenSendMailDialog(false);
        //         socket ? socket.emit('bulk_update_store_claims', dataToUpdate) : history.push('/error');
        //     }, _error => {
        //     });
    }

    const handleCopyText = () => {
        navigator.clipboard.writeText(values.message);
        socket ? socket.emit('bulk_update_store_claims', itemsToClaim) : history.push('/error');
        setOpenSendMailDialog(false);
        setItemsToClaim([]);
        setItemsToClaimQty(0);
    }

    return <div className={classes.table}>

        <div className={classes.containerHeader}>
            <Alerts open={openAlert} setOpenAlert={setOpenAlert} severity={'error'} title={'No se puede editar, se debe desagregar primero.'} />
            <StoreReclaimsEmail
                itemsToClaim={itemsToClaim}
                handleSubmit={handleSubmit}
                setValues={setValues}
                values={values}
                openSendMailDialog={openSendMailDialog}
                setOpenSendMailDialog={setOpenSendMailDialog}
                handleCopyText={handleCopyText}
            />
        </div>
        <ThemeProvider theme={theme}>

            <MuiTable className={classes.table}
                data={data}
                dataColumns={columns}
                title="ÍTEMS CON STOCK CERO"
                enablePaging={true}
                pageSize={20}
                pageSizeOptions={[20, 30, 50]}
                disableDefaultSearch={false}
                //enableFiltering={true}
                disableAddButton={false}
                rowAdd={rowAdd}
                disableDeleteButton={false}
                deleteRow={deleteRow}
                disableOnRowUpdate={false}
                updateRow={updateRow}
                disableOnBulkUpdate={false}
                bulkUpdate={bulkUpdate}
                enableAddToClaimItemButton={true}
                handleAddToClaimItem={handleAddToClaimItem}
                itemsToClaimQty={itemsToClaimQty}
                enableClaimItemsButton={true}
                handleClaimItems={handleClaimItems}
                enableDeleteClaimItemsButton={true}
                handleDeleteClaimedItems={handleDeleteClaimedItems}
            />
        </ThemeProvider>
    </div>
}















































// import React, { useMemo } from 'react';
// import { MuiReactTable } from '../../../../components/commonComponents/MaterialRectTable/MuiReactTable';
// import Checkbox from '@mui/material/Checkbox';

// //nested data is ok, see accessorKeys in ColumnDef below
// const data = [
//     {
//         id: '111222333',
//         item: '1325013415',
//         description: 'Item de prueba',
//         nonstockdate: new Date().toISOString().slice(0, 10),
//         claimdate: new Date().toISOString().slice(0, 10),
//         claimed: false,
//     },
//     {
//         id: '122322333',
//         item: '1325013415',
//         description: 'Item de prueba 2',
//         nonstockdate: new Date().toISOString().slice(0, 10),
//         claimdate: new Date().toISOString().slice(0, 10),
//         claimed: false,
//     },
// ];

// const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
// export const StoreReclaimsTable = () => {
//     //should be memoized or stable
//     const columns = useMemo(
//         () => [
//             {
//                 accessorKey: 'id', //access nested data with dot notation
//                 header: 'id',
//             },
//             {
//                 accessorKey: 'item',
//                 header: 'Item',

//             },
//             {
//                 accessorKey: 'description', //normal accessorKey
//                 header: 'Descripción',

//             },
//             {
//                 accessorKey: 'nonstockdate',
//                 header: 'Fecha de Stock cero',
//                 muiTableHeadCellFilterTextFieldProps: { type: 'date' },
//                 muiTableBodyCellEditTextFieldProps: { type: 'date' },

//             },
//             {
//                 accessorKey: 'claimdate',
//                 header: 'Fecha de reclamo',
//                 muiTableHeadCellFilterTextFieldProps: { type: 'date' },
//                 muiTableBodyCellEditTextFieldProps: { type: 'date' },
//             },
//             {
//                 accessorKey: 'claimed',
//                 header: 'Reclamado',
//                 Cell: ({ cell }) => <Checkbox key={cell} {...label}  color="success" />,
//             }
//         ],
//         [],
//     );

//     return <MuiReactTable
//         columns={columns}
//         data={data}
//         initialState={{ columnVisibility: { id: false } }}
//         enableRowSelection = {false}
//         enableEditing
//         editingMode="row"
//         positionActionsColumn="last"
//     />;
// };


