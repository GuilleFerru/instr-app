import React, { useState } from 'react'
import MaterialTable from 'material-table';
import { MTableToolbar } from 'material-table';
import { tableIcons } from './tableIcons';
import DynamicFeedIcon from '@material-ui/icons/DynamicFeed';
import DatePicker from '../Controls/DatePicker';
import { MyPopover } from '../MyPopover/MyPopover';

export const MuiTable = ({ data, setData, title, onRowUpdateActive, onRowAddActive, dataColumns, updateRow, bulkUpdate, handleAditional, handleDatePicker, date }) => {
    const positionRef = React.useRef();
    const [showPopover, setShowPopover] = useState(false)

    //arregla el browser freezing
    const columns = dataColumns.map((column) => {
        return { ...column };
    });

    const showLog = () => new Promise((resolve, _) => {
        setShowPopover(true)
        resolve();
    })

    const addRow = (newRow) => new Promise((resolve, _) => {
        const updatedRows = [...data, newRow];
        setData(updatedRows);
        resolve();
    })

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
                    onRowAdd: (newRow) => {
                        if (onRowAddActive) {
                            return addRow(newRow)
                        } else {
                            return showLog()
                        }
                    },
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
                    pageSize: 20
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
            {showPopover && <MyPopover positionRef={positionRef.current} texto='No se pueden agregar datos en esta tabla' />}
        </div>

    );
}



