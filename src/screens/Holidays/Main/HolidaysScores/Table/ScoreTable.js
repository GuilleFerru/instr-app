import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { scoreTableStyle } from './ScoreTableStyle';


const useStyles = makeStyles((theme) => scoreTableStyle(theme));

export const ScoreTable = ({ scores }) => {

    //const isMounted = useRef(false);
    const classes = useStyles();


    // useEffect(() => {
    //     if (isMounted.current) {
            
    //         //setData(scores);
    //     } else {
    //         isMounted.current = true;
    //     }
    // }, [scores]);

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
                        <TableCell align="left">Puntos</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {scores.map((row) => (
                        <TableRow key={row.employee}>
                            <TableCell component="th" scope="row">
                                {row.employee}
                            </TableCell>
                            <TableCell align="left">{row.employeeName}</TableCell>
                            <TableCell align="left">{row.average}</TableCell>
                            <TableCell align="left">{row.rotativeShiftPosition !== 0 ? row.rotativeShiftPosition : ''}</TableCell>
                            <TableCell align="left">{row.dailyShiftPosition !== 0 ? row.dailyShiftPosition : ''}</TableCell>
                            <TableCell align="left">{row.generalPosition}</TableCell>
                            <TableCell align="left">{row.points}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
