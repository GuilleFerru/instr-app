import React, { useState, useEffect } from 'react'
import MaterialTable from 'material-table';
import { MTableToolbar } from 'material-table';
import { tableIcons } from './tableIcons';
import DynamicFeedIcon from '@material-ui/icons/DynamicFeed';
import CircularProgress from '@material-ui/core/CircularProgress';

export const MuiTable = ({ data, setData, title, datepicker, disableCheckButton, disableAditionalButton, disableAddButton, disableDeleteButton, disableOnRowUpdate, disableOnBulkUpdate, dataColumns, rowAdd, updateRow, bulkUpdate, deleteRow, handleAditional, pageSize, disableGroupingOption, date }) => {
    const positionRef = React.useRef();

    const [progress, setProgress] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setProgress(false), 5000);
        return () => clearTimeout(timer);
    }, [date]);


    //arregla el browser freezing
    const columns = dataColumns.map((column) => {
        return { ...column };
    });

    return (
        <div ref={positionRef}>
            <MaterialTable
                icons={tableIcons}
                title={title}
                data={data}
                columns={columns}
                localization={{
                    header: {
                        actions: 'Acciones'
                    },
                    body: {
                        emptyDataSourceMessage: progress ? <CircularProgress size='6rem' color="inherit" /> : 'No existen filas para mostrar',
                        deleteTooltip: 'Borrar',
                        editTooltip: 'Editar',
                        editAllTooltipo: 'Editar todo',
                        addTooltip: 'Agregar',
                        filterRow: 'Filtrar por',
                        editRow: {
                            deleteText: 'Esta seguro de borrar esta fila?'
                        }
                    },
                    toolbar: {
                        searchTooltip: 'Buscar',
                        searchPlaceholder: 'Buscar'

                    },
                    pagination: {
                        labelRowsSelect: 'filas',
                        labelDisplayedRows: '{count} de {from}-{to}',
                        firstTooltip: 'Primera página',
                        previousTooltip: 'Página anterior',
                        nextTooltip: 'Próxima página',
                        lastTooltip: 'Última página'
                    }
                }}
                editable={{
                    onRowAdd: disableAddButton ? undefined : (newRow) => new Promise((resolve, _) => {
                        rowAdd(newRow, resolve);
                    }),
                    onRowDelete: disableDeleteButton ? undefined : selectedRow => new Promise((resolve, _) => {
                        deleteRow(selectedRow, resolve);
                    }),
                    onRowUpdate: disableOnRowUpdate ? undefined : (updatedRow, oldRow) => new Promise((resolve, _) => {
                        setData(updateRow(updatedRow, oldRow));
                        resolve();
                    }),
                    onBulkUpdate: disableOnBulkUpdate ? undefined : selectedRows => new Promise((resolve, _) => {
                        bulkUpdate(selectedRows, resolve);
                    })
                }}
                options={{
                    actionsColumnIndex: -1,
                    addRowPosition: 'first',
                    pageSize: pageSize,
                    pageSizeOptions: [15, 30, 50, 100],
                    selection: disableCheckButton,
                    grouping: disableGroupingOption
                }}
                actions={[
                    {
                        tooltip: 'Completar Tarea',
                        icon: tableIcons.Complete,
                        onClick: (evt, data) => alert('You want to delete ' + data.length + ' rows')
                    },
                    {
                        icon: () => <DynamicFeedIcon />,
                        tooltip: 'Agregar Adicional',
                        isFreeAction: true,
                        onClick: () => handleAditional() ? handleAditional() : null,
                        disabled: disableAditionalButton

                    },
                ]}
                components={{
                    Toolbar: props => (
                        <div>
                            <MTableToolbar {...props} />
                            <div style={{ padding: '0 8px 0px 24px' }}>
                                {datepicker}
                            </div>
                        </div>
                    ),
                    // EditField: props => (
                    //     <MTableEditField
                    //         {...props}
                    //         multiline={props.columnDef.type === "string" || undefined}
                    //     />
                    // )
                }}

            />

        </div>

    );
}



