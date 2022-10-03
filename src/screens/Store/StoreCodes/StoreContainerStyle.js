export const storeContainerStyle = theme => {
    return ({
        paper: {
            margin: theme.spacing(2),
            padding: theme.spacing(1)
        },
        appBarSpacer: theme.mixins.toolbar,
        container: {
            paddingTop: theme.spacing(1),
            paddingBottom: theme.spacing(5),
            display: 'flex',
            flexFlow:'column noWrap'
        }
    })
}
