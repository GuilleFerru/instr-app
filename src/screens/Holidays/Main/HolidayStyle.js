const shadowEffect = {
    webkitBoxShadow: '2px 4px 10px 1px rgba(0, 0, 0, 0.47)',
    boxShadow: ' 2px 4px 10px 1px rgba(201, 201, 201, 0.47)',
    borderRadius: '10px',
}


export const holidayStyle = theme => {
    return ({
        breadcrumb: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: '#f5f5f5',
            borderBottom: '1px solid #e0e0e0',
            margin: '0 0 1rem 0',
            padding: '0',
            borderRadius: '5px 5px 0 0',
            height: '48px',
            [theme.breakpoints.down('xs')]: {
                height: '40px',
            },
        },
        container: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'flex-start',
            padding: '10px',
            width: '100%',
            gap: '10px',
            height: 'auto',
            fontFamily: 'Nunito, sans-serif',
            [theme.breakpoints.down('xs')]: {
                maxWidth: '100%',
            },
            ...shadowEffect,
        },
        containerHeader: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            width: '100%',
        },
        alert: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            margin: 'auto'
        },
        periodoContainer: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            margin: '10px',
            width: '100%',
        },
        puntajeTabla: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'flex-start',
            margin: 'auto',
        },
        form: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-start',
            //gap: '300px',
            //alignItems: 'flex-start',
            margin: '0 0 50px 0',
            width: '100%',
        },
        employees: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            margin: '0 0 0 10px',
        },
        datePicker: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'flex-start',
            margin: 'auto',
            ...shadowEffect,
        }

    })
}