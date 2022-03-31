export const loginContainerStyle = theme => {
    return ({
        root: {
            backgroundColor: theme.palette.background.paper,
            boxShadow: "0px 0px 10px #00000029",
            borderRadius: "10px",
            
            display: 'flex',
            marginTop: theme.spacing(12),
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
        },
        paper: {
            marginTop: theme.spacing(8),
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        },
        title: {
            margin: theme.spacing(1),
            // backgroundColor: theme.palette.secondary.main,
        },
        form: {
            width: '100%', // Fix IE 11 issue.
            // marginTop: theme.spacing(1),
        },
        submit: {
            margin: theme.spacing(3, 0, 2),
        },

    })
}