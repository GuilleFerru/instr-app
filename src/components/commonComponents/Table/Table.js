import React, { useMemo } from 'react'
import { makeStyles } from '@material-ui/core';
import { useTable } from 'react-table';
import { workers } from '../../../Services/Workers';
import { tableStyle } from './TableStyle';


const Columns = [
    {
        Header: 'Nombre Completo',
        accessor: 'fullName'
    },
    {
        Header: 'Legajo',
        accessor: 'legajo'
    },

]

const useStyles = makeStyles((theme) => tableStyle(theme));
export const Table = () => {
    const classes = useStyles();
    const columns = useMemo(() => Columns, []);
    const data = useMemo(() => workers, []);

    const { getTableProps,
            getTableBodyProps,
            headerGroups,
            rows,
            prepareRow } = useTable({
            columns: columns,
            data: data
        })



    return (
        <table{...getTableProps()} className={classes.table}>
            <thead>
                {headerGroups.map((headerGroup) => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map((column) => (
                            <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                        ))}
                    </tr>
                ))}
            </thead>
            <tbody {...getTableBodyProps()}>
                {
                    rows.map(row => {
                        prepareRow(row)
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map((cell) => {
                                    return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                })
                                }
                            </tr>
                        )
                    })}
            </tbody>
        </table>
    )
}
