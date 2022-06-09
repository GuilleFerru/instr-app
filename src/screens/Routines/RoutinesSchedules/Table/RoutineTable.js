import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../../../../context/AuthContext';
import ThemeProvider from "@material-ui/styles/ThemeProvider";
import theme from '../../../../components/commonComponents/MuiTable/theme';
import { axiosPut } from '../../../../Services/Axios.js';
import { otherRoutinesDefault, otherRoutinesInitialRowData } from '../../../../Services/defaultTables.js';
import { monthPicker } from '../../../../Services/DatePickers'
import { makeStyles } from "@material-ui/core/styles";
import { MuiTable } from '../../../../components/commonComponents/MuiTable/MuiTable'
import { routineTableStyle } from './RoutineTableStyle'
import { muiTableCommonActions } from '../../../../components/commonComponents/MuiTable/MuiTableCommonActions';


const baseUrl = process.env.REACT_APP_API_URL;
const useStyles = makeStyles((theme) => routineTableStyle(theme));

export const RoutineTable = ({ allData, setDate, date }) => {

    const classes = useStyles();
    const { socket } = useContext(AuthContext);
    const [data, setData] = useState([]);
    const [dataColumns, setDataColumns] = useState([]);
    const [monthAndYear, setMonthAndYear] = useState('');
    const { handleDatePicker } = muiTableCommonActions(setDate);

    useEffect(() => {
        new Promise(resolve => {
            setData(allData.otherRoutines ? allData.otherRoutines : []);
            setDataColumns(allData.columns ? allData.columns : [otherRoutinesDefault]);
            setMonthAndYear(allData.date ? allData.date : '');
            resolve();
        });
    }, [allData]);


    const updateRow = (newData, oldData, resolve) => {
        const dataUpdate = [...data];
        const target = dataUpdate.find((el) => el.id === oldData.tableData.id);
        const index = dataUpdate.indexOf(target);
        dataUpdate[index] = newData;
        axiosPut(`${baseUrl}/routine/updateOt`, { data: newData })
        // const index = oldRow.tableData.id;
        // const updatedRows = [...data];
        // updatedRows[index] = updatedRow;
        // console.log(updatedRows)
        // const updatedWork = updatedRow;
        // console.log(updatedWork);
        // axiosPut(`${baseUrl}/routine/updateOt`, { data: updatedWork })
        resolve();
        return dataUpdate;
    }

    const handleRoutineSchedule = (selectedRows,) => {

        const dataUpdate = [...data];
        const target = dataUpdate.find((el) => el.id === selectedRows.tableData.id);
        const index = dataUpdate.indexOf(target);
        dataUpdate[index] = { ...selectedRows, complete: 'C', checkDay: new Date() };
        setData(dataUpdate);

        // console.log(selectedRows);
        // const index = selectedRows.tableData.id;
        // console.log(index);
        // const updatedRows = [...data];
        // updatedRows[index] = { ...selectedRows, complete: 'C' };
        // console.log(updatedRows)
        // setData(dataUpdate);
        axiosPut(`${baseUrl}/routine/update`, { data: dataUpdate[index] }).then(res => {
            res.status === 200 && socket.emit('get_qtyOverDueRoutines');
        });

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
                title={'RUTINAS'}
                datepicker={monthPicker(date, handleDatePicker)}
                disableOnRowUpdate={false}
                dataColumns={dataColumns}
                updateRow={updateRow}
                enablePaging={true}
                pageSize={10}
                pageSizeOptions={[10, 20, 30]}
                date={date}
                handleRoutineSchedule={handleRoutineSchedule}
                enableRoutinesDetails={true}
                enableCompleteTaskButton={true}
                disableDatePicker={false}
                disableDefaultSearch={false}
                disableInitialFormData={false}
                initialRowData={{ otherRoutinesInitialRowData }}
                monthAndYear={monthAndYear}

            />
        </ThemeProvider>
    </div>

}