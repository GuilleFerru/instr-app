const shadowEffect = {
    webkitBoxShadow: '2px 4px 10px 1px rgba(0, 0, 0, 0.47)',
    boxShadow: ' 2px 4px 10px 1px rgba(201, 201, 201, 0.47)',
    borderRadius: '10px',
}

export const employeeListStyle = theme => {
    return ({
        container: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'flex-end',
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
        body: {
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            padding: '0.2rem',
            [theme.breakpoints.down('xs')]: {
                padding: '0.5rem',
            },
        },
        mainTitles: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            height: 'auto',
            margin: '0',
            paddingLeft: '1rem',
        },
        section: {
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'flex-start',
            gap: '3rem',
            width: '100%',
        },
        pagination: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-end',
            alignItems: 'flex-end',
            height: 'auto',
            marginBottom: '0.5rem',
            //margin: '0',
            //padding: '0',
            [theme.breakpoints.down('xs')]: {
                maxWidth: '100%',
            },
        },
    })
}