import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { RadialBarChart, RadialBar, Legend } from "recharts";

import { manteinanceActionsChartStyle } from './ManteinanceActionsChartStyle';

const useStyles = makeStyles((theme) => manteinanceActionsChartStyle(theme));



const style = {
    top: 0,
    left: 350,
    lineHeight: "24px"
};

// const data = [
//     {
//         name: "18-24",
//         uv: 31.47,
//         pv: 5000,
//         fill: "#8884d8"
//     },
//     {
//         name: "25-29",
//         uv: 26.69,
//         pv: 5000,
//         fill: "#83a6ed"
//     },
//     {
//         name: "30-34",
//         uv: 15.69,
//         pv: 5000,
//         fill: "#8dd1e1"
//     },
//     {
//         name: "35-39",
//         uv: 8.22,
//         pv: 5000,
//         fill: "#82ca9d"
//     },
//     {
//         name: "40-49",
//         uv: 8.63,
//         pv: 5000,
//         fill: "#a4de6c"
//     },
//     {
//         name: "50+",
//         uv: 2.63,
//         pv: 5000,
//         fill: "#d0ed57"
//     },
//     {
//         name: "unknow",
//         uv: 20,
//         pv: 5000,
//         fill: "#ffc658"
//     }
// ];
const ManteinanceActionsChart = ({ data, title }) => {

    const classes = useStyles();

    return (
        <div className="chart">
            <div className={classes.title}>{title}</div>
            <RadialBarChart
                width={730}
                height={350}
                cx={150}
                cy={150}
                innerRadius={20}
                outerRadius={150}
                barSize={10}
                data={data}

            >
                <RadialBar
                    minAngle={15}
                    label={{ position: "insideStart", fill: "#666" }}
                    background
                    clockWise
                    dataKey="value"
                />
                <Legend
                    iconSize={10}
                    width={250}
                    height={150}
                    layout="vertical"
                    verticalAlign="middle"
                    wrapperStyle={style}
                />
            </RadialBarChart>

        </div>
    );
};

export default ManteinanceActionsChart;
