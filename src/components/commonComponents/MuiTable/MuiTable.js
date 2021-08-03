import React from 'react'
import MaterialTable from 'material-table'
import { tableIcons } from './tableIcons';
// import { Checkbox, Select, MenuItem } from '@material-ui/core';

// const columns = [
//     {
//         field: 'id',
//         title: 'Numero',
//         hidden: true
//     },
//     {
//         field: 'legajo',
//         title: 'Legajo',
//     },
//     {
//         field: 'fullName',
//         title: 'Nombre Completo',
//         lookup: {301: 'Jorge Reinoso', 303: 'Cleri Cattaneo',649: 'Fabian Monzon', 657: 'Edgardo Heredia', 672: 'Juan Machado', 1151: 'Ezequiel Lopez'}
//     },
//     {
//         field: 'shift',
//         title: 'Horario',
//         lookup: {1: '05 a 13 hs',2: '13 a 21 hs',3: '21 a 05 hs',4: 'Franco',5: '08 a 17 hs',}
//     },
//     {
//         field: 'date',
//         title: 'Fecha',
//     },
// ];

export const MuiTable = ({data, setData, title, columns}) => {
    // const [data, setData] = useState(scheduleEmp);
    // const [filter, setFilter] = useState(false)
    // const [filteredData, setFilteredData] = useState(data)
    // const [filterBy, setFilterBy] = useState('')

    // const handleChange = () => {
    //     setFilter(!filter)
    // }

    // useEffect(() => {
    //     // setFilteredData(filterBy === '' ? data : data.filter(dt => dt.fullName))
    //     console.log(onRowAddCancelled)
    // }, [])

    return (
        <div>
            <MaterialTable
                icons={tableIcons}
                title= {title}
                data={data}
                columns={columns}
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
                        console.log(oldRow.tableData.id)
                        const updatedRows = [...data];
                        updatedRows[index] = updatedRow;
                        setData(updatedRows);
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
                    // filtering: filter,
                    // columnsButton:true,
                    pageSize: 10
                }}
            // actions={[
            //     {
            //         icon: () => <Checkbox
            //             checked={filter}
            //             onChange={handleChange}
            //             color="primary"
            //             inputProps={{ 'aria-label': 'primary checkbox' }}
            //         />,
            //         tooltip: 'Hide/Show Filter',
            //         isFreeAction: true
            //     },
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
            // ]}
            />
        </div>
    );
}



