export const muiTableStyle = theme => {
    return ({
        table: {
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
        },
        toolbarHeader: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: '#f5f5f5',
            borderBottom: '1px solid #e0e0e0',
            height: '48px',
            [theme.breakpoints.down('xs')]: {
                height: '40px',
            },
        },
        toolbarBody: {
            display: 'flex',
            flexDirection: 'column',
            margin: theme.spacing(1),
        },
        datePickerContainer: {
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'nowrap',
            justifyContent: 'flex-start',
            alignItems: 'center',
            // margin: '0 8px 5px 24px'
        },
        reloadDataButton: {
            margin: '0 0 0.1rem 0.1rem',
        },
        // datePicker: {
        //     margin: '0 0 1rem 1rem',
        // },
        // complete: {
        //     backgroundColor: '#6aec6a',
        //     width: 'fitContent',
        //     padding: '0 5px',
        //     borderRadius: '2px'
        // }

    })
}