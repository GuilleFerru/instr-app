export const searchDailyWorkFormStyle = theme => {
    return ({
        form: {
            //width: '100%', // Fix IE 11 issue.
            //marginTop: theme.spacing(1),
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'begin',
        },
        dateGroup: {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: theme.spacing(1),
        },
        switchGroup: {
            display: 'flex',
            flexFlow: 'column noWrap',
            alignItems: ' flex-start ',
            justifyContent: 'center',
            marginBottom: theme.spacing(1),
        },


    })
}