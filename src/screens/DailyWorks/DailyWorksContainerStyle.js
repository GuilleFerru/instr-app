export const dailyWorksContainerStyle = theme => {
    return ({
        paper: {
            margin: theme.spacing(2),
            padding: theme.spacing(1),
            overflowX: 'auto', // Permite scroll horizontal
            width: '100%', // Asegura que el Paper ocupe el ancho completo
            boxSizing: 'border-box', // Considera el padding en el ancho total
        },
        appBarSpacer: theme.mixins.toolbar,
        container: {
            paddingTop: theme.spacing(1),
            paddingBottom: theme.spacing(5),
            display: 'flex',
            flexFlow: 'column noWrap'
        },
        progress: {
            display: 'flex',
            justifyContent: 'center',
            width: '100%',
            marginTop: theme.spacing(2),
        },
        resize: {
            fontSize: '13px',
        },
        customAutoComplete: {
            '& div': {
                fontSize: '13px',
            },
        },
        autoCompleteInput: {
            width: '150px',
            fontSize: '13px',
        },
        description: {
            width: '100%',
            marginBottom: theme.spacing(2),

        },
        label: {
            fontSize: '13px',
            fontWeight: 'normal',
        },
        shrink: {
            fontSize: '15px',
            fontWeight: 'normal',
            top: '-1px !important',
        },


    })
}