import React, { useState, useRef, useEffect } from 'react';
import { makeStyles } from "@material-ui/core/styles";
import { Button, List, ListItem, ListItemText } from '@material-ui/core';
import { fractionDetailStyle } from './FractionDetailStyle';
import { MyDialog, MyDialogActions } from '../../../../../components/commonComponents/Dialog/MyDialog';
import { Title } from '../../../../../components/commonComponents/Title';


const useStyles = makeStyles((theme) => fractionDetailStyle(theme));


export const FractionDetail = ({ fractionData, isDialogOpen, setIsDialogOpen, }) => {

    const isMounted = useRef(false);
    const classes = useStyles();
    const [fractionDetail, setFractionDetail] = useState([]);

    useEffect(() => {
        if (isMounted.current) {
            setFractionDetail(fractionData.daysDistribution);
        } else {
            isMounted.current = true;
        }
    }, [fractionData]);

    const handleDialogClose = () => {
        setIsDialogOpen(false);
    };

    return <MyDialog
        title={<Title value={'Detalle de los días tomados'} variant="button" color="primary" gutterBottom={false} />}
        isOpen={isDialogOpen}
        fullWidth={true}
        maxWidth={'xs'}
    >
        <List
            component="nav"
            aria-labelledby="detail-list-subheader"
            className={classes.list}
        >
            {fractionDetail && fractionDetail.map((item, index) => {
                return <ListItem key={index} divider={true} dense={true} className={classes.ListItem}>
                    <ListItemText primary={` ${Object.keys(item)[0]}`} className={classes.listItemText} />
                    <ListItemText primary={` ${Object.values(item)[0]} días`} className={classes.listItemText} />
                    <ListItemText primary={` ${item.points} puntos`} className={classes.listItemText} />
                </ListItem>
            })}
        </List>
        <MyDialogActions>
            <Button onClick={handleDialogClose} color="primary">
                Cerrar
            </Button>
        </MyDialogActions>
    </MyDialog >
}