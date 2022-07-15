import React, { useState, useEffect } from 'react';
import ThemeProvider from "@material-ui/styles/ThemeProvider";
import theme from '../../../../components/commonComponents/MuiTable/theme';
//import { axiosPut } from '../../../Services/Axios.js';
import { defaultHolidayScoreTable, holidayScoreInitialRowData } from '../../../../Services/defaultTables.js';
import { makeStyles } from "@material-ui/core/styles";
import { MuiTable } from '../../../../components/commonComponents/MuiTable/MuiTable';
import { holidayPointsStyle } from './HolidayPointsStyle';
import { Select } from '../../../../components/commonComponents/Controls/Select';



//const baseUrl = process.env.REACT_APP_API_URL;
const useStyles = makeStyles((theme) => holidayPointsStyle(theme));

export const HolidayPoints = ({ allData, setDate, date }) => {

    const classes = useStyles();

    const [data, setData] = useState([]);
    const [dataColumns, setDataColumns] = useState([]);



    useEffect(() => {
        new Promise(resolve => {
            setData(allData.otherRoutines ? allData.otherRoutines : []);
            setDataColumns(allData.columns ? allData.columns : [defaultHolidayScoreTable]);
            resolve();
        });
    }, [allData]);

    const rowAdd = (newRow, resolve) => {
        const newDayWork = newRow;
        // le agrego la fecha de inicio y lo envio al servidor
        newDayWork.beginDate = date;
        //socket ? socket.emit('create_daily_work', newDayWork, roomId) : history.push('/error');
        resolve();
    }



    // const updateRow = (newData, oldData, resolve) => {
    //     const dataUpdate = [...data];
    //     const target = dataUpdate.find((el) => el.id === oldData.tableData.id);
    //     const index = dataUpdate.indexOf(target);
    //     dataUpdate[index] = newData;
    //     axiosPut(`${baseUrl}/routine/updateOt`, { data: newData })
    //     resolve();
    //     return dataUpdate;
    // }

    // const handleRoutineSchedule = (selectedRows,) => {

    //     const dataUpdate = [...data];
    //     const target = dataUpdate.find((el) => el.id === selectedRows.tableData.id);
    //     const index = dataUpdate.indexOf(target);
    //     dataUpdate[index] = { ...selectedRows, complete: 'C', checkDay: new Date() };
    //     setData(dataUpdate);
    //     axiosPut(`${baseUrl}/routine/update`, { data: dataUpdate[index] }).then(res => {
    //         res.status === 200 && socket.emit('get_qtyOverDueRoutines');
    //     });






    return <div className={classes.table}>
        <ThemeProvider theme={theme}>
            <MuiTable
                data={data}
                title={'VACACIONES PERSONAL'}
                dataColumns={dataColumns}
                disableHolidayPeriodSelector={false}
                HolidayPeriodsSelector={Select}
                initialRowData={{ holidayScoreInitialRowData }}
                disableAddButton={false}
                rowAdd={rowAdd}
            />
        </ThemeProvider>
    </div>
}
