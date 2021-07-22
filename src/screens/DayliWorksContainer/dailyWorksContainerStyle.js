export const dailyWorksContainerStyle = theme => {
    return ({
        paper: {
            padding: theme.spacing(2),
            display: "flex",
            overflow: "auto",
            flexDirection: "column",
        },
        fixedHeight: {
            height: "240",
        },
        appBarSpacer: theme.mixins.toolbar,
        container: {
            paddingTop: theme.spacing(4),
            paddingBottom: theme.spacing(4),
        }
    })
}
