import React from 'react'
import MaterialTable from 'material-table';
import { MTableToolbar, MTableEditField } from 'material-table';
import { tableIcons } from './tableIcons';
import DynamicFeedIcon from '@material-ui/icons/DynamicFeed';
import DatePicker from '../Controls/DatePicker';

export const MuiTable = ({ data, setData, title, dataColumns, updateRow, bulkUpdate, handleAditional, handleDatePicker, date }) => {

    //arregla el browser freezing
    const columns = dataColumns.map((column) => {
        return { ...column };
    });

    return (
        <div>
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
                        emptyDataSourceMessage: 'No hay filas para mostrar',
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
                    onRowAdd: (newRow) => new Promise((resolve, reject) => {
                        const updatedRows = [...data, newRow];
                        setTimeout(() => {
                            setData(updatedRows);
                            resolve();
                        }, 1000)
                    }),
                    onRowDelete: selectedRow => new Promise((resolve, _) => {
                        const index = selectedRow.tableData.id
                        const updatedRows = [...data]
                        updatedRows.splice(index, 1)
                        setData(updatedRows)
                        resolve()
                    }),
                    onRowUpdate: (updatedRow, oldRow) => new Promise((resolve, _) => {
                        setData(updateRow(updatedRow, oldRow));
                        resolve();
                    }),
                    onBulkUpdate: selectedRows => new Promise((resolve, _) => {
                        bulkUpdate(selectedRows, resolve);


                    })
                }}
                options={{
                    actionsColumnIndex: -1,
                    addRowPosition: 'first',
                    pageSize: 15
                }}
                actions={[
                    {
                        icon: () => <DynamicFeedIcon />,
                        tooltip: 'Agregar Adicional',
                        isFreeAction: true,
                        onClick: () => handleAditional(),

                    },
                ]}
                components={{
                    Toolbar: props => (
                        <div>
                            <MTableToolbar {...props} />
                            <div style={{ padding: '0 8px 0px 24px' }}>
                                <DatePicker
                                    name='date'
                                    label="Fecha"
                                    value={date}
                                    onChange={handleDatePicker}
                                />
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



