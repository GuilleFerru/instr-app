export const employeeAditionalFormStyle = theme => {
    return ({
        circularProgressContainer: {
            position: 'absolute',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            top: '50%',
            left: '50%',
        },
        circularProgress: {
            margin: theme.spacing(5),
            
        },
        form: {
            width: '100%', // Fix IE 11 issue.
            marginTop: theme.spacing(1),
            display: 'flex',
            wrap: 'wrap',
            flexDirection: 'column',
            //alignItems: 'begin',
        },
        dateGroup: {
            display: 'flex',
            flexDirection: 'row',
            wrap: 'wrap',
            
            justifyContent: 'space-between',
            marginBottom: theme.spacing(1),
        },
        aditional: {
            display: 'flex',
            flexFlow: 'column wrap',
            // alignItems: ' flex-start ',
            // justifyContent: 'center',
            // marginBottom: theme.spacing(1),
        },


    })
}