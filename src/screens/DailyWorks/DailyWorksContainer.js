import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import { dailyWorksContainerStyle } from "./DailyWorksContainerStyle";
import { Grid, Paper } from "@material-ui/core";
import { DailyWorksTable } from './Tables/DailyWorksTable';



const useStyles = makeStyles((theme) => dailyWorksContainerStyle(theme));

export const DailyWorksContainer = () => {

    const classes = useStyles();

    return <div className={classes.container}>
        <div className={classes.appBarSpacer} />
        <Grid container>
            <Grid item md={12} lg={12}>
                <Paper className={classes.paper}>
                    <DailyWorksTable/>
                </Paper>
            </Grid>
        </Grid>

    </div>
};