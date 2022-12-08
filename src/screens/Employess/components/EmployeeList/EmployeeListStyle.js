
const shadowEffect = {
    webkitBoxShadow: '2px 4px 10px 1px rgba(0, 0, 0, 0.47)',
    boxShadow: ' 2px 4px 10px 1px rgba(201, 201, 201, 0.47)',
    borderRadius: '10px',
}

export const employeeListStyle = theme => {
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
            padding: '0.5rem',
            gap: '1rem',
            fontFamily: 'Nunito, sans-serif',
            [theme.breakpoints.down('xs')]: {
                maxWidth: '100%',
            },
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