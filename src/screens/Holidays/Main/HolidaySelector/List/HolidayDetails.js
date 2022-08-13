import React, { useState, useRef, useEffect } from 'react';
import { makeStyles } from "@material-ui/core/styles";
import { Button, List, ListSubheader, ListItem, ListItemText, ListItemSecondaryAction, IconButton, Tooltip } from '@material-ui/core';
import { holidayDetailsStyle } from './HolidayDetailsStyle';
import { MyDialog, MyDialogActions } from '../../../../../components/commonComponents/Dialog/MyDialog';
import { Title } from '../../../../../components/commonComponents/Title';
import { formatDate } from '../../../../../Services/DateUtils';
import { FractionDetail } from './FractionDetail';
import DeleteIcon from '@material-ui/icons/Delete';
import DateRangeIcon from '@material-ui/icons/DateRange';


const useStyles = makeStyles((theme) => holidayDetailsStyle(theme));


export const HolidayDetails = ({ holidayData, isDialogOpen, setIsDialogOpen, }) => {

    const isMounted = useRef(false);
    const classes = useStyles();
    const [employeeDetail, setEmployeeDetail] = useState([]);
    const [fractionDetail, setFractionDetail] = useState([]);
    const [fractionDetailDialog, setFractionDetailDialog] = useState(false);


    useEffect(() => {
        if (isMounted.current) {
            setEmployeeDetail(holidayData.employeeDetail);
        } else {
            isMounted.current = true;
        }
    }, [holidayData]);

    const handleDialogClose = _e => {
        setIsDialogOpen(false);
    };

    const handleFractionDetail = (item) => {
        setFractionDetail(item)
        setFractionDetailDialog(true);
    }

    const handleDelete = (item) => {
        
    }

    return <>
        <MyDialog
            title={<Title value={holidayData.employeeName} variant="button" color="primary" gutterBottom={false} />}
            isOpen={isDialogOpen}
            fullWidth={true}
            maxWidth={'lg'}
        >
            <List
                component="nav"
                aria-labelledby="holiday-list-subheader"
                subheader={
                    <ListSubheader component="div" id="nested-list-subheader">
                        {`Listado de fracciones tomadas en el ${holidayData.periodName}`}
                    </ListSubheader>
                }
                className={classes.list}
            >
                {employeeDetail && employeeDetail.map((item, index) => {
                    return <ListItem key={index} divider={true} dense={true} className={classes.ListItem}>
                        <ListItemText primary={`Fraccion: ${item.fraction}`} className={classes.listItemText} />
                        <ListItemText primary={`Desde: ${formatDate(item.startDate)}`} className={classes.listItemText} />
                        <ListItemText primary={`Hasta: ${formatDate(item.endDate)}`} className={classes.listItemText} />
                        <ListItemText primary={`Días: ${item.qtyDays}`} className={classes.listItemText} />
                        <ListItemText primary={`Puntos: ${item.points}`} className={classes.listItemText} />
                        <ListItemSecondaryAction>
                            <Tooltip title="Ver detalle de puntos">
                                <IconButton edge="start" aria-label="fractionDetail" onClick={() => handleFractionDetail(item)}>
                                    <DateRangeIcon />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Eliminar Fracción">
                                <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(item)}>
                                    <DeleteIcon />
                                </IconButton>
                            </Tooltip>
                        </ListItemSecondaryAction>
                    </ListItem>
                })}
            </List>
            <MyDialogActions>
                <Button onClick={handleDialogClose} color="primary">
                    Cerrar
                </Button>
            </MyDialogActions>
        </MyDialog>
        <FractionDetail fractionData={fractionDetail} isDialogOpen={fractionDetailDialog} setIsDialogOpen={setFractionDetailDialog} />
    </>
}