import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import { Button, List, ListSubheader, ListItem, ListItemText } from '@material-ui/core';
import { scoreSystemStyle } from './ScoreSystemStyle';
import { MyDialog, MyDialogActions } from '../../../../../components/commonComponents/Dialog/MyDialog';
import { Title } from '../../../../../components/commonComponents/Title';


const useStyles = makeStyles((theme) => scoreSystemStyle(theme));

const scoresByMonth = [
    {
        month: 'Enero',
        score: '100 puntos',
        single: true
    },
    {
        month: 'Febrero',
        firstPart: '01 al 15 de Febrero',
        firstScore: '100 puntos',
        secondPart: '16 al 28 de Febrero',
        secondScore: '95 puntos'
    },
    {
        month: 'Marzo',
        firstPart: '01 al 15 de Marzo',
        firstScore: '80 puntos',
        secondPart: '16 al 31 de Marzo',
        secondScore: '50 puntos'
    },
    {
        month: 'Abril',
        score: '40 puntos',
        single: true
    },
    {
        month: 'Mayo',
        score: '30 puntos',
        single: true
    },
    {
        month: 'Junio',
        score: '25 puntos',
        single: true
    },
    {
        month: 'Julio',
        score: '50 puntos',
        single: true
    },
    {
        month: 'Agosto',
        score: '25 puntos',
        single: true
    },
    {
        month: 'Septiembre',
        score: '25 puntos',
        single: true
    },
    {
        month: 'Octubre',
        score: '30 puntos',
        single: true
    },
    {
        month: 'Noviembre',
        score: '40 puntos',
        single: true
    },
    {
        month: 'Diciembre',
        firstPart: '01 al 15 de Diciembre',
        firstScore: '50 puntos',
        secondPart: '16 al 31 de Diciembre',
        secondScore: '80 puntos'
    },

]

export const ScoreSystem = ({ isDialogOpen, setIsDialogOpen, }) => {

    const classes = useStyles();
    const handleDialogClose = _e => {
        setIsDialogOpen(false);
    };

    return <>
        <MyDialog
            title={<Title value='Sistema de Puntaje' variant="button" color="primary" gutterBottom={false} />}
            isOpen={isDialogOpen}
            fullWidth={true}
            maxWidth={'md'}
        >
            <List
                component="nav"
                aria-labelledby="holiday-list-subheader"
                subheader={
                    <ListSubheader component="div" id="nested-list-subheader">
                        {`Sistema de Puntaje utilizado`}
                    </ListSubheader>
                }
                className={classes.list}
            >
                {
                    scoresByMonth.map((score, index) => {
                        return <ListItem divider={true} dense={true} className={classes.ListItem} key={index}>
                            {score.single ?
                                <>
                                    <ListItemText primary={score.month} className={classes.listItemText} />
                                    <ListItemText primary={score.score} className={classes.listItemText} />
                                </>
                                :
                                <>
                                    <ListItemText primary={score.month} className={classes.listItemText} />
                                    <div className={classes.listItemColumn} >
                                        <div className={classes.listItem} >
                                            <ListItemText primary={score.firstPart} className={classes.listItemText} />
                                            <ListItemText primary={score.firstScore} className={classes.listItemText} />
                                        </div>
                                        <div className={classes.listItem} >
                                            <ListItemText primary={score.secondPart} className={classes.listItemText} />
                                            <ListItemText primary={score.secondScore} className={classes.listItemText} />
                                        </div>
                                    </div>
                                </>

                            }
                        </ListItem>
                    })
                }
            </List>
            <MyDialogActions>
                <Button onClick={handleDialogClose} color="primary">
                    Cerrar
                </Button>
            </MyDialogActions>
        </MyDialog>

    </>
}