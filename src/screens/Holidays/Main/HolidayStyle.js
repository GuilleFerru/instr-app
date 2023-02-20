const shadowEffect = {
    webkitBoxShadow: '2px 4px 10px 1px rgba(0, 0, 0, 0.47)',
    boxShadow: ' 2px 4px 10px 1px rgba(201, 201, 201, 0.47)',
    borderRadius: '10px',
}

export const holidayStyle = theme => {
    return ({
        container: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'flex-start',
            padding: '10px',
            width: '100%',
            gap: '10px',
            height: 'auto',
            marginTop: '10px',
            fontFamily: 'Nunito, sans-serif',
            [theme.breakpoints.down('xs')]: {
                maxWidth: '100%',
            },
            overflow: 'visible',
            ...shadowEffect,
        },
        mainTitles: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            width: '100%',
            height: 'auto',
            margin: '0',
            padding: '0',

        },
        containerHeader: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            width: '100%',
        },
    })
}