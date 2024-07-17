export const crudFormStyle = theme => {
    return ({
        form: {
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            height: 'auto',
            marginBottom: '10px',
        },
        radioGroup: {
            marginTop: theme.spacing(1, 0),
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            width: '100%'
        },
        // alert: {
        //     display: 'flex',
        //     flexDirection: 'row',
        //     justifyContent: 'center',
        //     margin: 'auto',
        //     position: 'float',
        // },
        // titleError: {
        //     color: '#ff0000'
        // },
        // titleNormal: {
        //     color: '#069999'
        // }

    })
}
