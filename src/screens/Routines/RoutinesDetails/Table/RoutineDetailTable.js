import React, { useState, useEffect } from 'react';
import ThemeProvider from "@material-ui/styles/ThemeProvider";
import theme from '../../../../components/commonComponents/MuiTable/theme';
import axios from 'axios';
import { axiosPut } from '../../../../Services/Axios.js';
import { otherRoutinesDefault } from '../../../../Services/defaultTables.js';
import { monthPicker } from '../../../../Services/DatePickers'
import { makeStyles } from "@material-ui/core/styles";
import { MuiTable } from '../../../../components/commonComponents/MuiTable/MuiTable'
import { routineDetailTableStyle } from './RoutineDetailTableStyle'
import { muiTableCommonActions } from '../../../../components/commonComponents/MuiTable/MuiTableCommonActions';



const useStyles = makeStyles((theme) => routineDetailTableStyle(theme));

export const RoutineDetailTable = props => {

    const classes = useStyles();
    const [date, setDate] = useState(new Date());
    const [data, setData] = useState([]);
    const [dataColumns, setDataColumns] = useState([]);
    // const [routineMore, setRoutineMore] = useState([]);
    const { handleDatePicker } = muiTableCommonActions(data, setData, setDate);


    useEffect(() => {
        new Promise(resolve => {
            setData(props.data.dayWorks ? props.data.dayWorks : []);
            setDataColumns(props.data.columns ? props.data.columns : []);
            resolve();
        });
    }, [props.data]);

    // const updateRow = (updatedRow, oldRow) => {
    //     const index = oldRow.tableData.id;
    //     const updatedRows = [...data];
    //     updatedRows[index] = updatedRow;
    //     const updatedWork = updatedRow;
    //     axiosPut(`/routine/updateOt`, { data: updatedWork })
    //     return updatedRows;
    // }

    // const handleRoutineSchedule = (selectedRows,) => {
    //     const rows = Object.values(selectedRows);
    //     const updatedRows = [...data];
    //     const dataToAxiosPut = [];
    //     rows.map(routine => {
    //         const index = routine.tableData.id;
    //         updatedRows[index] = { ...routine, complete: 'C' };
    //         dataToAxiosPut.push({ ...routine, complete: 'C' });
    //         setData(updatedRows);
    //         return ''
    //     })
    //     axiosPut(`/routine/update`, { data: dataToAxiosPut });
    // }

    // const handleDailyWorksRoutine = async (selectedRows) => {
    //     for (const routine of selectedRows) {
    //         const routineScheduleId = routine._id;
    //         const dailyWorkRoutine = await axiosGet(`/dailyWork/getDailyWorkRoutine/${routineScheduleId}`);
    //         setRoutineMore(dailyWorkRoutine);
    //     }
    // }


    return <div className={classes.table}>
        <ThemeProvider theme={theme}>
            <MuiTable
                data={data}
                setData={setData}
                title={'HISTORICO DE INTERVENCIONES'}
                datepicker={monthPicker(date, handleDatePicker)}
                disableCheckButton={true}
                disableAditionalButton={true}
                disableAddButton={true}
                disableDeleteButton={true}
                disableOnRowUpdate={false}
                disableOnBulkUpdate={true}
                dataColumns={dataColumns}
                rowAdd={false}
                updateRow={false}
                bulkUpdate={false}
                deleteRow={false}
                handleAditional={false}
                pageSize={15}
                disableGroupingOption={true}
                date={false}
                handleRoutineSchedule={false}
                disableRoutinesDetails={true}
                disableCompleteTaskButton={true}
                disableDatePicker={true}

            />
        </ThemeProvider>
    </div>

}