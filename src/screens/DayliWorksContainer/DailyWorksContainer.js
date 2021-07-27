import React from "react";
// import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import { dailyWorksContainerStyle } from "./DailyWorksContainerStyle";
import { Grid, Paper } from "@material-ui/core";
// import { DailyWorkersForm } from "./Forms/DailyWorkersForm";
// import { Title } from '../../components/commonComponents/Title'
import { MuiTable } from '../../components/commonComponents/MuiTable/MuiTable'


const useStyles = makeStyles((theme) => dailyWorksContainerStyle(theme));

export const DailyWorksContainer = () => {
    const classes = useStyles();
    // const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

    return <div className={classes.container}>
        <div className={classes.appBarSpacer} />
        <Grid  container>
            <Grid item md={12} lg={12}>
                <Paper className={classes.paper}>
                    <MuiTable />
                </Paper>
            </Grid>

        </Grid>
        {/* <MuiTable /> */}
    </div>
    
}

    // <div className={classes.container}>
    // //     <div className={classes.appBarSpacer} />

    // //     <Paper className={classes.paper}>


    // //         <MuiTable/>
    // //         {/* <Title
    // //             component={'h2'}
    // //             variant={'h6'}
    // //             color={'inherit'}
    // //             value={'Turnos Rotativos'}
    // //         /> */}
    // //         {/* <DailyWorkersForm /> */}

    // //     </Paper>
    // //     <Paper className={classes.paper}>
    // //     <Title
    // //             component={'h2'}
    // //             variant={'h6'}
    // //             color={'inherit'}
    // //             value={'Turno Diurno'}
    // //         />
    // //         <DailyWorkersForm />
    // //     </Paper>
    // // </div >
