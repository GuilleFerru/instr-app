export const tableCardStyle = theme => {
    return ({
        paper: {
            margin: theme.spacing(1),
            padding: theme.spacing(1),
            // border: '1px solid red',
            // display: "flex",
            // width: 'auto',
            // flexDirection: "column",

            // display: "flex",
            // // overflow: "auto",
            // flexDirection: "column",
        },
        // fixedHeight: {
        //     height: "240",
        // },
        appBarSpacer: theme.mixins.toolbar,
        container: {
            paddingTop: theme.spacing(1),
            paddingBottom: theme.spacing(5),
            display: 'flex',
            flexFlow:'column noWrap',
            height: 'auto',
            
        }
    })
}