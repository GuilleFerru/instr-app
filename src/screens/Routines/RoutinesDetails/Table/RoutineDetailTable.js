import React, { useState, useEffect } from 'react';
import { axiosPut } from '../../../../Services/Axios';
import ThemeProvider from "@material-ui/styles/ThemeProvider";
import theme from '../../../../components/commonComponents/MuiTable/theme';
import { defaultDailyWorksRoutineTable } from '../../../../Services/defaultTables';
import { makeStyles } from "@material-ui/core/styles";
import { MuiTable } from '../../../../components/commonComponents/MuiTable/MuiTable'
import { routineDetailTableStyle } from './RoutineDetailTableStyle';





const useStyles = makeStyles((theme) => routineDetailTableStyle(theme));

export const RoutineDetailTable = props => {

    const classes = useStyles();
    const [data, setData] = useState([]);
    const [nickname, setNickname] = useState('');
    const [dataColumns, setDataColumns] = useState([]);



    useEffect(() => {
        new Promise(resolve => {
            setData(props.data.dayWorks ? props.data.dayWorks : []);
            setDataColumns(props.data.columns ? props.data.columns : [defaultDailyWorksRoutineTable]);
            setNickname(props.nickname ? props.nickname : '');
            resolve();
        });
    }, [props]);

    const bulkUpdate = (selectedRows, resolve) => {
        console.log('hola')
        const rows = Object.values(selectedRows);
        const updatedRows = [...data];

        rows.map(work => {
            const index = work.oldData.tableData.id;
            updatedRows[index] = work.newData;
            setData(updatedRows);
            const updatedWork = work.newData;
                axiosPut(`http://localhost:8080/api/dailyWork/updateFromRoutineDetail`, { updatedWork })
            return ''
        })
        resolve();
    }


    return <div className={classes.table}>
        <ThemeProvider theme={theme}>
            <MuiTable
                data={data}
                setData={setData}
                title={nickname}
                datepicker={false}
                disableCheckButton={true}
                disableAditionalButton={true}
                disableAddButton={true}
                disableDeleteButton={true}
                disableOnRowUpdate={true}
                disableOnBulkUpdate={false}
                dataColumns={dataColumns}
                rowAdd={false}
                updateRow={false}
                bulkUpdate={bulkUpdate}
                deleteRow={false}
                handleAditional={false}
                pageSize={15}
                disableGroupingOption={true}
                date={false}
                handleRoutineSchedule={false}
                disableRoutinesDetails={true}
                disableCompleteTaskButton={true}
                disableDatePicker={true}              
                searchData={false}
                disableDefaultSearch={true}
                disableCustomSearch={true}
                disableReloadDataButton={true}
            />
        </ThemeProvider>
    </div>

}