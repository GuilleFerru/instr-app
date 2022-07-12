import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
    ComposedChart,
    Line,
    Area,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
} from 'recharts';

import { manteinanceActionsChartStyle } from './ManteinanceActionsChartStyle';

const useStyles = makeStyles((theme) => manteinanceActionsChartStyle(theme));


const ManteinanceChart = ({ data, title }) => {

    const classes = useStyles();

    return (
        <div className="chart">
            <div className={classes.title}>{title}</div>
            <ComposedChart
                layout="vertical"
                width={730}
                height={500}
                data={data}
                margin={{
                    top: 20,
                    right: 20,
                    bottom: 20,
                    left: 50,
                }}
            >
                <CartesianGrid stroke="#f5f5f5" />
                <XAxis type="number" />
                <YAxis dataKey="name" type="category" scale="band" />
                <Tooltip />
                <Legend />
                <Bar dataKey="Correctivos" barSize={20} fill="#413ea0" />
                <Area dataKey="Preventivos" fill="#8884d8" stroke="#8884d8" />
                <Line dataKey="Otros" stroke="#ff7300" />
            </ComposedChart>

        </div>
    );
};

export default ManteinanceChart;
