import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { dashboardStyle } from "./DashboardStyle";



const useStyles = makeStyles((theme) => dashboardStyle(theme));


export const Dashboard = () => {
  const classes = useStyles();
  return <div>
    <div className={classes.appBarSpacer} />
    Soy el Dashboard
  </div>
};
