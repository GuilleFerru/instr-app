import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { empDailyScheduleContainerStyle } from "./EmpDailyScheduleContainerStyle";
import { Grid, Paper } from "@material-ui/core";
import { EmpDailyScheduleTable } from "./Tables/EmpDailyScheduleTable";




const useStyles = makeStyles((theme) => empDailyScheduleContainerStyle(theme));

export const EmpDailyScheduleContainer = () => {
    const classes = useStyles();
    // const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

    return <div className={classes.container}>
        <div className={classes.appBarSpacer} />
        <Grid  container>
            <Grid item md={12} lg={12}>
                <Paper className={classes.paper}>
                <EmpDailyScheduleTable />
                </Paper>
            </Grid>
        </Grid>
        
        {/* <MuiTable /> */}
    </div>
}
