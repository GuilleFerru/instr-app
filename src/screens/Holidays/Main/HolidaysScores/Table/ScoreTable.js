import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import { scoreTableStyle } from './ScoreTableStyle';


const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: '#069999',
        color: theme.palette.common.white,
        fontWeight: 'bolder'
    },

}))(TableCell);

// const StyledTableRow = withStyles((theme) => ({
//     root: {
//         '&:nth-of-type(odd)': {
//             backgroundColor: theme.palette.action.hover,
//         },
//     },
// }))(TableRow);

const useStyles = makeStyles((theme) => scoreTableStyle(theme));

export const ScoreTable = ({ scores }) => {

    //const isMounted = useRef(false);
    const classes = useStyles();


    // useEffect(() => {
    //     if (isMounted.current) {
    //         console.log(scores);
    //         //setData(scores);
    //     } else {
    //         isMounted.current = true;
    //     }
    // }, [scores]);

    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} size="small" aria-label="holidays score table" padding="normal">
                <TableHead>
                    <TableRow >
                        <StyledTableCell>Legajo</StyledTableCell>
                        <StyledTableCell align="left">Nombre Completo</StyledTableCell>
                        <StyledTableCell align="left">Promedio</StyledTableCell>
                        <StyledTableCell align="left">Turno</StyledTableCell>
                        <StyledTableCell align="left">Diurno</StyledTableCell>
                        <StyledTableCell align="left">General</StyledTableCell>
                        <StyledTableCell align="left">Puntos</StyledTableCell>
                        <StyledTableCell align="left">Días</StyledTableCell>
                        <StyledTableCell align="left">Tomados</StyledTableCell>
                        <StyledTableCell align="left">Restantes</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {scores.map((row) => (
                        <TableRow key={row.employee}>
                            <TableCell component="th" scope="row">
                                {row.employee}
                            </TableCell>
                            <TableCell align="left">{row.employeeName}</TableCell>
                            <TableCell align="center">{row.average}%</TableCell>
                            <TableCell align="center">{row.rotativeShiftPosition !== 0 ? row.rotativeShiftPosition : ''}</TableCell>
                            <TableCell align="center">{row.dailyShiftPosition !== 0 ? row.dailyShiftPosition : ''}</TableCell>
                            <TableCell align="center">{row.generalPosition}</TableCell>
                            <TableCell align="center">{row.points}</TableCell>
                            <TableCell align="center">{row.holidayDays}</TableCell>
                            <TableCell align="center">{row.takenDays}</TableCell>
                            <TableCell align="center">{row.leftDays}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
