import React, { useState, useEffect } from 'react';
import { axiosPut } from '../../../../Services/Axios';
import ThemeProvider from "@material-ui/styles/ThemeProvider";
import theme from '../../../../components/commonComponents/MuiTable/theme';
import { defaultDailyWorksRoutineTable } from '../../../../Services/defaultTables';
import { makeStyles } from "@material-ui/core/styles";
import { MuiTable } from '../../../../components/commonComponents/MuiTable/MuiTable'
import { muiTableCommonActions } from '../../../../components/commonComponents/MuiTable/MuiTableCommonActions';
import { routineDetailTableStyle } from './RoutineDetailTableStyle';

const baseUrl = process.env.REACT_APP_API_URL;
const useStyles = makeStyles((theme) => routineDetailTableStyle(theme));

export const RoutineDetailTable = props => {

    const classes = useStyles();
    const [data, setData] = useState([]);
    const [nickname, setNickname] = useState('');
    const [dataColumns, setDataColumns] = useState([]);
    const {getNewDataBulkEdit } = muiTableCommonActions();

    useEffect(() => {
        new Promise(resolve => {
            setData(props.data.dayWorks ? props.data.dayWorks : []);
            setDataColumns(props.data.columns ? props.data.columns : [defaultDailyWorksRoutineTable]);
            setNickname(props.nickname ? props.nickname : '');
            resolve();
        });
    }, [props]);

    const bulkUpdate = (changes, resolve) => {
        const copyData = [...data];
        const dataUpdate = getNewDataBulkEdit(changes, copyData);
        dataUpdate.map((updatedWork) => {
            axiosPut(`${baseUrl}/dailyWork/updateFromRoutineDetail`, { updatedWork })
            return ''   // return empty string to avoid warning
        })
        console.log(dataUpdate)
        setData(dataUpdate);
        resolve();
        return dataUpdate;




        // const rows = Object.values(selectedRows);
        // const updatedRows = [...data];

        // rows.map(work => {
        //     const index = work.oldData.tableData.id;
        //     updatedRows[index] = work.newData;
        //     setData(updatedRows);
        //     const updatedWork = work.newData;
        //         axiosPut(`${baseUrl}/dailyWork/updateFromRoutineDetail`, { updatedWork })
        //     return ''
        // })
        // resolve();
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
                disableDuplicateButton={true}
                initialRowData={{}}
            />
        </ThemeProvider>
    </div>

}