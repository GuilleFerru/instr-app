export const alertsStyle = theme => {
    return ({
        root: {
            width: '100%',
            '& > * + *': {
                marginTop: theme.spacing(2),
            },

        },
        alert: {
            webkitBoxShadow: '2px 4px 10px 1px rgba(0, 0, 0, 0.47)',
            boxShadow: ' 2px 4px 10px 1px rgba(201, 201, 201, 0.47)',
            borderRadius: '10px'
        }

    })
}

