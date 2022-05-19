import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../../../context/AuthContext';
import ThemeProvider from "@material-ui/styles/ThemeProvider";
import theme from '../../../components/commonComponents/MuiTable/theme';
import { axiosPut } from '../../../Services/Axios.js';
import { defaultPlantShutdownsTable, plantShutDownsInitialRowData } from '../../../Services/defaultTables.js';
import { monthPicker } from '../../../Services/DatePickers'
import { makeStyles } from "@material-ui/core/styles";
import { MuiTable } from '../../../components/commonComponents/MuiTable/MuiTable'
import { plantShutdownsTableStyle } from './PlantShutdownsTableStyle'
import { muiTableCommonActions } from '../../../components/commonComponents/MuiTable/MuiTableCommonActions';


const baseUrl = process.env.REACT_APP_API_URL;
const useStyles = makeStyles((theme) => plantShutdownsTableStyle(theme));

export const PlantShutdownsTable = ({ allData, setDate, date }) => {

    const classes = useStyles();
    const { socket } = useContext(AuthContext);
    const [data, setData] = useState([]);
    const [dataColumns, setDataColumns] = useState([]);
    // const [monthAndYear, setMonthAndYear] = useState('');
    const { handleDatePicker } = muiTableCommonActions(setDate);

    useEffect(() => {
        new Promise(resolve => {
            setData(allData.otherRoutines ? allData.otherRoutines : []);
            setDataColumns(allData.columns ? allData.columns : [defaultPlantShutdownsTable]);
            // setMonthAndYear(allData.date ? allData.date : '');
            resolve();
        });
    }, [allData]);


    const updateRow = (newData, oldData, resolve) => {
        const dataUpdate = [...data];
        const target = dataUpdate.find((el) => el.id === oldData.tableData.id);
        const index = dataUpdate.indexOf(target);
        dataUpdate[index] = newData;
        resolve();
        return dataUpdate;
    }

    const handleRoutineSchedule = (selectedRows,) => {
        const dataUpdate = [...data];
        const target = dataUpdate.find((el) => el.id === selectedRows.tableData.id);
        const index = dataUpdate.indexOf(target);
        dataUpdate[index] = { ...selectedRows, complete: 'C', checkDay: new Date() };
        setData(dataUpdate);
        axiosPut(`${baseUrl}/routine/update`, { data: dataUpdate[index] }).then(res => {
            res.status === 200 && socket.emit('get_qtyOverDueRoutines');
        });
    }






    return <div className={classes.table}>
        <ThemeProvider theme={theme}>
            <MuiTable
                data={data}
                setData={setData}
                title={'LISTADO DE PAROS DE PLANTA'}
                datepicker={monthPicker(date, handleDatePicker)}
                disableCheckButton={true}
                enableAditionalButton={false}
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
                enableRoutinesDetails={true}
                enableCompleteTaskButton={true}
                disableDatePicker={false}
                searchData={false}
                disableDefaultSearch={false}
                disableCustomSearch={true}
                disableReloadDataButton={true}
                enableDuplicateButton={false}
                initialRowData={{plantShutDownsInitialRowData}}
                enableGoToDateButton={false}
                monthAndYear={''}

            />
        </ThemeProvider>
    </div>

}