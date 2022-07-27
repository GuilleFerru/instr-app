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

const ManteinanceActionsChart = ({ data, title }) => {

    const classes = useStyles();

    return (
        <div className="chart">
            <div className={classes.title}>{title}</div>
            <RadialBarChart
                width={730}
                height={500}
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
