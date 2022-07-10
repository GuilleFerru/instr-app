import React, { useState } from 'react';
import { makeStyles } from "@material-ui/core/styles";
import Widget from './components/Widget/Widget';
import ManteinanceActionsChart from './components/Chart/ManteinanceActionsChart';
import { dashboardStyle } from './DashboardStyle';
import { useEffect } from 'react';
import { monthPicker } from '../../../Services/DatePickers';

const useStyles = makeStyles((theme) => dashboardStyle(theme));

export const Dashboard = ({ widgetData, handleMonthAndYear, monthAndYear, manteinanceActionsData }) => {

    const classes = useStyles({});

    const [routineData, setRoutineData] = useState([]);
    const [dailyWorkData, setDailyWorkData] = useState([]);
    const [plantShutdownsData, setPlantShutdownsData] = useState([]);
    const [scheduleData, setScheduleData] = useState([]);

    useEffect(() => {
        new Promise((resolve) => {
            setTimeout(resolve, 200);
        }).then(() => {
            setRoutineData(widgetData[0]);
            setDailyWorkData(widgetData[1]);
            setPlantShutdownsData(widgetData[2]);
            setScheduleData(widgetData[3]);
        });
    }, [widgetData])


    return <div className={classes.root}>
        <div className={classes.rootContainer}>
            <div className={classes.widgets}>
                <Widget type="routines" widgetInfo={routineData} />
                <Widget type="dailyWorks" widgetInfo={dailyWorkData} />
                <Widget type="plantShutdowns" widgetInfo={plantShutdownsData} />
                <Widget type="schedules" widgetInfo={scheduleData} />
            </div>
            <div className={classes.chartsContainer}>
                <div className={classes.monthPicker}>
                    {monthPicker(monthAndYear, handleMonthAndYear)}
                </div>
                <div className={classes.charts}>
                    <ManteinanceActionsChart data = {manteinanceActionsData} title="TIPOS DE TAREA POR PLANTA" />
                    <ManteinanceActionsChart data = {manteinanceActionsData} title="TIPOS DE TAREA POR PLANTA" />
                </div>
            </div>
        </div>
    </div>

};