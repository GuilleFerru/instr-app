import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';


const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
    tableContainer: {
        webkitBoxShadow: '2px 4px 10px 1px rgba(0, 0, 0, 0.47)',
        boxShadow: ' 2px 4px 10px 1px rgba(201, 201, 201, 0.47)',
        borderRadius: '10px',
    }


});

function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
}

const rows = [
    createData('301', 'Hector Cattaneo', 50, '', 1),
    createData('303', 'Jorge Reinoso', 40, 2, ''),
    createData('657', 'Edgardo Heredia', 67, 3, ''),
    createData('645', 'Fabian Monzon', 37, 1, 4.3),
    createData('672', 'Juan Machado', 60, '', 3.9),
];

export default function DenseTable() {
    const classes = useStyles();

    return (
        <TableContainer className={classes.tableContainer}>
            <Table className={classes.table} size="small" aria-label="a dense table">
                <TableHead>
                    <TableRow>
                        <TableCell>Legajo</TableCell>
                        <TableCell align="left">Nombre Completo</TableCell>
                        <TableCell align="left">Promedio</TableCell>
                        <TableCell align="left">Turno</TableCell>
                        <TableCell align="left">Diurno</TableCell>
                        <TableCell align="left">General</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow key={row.name}>
                            <TableCell component="th" scope="row">
                                {row.name}
                            </TableCell>
                            <TableCell align="left">{row.calories}</TableCell>
                            <TableCell align="left">{row.fat}</TableCell>
                            <TableCell align="left">{row.carbs}</TableCell>
                            <TableCell align="left">{row.protein}</TableCell>
                            <TableCell align="left">{row.protein}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
