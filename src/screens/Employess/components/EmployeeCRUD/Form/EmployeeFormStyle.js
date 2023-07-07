
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
    })
}