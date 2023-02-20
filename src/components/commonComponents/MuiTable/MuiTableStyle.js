const shadowEffect = {
    webkitBoxShadow: '2px 4px 10px 1px rgba(0, 0, 0, 0.47)',
    boxShadow: ' 2px 4px 10px 1px rgba(201, 201, 201, 0.47)',
    borderRadius: '10px',
}

export const muiTableStyle = theme => {
    return ({
        table: {
            //border: '1px solid black',
            //display: 'flex',
            // flexDirection: 'column',
            // columnGap: '10px',
            // //flexDirection: 'column',
            width: '100%',
            overflow: 'visible',
            ...shadowEffect
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
            alignItems: 'flex-end',
            margin: '0 0 0.1rem 0.1rem',
        },
        holidayPeriodSelector: {
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'nowrap',
            justifyContent: 'flex-start',
            alignItems: 'center',
            width: '100%',
            margin: '0 0 0.1rem 0.1rem',
        },
        subTitle: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '0 1.5rem  0.5rem 1.5rem',
        },

        datePicker: {
            //border: '1px solid #e0e0e0',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'flex-end',
            //borderRadius: '4px',
            //padding: '0 0.5rem',
            
        },
        // complete: {
        //     backgroundColor: '#6aec6a',
        //     width: 'fitContent',
        //     padding: '0 5px',
        //     borderRadius: '2px'
        // }

    })
}