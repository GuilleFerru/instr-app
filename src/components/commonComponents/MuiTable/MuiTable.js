import React from 'react'
import MaterialTable from 'material-table'
import { tableIcons } from './tableIcons';
import AddCommentIcon from '@material-ui/icons/AddComment';
// import { CheckBox } from '@material-ui/icons';

export const MuiTable = ({ data, setData, title, columns, updateRow, handleAditional }) => {

    return (
        <div>
            <MaterialTable
                icons={tableIcons}
                title={title}
                data={data}
                columns={columns}
                localization={{
                    header:{
                        actions: 'Acciones'
                    },
                    body: {
                        emptyDataSourceMessage: 'No hay filas para mostrar',
                        deleteTooltip: 'Borrar',
                        editTooltip: 'Editar',
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
                    onRowDelete: selectedRow => new Promise((resolve, reject) => {
                        const index = selectedRow.tableData.id
                        const updatedRows = [...data]
                        updatedRows.splice(index, 1)
                        setData(updatedRows)
                        resolve()
                    }),
                    onRowUpdate: (updatedRow, oldRow) => new Promise((resolve, reject) => {
                        setData(updateRow(updatedRow, oldRow));
                        resolve();
                    }),
                    onBulkUpdate: selectedRows => new Promise((resolve, reject) => {
                        const rows = Object.values(selectedRows);
                        const updatedRows = [...data];
                        // let index;
                        rows.map(emp => {
                            const index = emp.oldData.tableData.id;
                            updatedRows[index] = emp.newData;
                            setData(updatedRows);
                            resolve();
                            return ''
                        })
                    })
                }}
                options={{
                    actionsColumnIndex: -1,
                    addRowPosition: 'first',
                    pageSize: 10
                }}
            actions={[
                {
                    icon: () =><AddCommentIcon/>,
                    tooltip:'Agregar Adicional',
                    isFreeAction:true,
                    onClick:(e,row)=> handleAditional(row),
                  
                },
            //     // {
            //     //     icon: () => <Select
            //     //         labelId="demo-simple-select-label"
            //     //         id="demo-simple-select"
            //     //         style={{ width: 100 }}
            //     //         // value={filterBy}
            //     //         // onChange={(e) => setFilterBy(e.target.value)}
            //     //     >
            //     //         <MenuItem value={10}>Ten</MenuItem>
            //     //         <MenuItem value={20}>Twenty</MenuItem>
            //     //         <MenuItem value={30}>Thirty</MenuItem>
            //     //     </Select>,
            //     //     tooltip: 'Filter By',
            //     //     isFreeAction: true
            //     // }
            ]}
            />
        </div>
    );
}



