import React, { useState, useEffect } from 'react';
import ThemeProvider from "@material-ui/styles/ThemeProvider";
import theme from '../../../../components/commonComponents/MuiTable/theme';
import { axiosGet, axiosPut } from '../../../../Services/Axios.js';
import { otherRoutinesDefault } from '../../../../Services/defaultTables.js';
import { monthPicker } from '../../../../Services/DatePickers'
import { makeStyles } from "@material-ui/core/styles";
import { MuiTable } from '../../../../components/commonComponents/MuiTable/MuiTable'
import { routineTableStyle } from './RoutineTableStyle'
import { muiTableCommonActions } from '../../../../components/commonComponents/MuiTable/MuiTableCommonActions';
import { useHistory } from 'react-router-dom';

const baseUrl = process.env.REACT_APP_API_URL;
const useStyles = makeStyles((theme) => routineTableStyle(theme));

export const RoutineTable = props => {

    const classes = useStyles();
    const history = useHistory();
    const [date, setDate] = useState(new Date());
    const [data, setData] = useState([]);
    const [dataColumns, setDataColumns] = useState([]);
    const { handleDatePicker } = muiTableCommonActions(data, setData, setDate);


    useEffect(() => {
        let cancel = false;
        axiosGet(`${baseUrl}/routine/getAllRoutines/${date}`).then(res => { 
                const { otherRoutines, columns } = res;
                if (!cancel) {
                    otherRoutines === undefined || otherRoutines.length === 0 ? setData([]) : setData(otherRoutines);
                    columns === undefined ? setDataColumns([otherRoutinesDefault]) : setDataColumns(columns);
                } else {
                    return;
                }
        }).catch(_err => {
            // history.push('/error');
        });;
        return () => {
            cancel = true;
        }
    }, [date, history]);

    const updateRow = (updatedRow, oldRow) => {
        const index = oldRow.tableData.id;
        const updatedRows = [...data];
        updatedRows[index] = updatedRow;
        const updatedWork = updatedRow;
        axiosPut(`${baseUrl}/routine/updateOt`, { data: updatedWork })
        return updatedRows;
    }

    const handleRoutineSchedule = (selectedRows,) => {
        // const rows = Object.values(selectedRows);
        // const updatedRows = [...data];
        // const dataToAxiosPut = [];

        const index = selectedRows.tableData.id;
        const updatedRows = [...data];
        updatedRows[index] = { ...selectedRows, complete: 'C' };
        setData(updatedRows);
        axiosPut(`${baseUrl}/routine/update`, { data: updatedRows[index] });
        // rows.map(routine => {
        //     const index = routine.tableData.id;
        //     updatedRows[index] = { ...routine, complete: 'C' };
        //     dataToAxiosPut.push({ ...routine, complete: 'C' });
        //     setData(updatedRows);
        //     return ''
        // })
        //
    }

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
                title={'RUTINAS'}
                datepicker={monthPicker(date, handleDatePicker)}
                disableCheckButton={true}
                disableAditionalButton={true}
                disableAddButton={true}
                disableDeleteButton={true}
                disableOnRowUpdate={false}
                disableOnBulkUpdate={true}
                dataColumns={dataColumns}
                rowAdd={false}
                updateRow={updateRow}
                bulkUpdate={false}
                deleteRow={false}
                handleAditional={false}
                pageSize={15}
                disableGroupingOption={true}
                date={date}
                handleRoutineSchedule={handleRoutineSchedule}
                disableRoutinesDetails={false}
                disableCompleteTaskButton={false}
                disableDatePicker={false}
                searchData={false}
                disableDefaultSearch={false}
                disableCustomSearch={true}
                disableReloadDataButton={true}

            />
        </ThemeProvider>
    </div>

}