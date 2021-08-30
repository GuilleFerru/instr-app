import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { tableCardStyle } from "./TableCardStyle";
import { Grid, Paper } from "@material-ui/core";

const useStyles = makeStyles((theme) => tableCardStyle(theme));

export const TableCard = props => {
    const classes = useStyles();
    const {children} = props
    return <div className={classes.container}>
        <div className={classes.appBarSpacer} />
        <Grid  container>
            <Grid item md={12} lg={12}>
                <Paper className={classes.paper}>
                {children}
                </Paper>
            </Grid>
        </Grid>
    </div>
}
