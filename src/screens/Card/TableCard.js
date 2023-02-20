import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { tableCardStyle } from "./TableCardStyle";
import { Grid, Paper, Fade } from "@material-ui/core";
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs';
import { OverDueRoutine } from "../../components/OverDueRoutines/OverDueRoutine";




const useStyles = makeStyles((theme) => tableCardStyle(theme));

export const TableCard = props => {
    const classes = useStyles();
    const { children } = props
    return <div className={classes.container}>
        <div className={classes.appBarSpacer} />
        <Grid container >
            <Grid item xs={12} md={12} lg={12}>
                <Fade in={true} timeout={600}>
                    <Paper className={classes.paper}>
                        <div className={classes.toolbarHeader}>
                            <Breadcrumbs />
                            <OverDueRoutine />
                        </div>
                        {children}
                    </Paper>
                </Fade>
            </Grid>
        </Grid>
    </div>
}
