import React from 'react'
import MaterialTable from 'material-table';
import { MTableToolbar } from 'material-table';
import { tableIcons } from './tableIcons';
import CircularProgress from '@material-ui/core/CircularProgress';

export const MuiTable = ({ data, setData, title, datepicker, disableCheckButton, disableAditionalButton, disableAddButton, disableDeleteButton, disableOnRowUpdate, disableOnBulkUpdate, dataColumns, rowAdd, updateRow, bulkUpdate, deleteRow, handleAditional, pageSize, disableGroupingOption, date, handleSelection }) => {
    const positionRef = React.useRef();

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
                        emptyDataSourceMessage: <CircularProgress size='5rem' color="inherit" />,
                        deleteTooltip: 'Borrar',
                        editTooltip: 'Editar',
                        editAllTooltipo: 'Editar todo',
                        addTooltip: 'Agregar',
                        filterRow: 'Filtrar por',
                        editRow: {
                            deleteText: 'Esta seguro de borrar esta fila?'
                        }
                    },
                    grouping: {
                        placeholder: 'Arrastre para agrupar',
                        groupedBy: 'Agrupado por'
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
                    selection: disableCheckButton ? undefined : true,
                    selectionProps: rowData => ({
                        disabled: rowData.checkDay !== undefined && /[aeiou]/g.test(rowData.checkDay),
                        color: 'default'
                    }),
                    grouping: disableGroupingOption ? undefined : true,
                }}
                actions={[
                    {
                        tooltip: 'Completar Tarea',
                        icon: tableIcons.Complete,
                        onClick: (evt, data) => handleSelection(data) ? handleSelection(data) : null,
                        disabled: disableCheckButton,
                        hidden: disableCheckButton
                    },
                    {
                        icon: tableIcons.Aditional,
                        tooltip: 'Agregar Adicional',
                        isFreeAction: true,
                        onClick: () => handleAditional() ? handleAditional() : null,
                        disabled: disableAditionalButton,
                        hidden: disableAditionalButton,


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



