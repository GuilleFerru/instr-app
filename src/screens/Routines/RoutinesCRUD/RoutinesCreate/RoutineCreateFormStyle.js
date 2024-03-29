export const routineCreateFormStyle = theme => {
    return ({
        form: {
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            height: 'auto',
            marginBottom: '10px',
        },
        alert: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            margin: 'auto',
            position: 'float',
        },
        titleError: {
            color: '#ff0000'
        },
        titleNormal: {
            color: '#069999'
        }
    })
}