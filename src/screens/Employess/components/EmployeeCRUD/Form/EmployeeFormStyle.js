
export const employeeFormStyle = theme => {
    return ({
        form: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'begin',
        },
        radioGroup: {
            marginTop: theme.spacing(1, 0),
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            width: '100%'
        },
        alert: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            margin: 'auto',
            position: 'float',
        },
        statusBox: {
            color: 'rgba(0, 0, 0, 0.54)',
            padding: 0,
            fontSize: '1rem',
            fontFamily: '"Roboto", "Helvetica", "Arial", "sans-serif"',
            fontWeight: '400',
            lineHeight: 1,
            letterSpacing: '0.00938em',
        }
    })
}
