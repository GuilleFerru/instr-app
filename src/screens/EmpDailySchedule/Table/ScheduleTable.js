import React, { useState, useEffect } from 'react';
import ThemeProvider from "@material-ui/styles/ThemeProvider";
import { axiosGetExcel } from '../../../Services/Axios.js';
import theme from '../../../components/commonComponents/MuiTable/theme';
import { MuiTable } from '../../../components/commonComponents/MuiTable/MuiTable'
import { muiTableCommonActions } from '../../../components/commonComponents/MuiTable/MuiTableCommonActions';
import { scheduleEmpDefault } from '../../../Services/defaultTables.js';
import { datePicker } from '../../../Services/DatePickers';
import { formatDate } from '../../../Services/DateUtils.js';
import { GenerateDailyShiftForm } from '../Forms/GenerateDailyShiftForm';
import { useHistory } from 'react-router-dom';
import fileDownload from 'js-file-download'

const baseUrl = process.env.REACT_APP_API_URL;

const getNumberOfAditionals = (dataColumns) => {
    return parseInt((dataColumns[dataColumns.length - 2].field).match(/\d+/)[0]) + 1;
}

export const ScheduleTable = ({ allData, roomId, date, getNewDate, socket }) => {
    const history = useHistory();
    const [data, setData] = useState([]);
    const [aditionals, setAditionals] = useState({});
    const [aditionalCount, setAditionalCount] = useState(1);
    const { handleDatePicker, getNewDataBulkEdit } = muiTableCommonActions(getNewDate);
    const [dataColumns, setDataColumns] = useState([]);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [loadingExcel, setLoadingExcel] = useState(false);


    useEffect(() => {
        setData([])
        new Promise(resolve => {
            setTimeout(resolve, 100);
        }).then(() => {
            setData(allData.schedule ? allData.schedule : []);
            setDataColumns(allData.columns ? allData.columns : [scheduleEmpDefault]);
            setAditionals(allData.aditionals ? allData.aditionals : {});
            allData.columns !== undefined && allData.columns.length > 5 ?
                setAditionalCount(parseInt((allData.columns[allData.columns.length - 2].field).match(/\d+/)[0]) + 1) :
                setAditionalCount(1);
        });
    }, [allData]);


    const bulkUpdate = (changes, resolve) => {
        const copyData = [...data];
        const dataUpdate = getNewDataBulkEdit(changes, copyData);
        socket ? socket.emit('update_schedule', date, dataUpdate, roomId) : history.push('/error');
        resolve();
    }

    // MEJORAR ESTO
    // const compareOldAndNewData = (oldData, newData) => {

    //     if (oldData.timeSchedule !== newData.timeSchedule) {
    //         newData.timeSchedule >= 7 && newData.timeSchedule <= 14 ? newData.workedHours = 12 : newData.timeSchedule === 4 ? newData.workedHours = 0 : newData.workedHours = 8;
    //     }
    //     newData.legajo !== newData.fullName && (newData.legajo = newData.fullName);
    // }

    const updateRow = (newData, oldData, resolve) => {
        const dataUpdate = [...data];
        const target = dataUpdate.find((el) => el.id === oldData.tableData.id);
        const index = dataUpdate.indexOf(target);
        dataUpdate[index] = newData;
        socket ? socket.emit('update_schedule', date, dataUpdate, roomId) : history.push('/error');
        resolve();
        return dataUpdate;
    }

    const handleAditional = (action) => {
        const newColumns = [];

        if (action === 'add') {
            if (dataColumns.length > 5) {
                const numberOfAditionals = getNumberOfAditionals(dataColumns);
                setAditionalCount(numberOfAditionals + 1);
            } else {
                setAditionalCount(aditionalCount + 1);
            }

            const aditionalSelect = {
                field: `additional_${aditionalCount}`,
                title: `Adicional ${aditionalCount}`,
                lookup: aditionals,
                align: 'left',
            }
            const aditionalInput = {
                field: `additional_${aditionalCount}_info`,
                title: `Anexo ${aditionalCount}`,
                align: 'left',
            }
            newColumns.push(...dataColumns, aditionalSelect, aditionalInput);
        }

        if (action === 'remove') {
            if (dataColumns.length > 5) {
                const numberOfAditionals = getNumberOfAditionals(dataColumns);
                setAditionalCount(numberOfAditionals - 1);
                const deletedColumns = dataColumns.splice(dataColumns.length - 2, 2);
                data.map((el) => {
                    delete el[deletedColumns[0].field];
                    delete el[deletedColumns[1].field];
                    return '';
                })
            }
            newColumns.push(...dataColumns);
        }

        const saveWithPromise = new Promise((resolve, _rej) => {
            socket ? socket.emit('update_schedule_columns', date, newColumns, roomId) : history.push('/error');
            resolve();
        })

        saveWithPromise.then(() => {
            socket ? socket.emit('update_schedule', date, data, roomId) : history.push('/error');
        })


    }

    const deleteRow = (oldData, resolve) => {
        const dataDelete = [...data];
        const target = dataDelete.find((el) => el.id === oldData.tableData.id);
        const index = dataDelete.indexOf(target);
        dataDelete.splice(index, 1);
        const dataToDelete = {
            date: date,
            dataDelete: dataDelete,
        }
        socket ? socket.emit('delete_schedule', date, dataToDelete, roomId) : history.push('/error');
        setData([...dataDelete]);
        resolve();
    }

    const generateDailyShift = (startDate, endDate) => {
        const searchData = { startDate, endDate }
        setLoadingExcel(true);
        axiosGetExcel(`${baseUrl}/schedule/getDailyShiftExcel/dataForSearch`, { params: searchData }).then(data => {
            fileDownload(data, `Partes Diarios desde ${formatDate(startDate)} hasta ${formatDate(endDate)} Instrumentos .xlsx`);
            setLoadingExcel(false)
            setIsDialogOpen(false)
        }).catch(_err => {
            history.push('/error');
        });
    }


    return <ThemeProvider theme={theme}>
                <MuiTable
                    data={data}
                    setData={setData}
                    title={'PARTE DIARIO'}
                    datepicker={datePicker(date, handleDatePicker)}
                    enableAditionalButton={true}
                    maxAditionalsReached={dataColumns.length >= 13}
                    enableDeleteAditionalButton={true}
                    minAditionalReached={dataColumns.length <= 5}
                    disableDeleteButton={false}
                    disableOnRowUpdate={true}
                    disableOnBulkUpdate={false}
                    dataColumns={dataColumns}
                    updateRow={updateRow}
                    bulkUpdate={bulkUpdate}
                    deleteRow={deleteRow}
                    handleAditional={handleAditional}
                    enablePaging={true}
                    pageSize={15}
                    pageSizeOptions={[15, 20]}
                    date={date}
                    disableDatePicker={false}
                    pdfTitle={`Personal ${formatDate(date)}`}
                    enableGenerateDailyShiftButton={true}
                    setIsDialogOpen={setIsDialogOpen}
                    disableGoToTodayButton={false}
                />
                <GenerateDailyShiftForm isDialogOpen={isDialogOpen} setIsDialogOpen={setIsDialogOpen} generateDailyShift={generateDailyShift} loadingExcel={loadingExcel} />
            </ThemeProvider>
}