const drawerWidth = 240;
export const appBarContainerStyle = theme => {
    return ({
        toolbar: {
            background: 'green',
            paddingRight: "24", // keep right padding when drawer closed
        },
        appBar: {
            zIndex: theme.zIndex.drawer + 1,
            transition: theme.transitions.create(["width", "margin"], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
        },
        appBarShift: {
            marginLeft: drawerWidth,
            width: `calc(100% - ${drawerWidth}px)`,
            transition: theme.transitions.create(["width", "margin"], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
        },
        title: {
            flexGrow: "1",
        },
        menuButton: {
            marginRight: "36",
        },
        menuButtonHidden: {
            display: "none",
        },
    })
}