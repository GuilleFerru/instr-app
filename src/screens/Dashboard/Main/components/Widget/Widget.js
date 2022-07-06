import React, { useState, useEffect } from 'react'
import { makeStyles } from "@material-ui/core/styles";
import { CircularProgress } from '@material-ui/core';
import { widgetStyle } from './WidgetStyle';
import PeopleAltOutlinedIcon from '@material-ui/icons/PeopleAltOutlined';
import TodayOutlinedIcon from '@material-ui/icons/TodayOutlined';
import ScheduleOutlinedIcon from '@material-ui/icons/ScheduleOutlined';
import AssignmentIndOutlinedIcon from '@material-ui/icons/AssignmentIndOutlined';




const useStyles = makeStyles((theme) => widgetStyle(theme));

const Widget = ({ type, widgetInfo }) => {

    const classes = useStyles();
    const [widgetData, setWidgetData] = useState([]);

    useEffect(() => {
        widgetInfo === undefined ? setWidgetData([]) : setWidgetData(widgetInfo);
    }, [widgetInfo])

    let data;

    switch (type) {
        case "routines":
            data = {
                title: "RUTINAS DEL DÍA",
                info: ['Diarias', 'Otras', 'Vencidas'],
                infoData: widgetInfo ? widgetInfo.routineData : [],
                icon: (
                    <ScheduleOutlinedIcon
                        className={classes.icon}
                        style={{
                            color: "crimson",
                            backgroundColor: "rgba(255, 0, 0, 0.2)",
                        }}
                    />
                ),
            };
            break;
        case "dailyWorks":
            data = {
                title: "TAREAS SEMANALES",
                info: ['Pendientes', 'En ejecución', 'Demoradas'],
                icon: (
                    <TodayOutlinedIcon
                        className={classes.icon}
                        style={{
                            backgroundColor: "rgba(218, 165, 32, 0.2)",
                            color: "goldenrod",
                        }}
                    />
                ),
            };
            break;
        case "plantShutdowns":
            data = {
                title: "PARO DE PLANTA",
                info: ['En ejecución', 'Proximo'],
                icon: (
                    <AssignmentIndOutlinedIcon
                        className={classes.icon}
                        style={{ backgroundColor: "rgba(0, 128, 0, 0.2)", color: "green" }}
                    />
                ),
            };
            break;
        case "schedules":
            data = {
                title: "CANTIDAD DE PERSONAL",
                info: ['Diurnos', 'Supervisión'],
                icon: (
                    <PeopleAltOutlinedIcon
                        className={classes.icon}
                        style={{
                            backgroundColor: "rgba(128, 0, 128, 0.2)",
                            color: "purple",
                        }}
                    />
                ),
            };
            break;
        default:
            break;
    }

    return (
        <div className={classes.widget} >
            <span className={classes.title}>
                {data.title}
            </span>
            <div className={classes.content}>
                <div className={classes.left}>
                    {data.info.map((info, index) => (
                        <span className={classes.info} key={index}>
                            {info}
                        </span>
                    ))}
                </div>
                <div className={classes.right}>
                    {widgetData.length !== 0 ? widgetData.map((data, index) => (
                        <span className={classes.info} key={index}>
                            {data}
                        </span>
                    )) :
                        <span className={classes.info}>
                            <CircularProgress size={20} />
                        </span>
                    }
                </div>
            </div>
            {data.icon}
        </div>
    );
};

export default Widget;
