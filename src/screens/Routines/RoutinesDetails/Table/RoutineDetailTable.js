import React, { useState, useEffect } from 'react';
import { axiosPut } from '../../../../Services/Axios';
import ThemeProvider from "@material-ui/styles/ThemeProvider";
import theme from '../../../../components/commonComponents/MuiTable/theme';
import { defaultDailyWorksRoutineTable } from '../../../../Services/defaultTables';
import { MuiTable } from '../../../../components/commonComponents/MuiTable/MuiTable'
import { muiTableCommonActions } from '../../../../components/commonComponents/MuiTable/MuiTableCommonActions';

const baseUrl = process.env.REACT_APP_API_URL;

export const RoutineDetailTable = props => {
    const [data, setData] = useState([]);
    const [nickname, setNickname] = useState('');
    const [dataColumns, setDataColumns] = useState([]);
    const { getNewDataBulkEdit } = muiTableCommonActions();

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
            axiosPut(`${baseUrl}/dailyWork/updateFromRoutineDetail`, { updatedWork }).then(res => {
                setData(res.data.dayWorks);

            });
            return ''   // return empty string to avoid warning
        })
        resolve();
        return dataUpdate;
    }


    return<ThemeProvider theme={theme}>
            <MuiTable
                data={data}
                setData={setData}
                title={nickname}
                dataColumns={dataColumns}
                bulkUpdate={bulkUpdate}
                pageSize={15}
                enableGoToDateButton={true}
                pdfTitle={`${nickname}`}
            />
        </ThemeProvider>
}