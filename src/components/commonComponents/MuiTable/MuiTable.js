import React, { useState } from 'react'
// import { DataGrid } from '@material-ui/data-grid';
import MaterialTable from 'material-table'
import { workers } from '../../../Services/Workers';
import { tableIcons } from './tableIcons';


const columns = [
    {
        field: 'id',
        title: 'Numero',
        // editable: false
    },
    {
        field: 'legajo',
        title: 'Legajo',
    },
    {
        field: 'fullName',
        title: 'Nombre Completo',

    },



    // { field: 'id', headerName: 'ID', width: 90 },
    // {
    //     field: 'firstName',
    //     headerName: 'First name',
    //     width: 150,
    //     editable: true,
    // },
    // {
    //     field: 'lastName',
    //     headerName: 'Last name',
    //     width: 150,
    //     editable: true,
    // },
    // {
    //     field: 'age',
    //     headerName: 'Age',
    //     type: 'number',
    //     width: 110,
    //     editable: true,
    // },
    // {
    //     field: 'fullName',
    //     headerName: 'Full name',
    //     description: 'This column has a value getter and is not sortable.',
    //     sortable: false,
    //     width: 160,
    //     valueGetter: (params) =>
    //         `${params.getValue(params.id, 'firstName') || ''} ${params.getValue(params.id, 'lastName') || ''
    //         }`,
    // },
];

// const rows = [
//     { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
//     { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
//     { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
//     { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
//     { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
//     { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
//     { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
//     { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
//     { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
// ];

export const MuiTable = () => {

    const [data, setData] = useState(workers)

    return (
        <div>
            <MaterialTable
                icons={tableIcons}
                title="Personal del día"
                data={data}
                columns={columns}
                pageSize={5}
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
                        const index = oldRow.tableData.id;
                        const updatedRows = [...data];
                        updatedRows[index] = updatedRow;
                        setData(updatedRows)
                        resolve()
                    })
                }}
                options={{
                    actionsColumnIndex: -1,
                    addRowPosition: 'first'
                }}
            />
        </div>
    );
}



